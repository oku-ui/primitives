import {
  useComposedRefs,
  useEscapeKeydown,
  useForwardRef,
} from '@oku-ui/use-composable'
import type { ElementType, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import type { Ref } from 'vue'
import {
  computed,
  defineComponent,
  h,
  provide,
  ref,
  toRefs,
  watchEffect,
} from 'vue'
import { composeEventHandlers } from '@oku-ui/utils'
import type { ScopeDismissableLayer } from './util'
import {
  dispatchUpdate,
  scopeDismissableLayerProps,
  useFocusOutside,
  usePointerDownOutside,
} from './util'

/* -------------------------------------------------------------------------------------------------
 * DismissableLayer
 * ----------------------------------------------------------------------------------------------- */
export const INJECT_UPDATE = 'dismissableLayer.update'
export const POINTER_DOWN_OUTSIDE = 'dismissableLayer.pointerDownOutside'
export const FOCUS_OUTSIDE = 'dismissableLayer.focusOutside'

let originalBodyPointerEvents: string

export const DISMISSABLE_NAME = 'OkuDismissableLayer'
export const DismissableLayerProvideKey = Symbol('DismissableLayerProvide')

export type DismissableLayerIntrinsicElement = ElementType<'div'>
export type DismissableLayerElement = HTMLDivElement

export type DismissableLayerProvideValue = {
  layers: Ref<Set<DismissableLayerElement>>
  layersWithOutsidePointerEventsDisabled: Ref<Set<DismissableLayerElement>>
  branches: Ref<Set<DismissableLayerElement>>
}

export type PointerDownOutsideEvent = CustomEvent<{
  originalEvent: PointerEvent
}>
export type FocusOutsideEvent = CustomEvent<{ originalEvent: FocusEvent }>
export type FocusCaptureEvent = CustomEvent<{ originalEvent: FocusEvent }>
export type FocusBlurCaptureEvent = CustomEvent<{ originalEvent: FocusEvent }>
export type PointerDownCaptureEvent = CustomEvent<{
  originalEvent: PointerEvent
}>

interface DismissableLayerProps extends PrimitiveProps {
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

  onFocusCapture?: (event: FocusCaptureEvent) => void

  onBlurCapture?: (event: FocusBlurCaptureEvent) => void

  onPointerDownCapture?: (event: PointerDownCaptureEvent) => void
}

const dismissableLayerProps = {
  disableOutsidePointerEvents: {
    type: Boolean,
    default: false,
  },
}

const DismissableLayer = defineComponent({
  name: DISMISSABLE_NAME,
  inheritAttrs: false,
  props: {
    ...dismissableLayerProps,
    ...primitiveProps,
    ...scopeDismissableLayerProps,
  },
  emits: {
    /**
     * Event handler called when the escape key is down.
     * Can be prevented.
     */
    escapeKeyDown: (event: KeyboardEvent) => true,
    /**
     * Event handler called when an interaction happens outside the `DismissableLayer`.
     * Specifically, when a `pointerdown` event happens outside or focus moves outside of it.
     * Can be prevented.
     */
    interactOutside: (event: PointerDownOutsideEvent | FocusOutsideEvent) =>
      true,
    /**
     * Event handler called when the a `pointerdown` event happens outside of the `DismissableLayer`.
     * Can be prevented.
     */
    pointerDownOutside: (event: PointerDownOutsideEvent) => true,
    /**
     * Event handler called when the focus moves outside of the `DismissableLayer`.
     * Can be prevented.
     */
    focusOutside: (event: FocusOutsideEvent) => true,
    /**
     * Handler called when the `DismissableLayer` should be dismissed
     */
    dismiss: () => true,
    focusCapture: (event: FocusCaptureEvent) => true,
    blurCapture: (event: FocusBlurCaptureEvent) => true,
    pointerDownCapture: (event: PointerDownCaptureEvent) => true,
  },
  setup(props, { attrs, emit, slots }) {
    const { disableOutsidePointerEvents } = toRefs(props)

    const { ...dismissableLayerAttrs } = attrs

    const _layers = ref(new Set<DismissableLayerElement>())

    const layersWithOutsidePointerEventsDisabled = ref(
      new Set<DismissableLayerElement>(),
    )

    const branches = ref(new Set<DismissableLayerElement>())

    const layers = computed(() => Array.from(_layers.value))

    provide<DismissableLayerProvideValue, symbol>(DismissableLayerProvideKey, {
      layers: _layers,
      layersWithOutsidePointerEventsDisabled,
      branches,
    })

    const node = ref<HTMLDivElement | null>(null)

    const forwardedRef = useForwardRef()
    const composedRefs = useComposedRefs(node, forwardedRef)

    const ownerDocument = computed(
      () => node.value?.ownerDocument ?? globalThis?.document,
    )

    const highestLayerWithOutsidePointerEventsDisabled = computed(() => {
      const [highestLayerWithOutsidePointerEventsDisabled] = [
        ...layersWithOutsidePointerEventsDisabled.value,
      ].slice(-1)

      return highestLayerWithOutsidePointerEventsDisabled
    })

    const highestLayerWithOutsidePointerEventsDisabledIndex = computed(() =>
      layers.value.indexOf(highestLayerWithOutsidePointerEventsDisabled.value),
    )

    const index = computed(() => {
      return node.value ? layers.value.indexOf(node.value) : -1
    })

    const isBodyPointerEventsDisabled = computed(
      () => layersWithOutsidePointerEventsDisabled.value.size > 0,
    )

    const isPointerEventsEnabled = computed(() => {
      return (
        index.value >= highestLayerWithOutsidePointerEventsDisabledIndex.value
      )
    })

    const pointerDownOutside = usePointerDownOutside((event) => {
      const target = event.target as HTMLElement
      const isPointerDownOnBranch = [...branches.value].some(branch =>
        branch.contains(target),
      )

      if (!isPointerEventsEnabled.value || isPointerDownOnBranch)
        return

      emit('pointerDownOutside', event)
      emit('interactOutside', event)

      if (!event.defaultPrevented)
        emit('dismiss')
    }, ownerDocument.value)

    const focusOutside = useFocusOutside((event) => {
      const target = event.target as HTMLElement
      const isFocusInBranch = [...branches.value].some(branch =>
        branch.contains(target),
      )

      if (isFocusInBranch)
        return

      emit('focusOutside', event)
      emit('interactOutside', event)

      if (!event.defaultPrevented)
        emit('dismiss')
    }, ownerDocument.value)

    useEscapeKeydown((event) => {
      const isHighestLayer = index.value === _layers.value.size - 1

      if (!isHighestLayer)
        return

      emit('escapeKeyDown', event)

      if (!event.defaultPrevented)
        emit('dismiss')
    }, ownerDocument.value)

    watchEffect((onInvalidate) => {
      if (!node.value)
        return

      if (disableOutsidePointerEvents.value) {
        if (layersWithOutsidePointerEventsDisabled.value.size === 0) {
          originalBodyPointerEvents
            = ownerDocument.value.body.style.pointerEvents
          ownerDocument.value.body.style.pointerEvents = 'none'
        }
        layersWithOutsidePointerEventsDisabled.value.add(node.value)
      }

      _layers.value.add(node.value)

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
        if (!node.value)
          return
        _layers.value.delete(node.value)
        layersWithOutsidePointerEventsDisabled.value.delete(node.value)
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
      h(
        Primitive.div,
        {
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
          onFocusCapture: composeEventHandlers<FocusCaptureEvent>((e) => {
            emit('focusCapture', e)
          }, focusOutside.onFocusCapture),
          onBlurCapture: composeEventHandlers<FocusBlurCaptureEvent>((e) => {
            emit('blurCapture', e)
          }, focusOutside.onBlurCapture),
          onPointerDownCapture: composeEventHandlers<PointerDownCaptureEvent>(
            (e) => {
              emit('pointerDownCapture', e)
            },
            pointerDownOutside.onPointerDownCapture,
          ),
        },
        {
          default: slots.default?.(),
        },
      )

    return originalReturn
  },
})

export const OkuDismissableLayer = DismissableLayer as typeof DismissableLayer &
(new () => {
  $props: ScopeDismissableLayer<Partial<DismissableLayerElement>>
})

export type { DismissableLayerProps }
