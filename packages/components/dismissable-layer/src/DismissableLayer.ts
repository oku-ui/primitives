import {
  useComposedRefs,
  useEscapeKeydown,
  useForwardRef,
} from '@oku-ui/use-composable'
import type {
  ComponentPublicInstanceRef,
  ElementType,
  IPrimitiveProps,
  InstanceTypeRef,
  MergeProps,
} from '@oku-ui/primitive'
import { Primitive, PrimitiveProps } from '@oku-ui/primitive'
import type { PropType, Ref } from 'vue'
import {
  computed,
  defineComponent,
  h,
  provide,
  ref,
  toRefs,
  unref,
  watchEffect,
} from 'vue'
import { ScopePropObject } from '@oku-ui/provide'
import { composeEventHandlers } from '@oku-ui/utils'
import { dispatchUpdate, useFocusOutside, usePointerDownOutside } from './util'

/* -------------------------------------------------------------------------------------------------
 * DismissableLayer
 * ----------------------------------------------------------------------------------------------- */
export const INJECT_UPDATE = 'dismissableLayer.update'
export const POINTER_DOWN_OUTSIDE = 'dismissableLayer.pointerDownOutside'
export const FOCUS_OUTSIDE = 'dismissableLayer.focusOutside'

let originalBodyPointerEvents: string

export const DISMISSABLE_NAME = 'OkuDismissableLayer'
export const DismissableLayerProvideKey = Symbol('DismissableLayerProvide')
type DismissableLayerElement = ElementType<'div'>
type _ElDismissableLayerElement = HTMLDivElement

export type DismissableLayerProvideValue = {
  layers: Ref<Set<_ElDismissableLayerElement>>
  layersWithOutsidePointerEventsDisabled: Ref<Set<_ElDismissableLayerElement>>
  branches: Ref<Set<_ElDismissableLayerElement>>
}

export type PointerDownOutsideEvent = CustomEvent<{
  originalEvent: PointerEvent
}>

export type FocusOutsideEvent = CustomEvent<{ originalEvent: FocusEvent }>

interface DismissableLayerProps extends IPrimitiveProps {
  /**
   * When `true`, hover/focus/click interactions will be disabled on elements outside
   * the `DismissableLayer`. Users will need to click twice on outside elements to
   * interact with them: once to close the `DismissableLayer`, and again to trigger the element.
   */
  disableOutsidePointerEvents?: boolean
  /**
   * Event handler called when the escape key is down.
   * Can be prevented.
   */
  onEscapeKeyDown?: (event: KeyboardEvent) => void
  /**
   * Event handler called when the a `pointerdown` event happens outside of the `DismissableLayer`.
   * Can be prevented.
   */
  onPointerDownOutside?: (event: PointerDownOutsideEvent) => void
  /**
   * Event handler called when the focus moves outside of the `DismissableLayer`.
   * Can be prevented.
   */
  onFocusOutside?: (event: FocusOutsideEvent) => void
  /**
   * Event handler called when an interaction happens outside the `DismissableLayer`.
   * Specifically, when a `pointerdown` event happens outside or focus moves outside of it.
   * Can be prevented.
   */
  onInteractOutside?: (
    event: PointerDownOutsideEvent | FocusOutsideEvent
  ) => void
  /**
   * Handler called when the `DismissableLayer` should be dismissed
   */
  onDismiss?: () => void
}

const DismissableLayer = defineComponent({
  name: DISMISSABLE_NAME,
  inheritAttrs: false,
  props: {
    disableOutsidePointerEvents: {
      type: Boolean,
      default: false,
    },
    onEscapeKeyDown: {
      type: Function as PropType<DismissableLayerProps['onEscapeKeyDown']>,
      required: false,
    },
    onPointerDownOutside: {
      type: Function as PropType<DismissableLayerProps['onPointerDownOutside']>,
      required: false,
    },
    onInteractOutside: {
      type: Function as PropType<DismissableLayerProps['onInteractOutside']>,
      required: false,
    },
    onFocusOutside: {
      type: Function as PropType<DismissableLayerProps['onFocusOutside']>,
      required: false,
    },
    onDismiss: {
      type: Function as PropType<() => void>,
      required: false,
    },
    onFocusCapture: {
      type: Function as PropType<() => void>,
      required: false,
    },
    onBlurCapture: {
      type: Function as PropType<() => void>,
      required: false,
    },
    onPointerDownCapture: {
      type: Function as PropType<() => void>,
      required: false,
    },
    ...PrimitiveProps,
    scopeDismissableLayer: {
      ...ScopePropObject,
    },
  },
  emits: [
    'focusOutside',
    'dismiss',
    'pointerDownOutside',
    'interactOutside',
    'escapeKeyDown',
  ],
  setup(props, { attrs, emit }) {
    const {
      onDismiss,
      onFocusOutside,
      onEscapeKeyDown,
      onInteractOutside,
      onPointerDownOutside,
      disableOutsidePointerEvents,
    } = toRefs(props)
    const { ...dismissableLayerAttrs } = attrs
    const _layers = ref(new Set<_ElDismissableLayerElement>())
    const layersWithOutsidePointerEventsDisabled = ref(new Set<_ElDismissableLayerElement>())
    const branches = ref(new Set<_ElDismissableLayerElement>())

    const layers = computed(() => Array.from(_layers.value))

    provide<DismissableLayerProvideValue, symbol>(DismissableLayerProvideKey, {
      layers: _layers,
      layersWithOutsidePointerEventsDisabled,
      branches,
    })

    const node = ref<ComponentPublicInstanceRef<HTMLDivElement> | null>(null)

    const forwardedRef = useForwardRef()
    const composedRefs = useComposedRefs(node, forwardedRef)

    const ownerDocument = computed(
      () => node.value?.$el?.ownerDocument ?? globalThis?.document,
    )

    const highestLayerWithOutsidePointerEventsDisabled = computed(() => {
      const [highestLayerWithOutsidePointerEventsDisabled] = [...layersWithOutsidePointerEventsDisabled.value].slice(-1)
      return highestLayerWithOutsidePointerEventsDisabled
    })

    const highestLayerWithOutsidePointerEventsDisabledIndex = computed(() => layers.value.indexOf(highestLayerWithOutsidePointerEventsDisabled.value))

    const index = computed(() => {
      return node.value?.$el
        ? layers.value.indexOf(node.value.$el)
        : -1
    })

    const isBodyPointerEventsDisabled = computed(
      () => layersWithOutsidePointerEventsDisabled.value.size > 0,
    )

    const isPointerEventsEnabled = computed(() => {
      return index.value >= highestLayerWithOutsidePointerEventsDisabledIndex.value
    })

    const pointerDownOutside = usePointerDownOutside((event) => {
      const target = event.target as HTMLElement
      const isPointerDownOnBranch = [...branches.value].some(
        branch => branch.contains(target),
      )

      if (!isPointerEventsEnabled.value || isPointerDownOnBranch)
        return

      onPointerDownOutside.value?.(event)
      onInteractOutside.value?.(event)

      emit('pointerDownOutside', event)
      emit('interactOutside', event)

      if (!event.defaultPrevented) {
        onDismiss.value?.()
        emit('dismiss')
      }
    }, ownerDocument)

    const focusOutside = useFocusOutside((event) => {
      const target = event.target as HTMLElement
      const isFocusInBranch = [...branches.value].some(branch =>
        branch.contains(target),
      )

      if (isFocusInBranch)
        return

      onFocusOutside.value?.(event)
      onInteractOutside.value?.(event)

      emit('focusOutside', event)
      emit('interactOutside', event)

      if (!event.defaultPrevented) {
        onDismiss.value?.()
        emit('dismiss')
      }
    }, ownerDocument)

    useEscapeKeydown((event) => {
      const isHighestLayer = index.value === _layers.value.size - 1

      if (!isHighestLayer)
        return

      onEscapeKeyDown.value?.(event)
      emit('escapeKeyDown', event)

      if (!event.defaultPrevented && onDismiss) {
        event.preventDefault()
        onDismiss.value?.()
        emit('dismiss')
      }
    }, unref(ownerDocument))

    watchEffect((onInvalidate) => {
      if (!node.value?.$el)
        return

      if (disableOutsidePointerEvents.value) {
        if (layersWithOutsidePointerEventsDisabled.value.size === 0) {
          originalBodyPointerEvents
            = ownerDocument.value.body.style.pointerEvents
          ownerDocument.value.body.style.pointerEvents = 'none'
        }
        layersWithOutsidePointerEventsDisabled.value.add(
          node.value.$el,
        )
      }

      _layers.value.add(node.value.$el)

      dispatchUpdate()

      onInvalidate(() => {
        if (
          disableOutsidePointerEvents.value
          && layersWithOutsidePointerEventsDisabled.value.size === 1
        ) {
          ownerDocument.value.body.style.pointerEvents
            = originalBodyPointerEvents
        }
      })
    })

    /**
     * We purposefully prevent combining this effect with the `disableOutsidePointerEvents` effect
     * because a change to `disableOutsidePointerEvents` would remove this layer from the stack
     * and add it to the end again so the layering order wouldn't be _creation order_.
     * We only want them to be removed from inject stacks when unmounted.
     */
    watchEffect((onInvalidate) => {
      onInvalidate(() => {
        if (!node.value?.$el)
          return
        _layers.value.delete(node.value.$el)
        layersWithOutsidePointerEventsDisabled.value.delete(
          node.value.$el,
        )
        dispatchUpdate()
      })
    })

    watchEffect((onInvalidate) => {
      const handleUpdate = () => {}
      document.addEventListener(INJECT_UPDATE, handleUpdate)

      onInvalidate(() =>
        document.removeEventListener(INJECT_UPDATE, handleUpdate),
      )
    })

    const originalReturn = () =>
      h(Primitive.div, {
        ...dismissableLayerAttrs,
        ref: composedRefs,
        asChild: props.asChild,
        style: {
          pointerEvents: isBodyPointerEventsDisabled.value
            ? isPointerEventsEnabled.value
              ? 'auto'
              : 'none'
            : undefined,
          ...(dismissableLayerAttrs.style as CSSPropertyRule),
        },
        onFocusCapture: composeEventHandlers(props.onFocusCapture,
          focusOutside.onFocusCapture,
        ),
        onBlurCapture: composeEventHandlers(props.onBlurCapture,
          focusOutside.onBlurCapture,
        ),
        onPointerDownCapture: composeEventHandlers(props.onPointerDownCapture,
          pointerDownOutside.onPointerDownCapture,
        ),
      })

    return originalReturn
  },
})

export type _DismissableLayerEl = HTMLDivElement

type _DismissableLayer = MergeProps<
  DismissableLayerProps,
  DismissableLayerElement
>

type InstanceDismissableLayerType = InstanceTypeRef<
  typeof DismissableLayer,
  _DismissableLayerEl
>

const OkuDismissableLayer = DismissableLayer as typeof DismissableLayer &
(new () => { $props: _DismissableLayer })

export { OkuDismissableLayer }

export type { InstanceDismissableLayerType, DismissableLayerProps }
