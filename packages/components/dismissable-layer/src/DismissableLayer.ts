import {
  useComposedRefs,
  useEscapeKeydown,
  useForwardRef,
} from '@oku-ui/use-composable'
import type {
  ComponentPublicInstanceRef,
  ElementType,
  InstanceTypeRef,
  MergeProps,
  PrimitiveProps,
} from '@oku-ui/primitive'
import {
  Primitive,
} from '@oku-ui/primitive'
import type {
  PropType,
  Ref,
} from 'vue'
import {
  computed,
  defineComponent,
  h,
  ref,
  toRefs,
  toValue,
  unref,
  watch,
  watchEffect,
} from 'vue'
import type { Scope } from '@oku-ui/provide'
import { createProvideScope } from '@oku-ui/provide'
import type { DismissableLayerBranchElement } from './DismissableLayerBranch'
import { useFocusOutside, usePointerDownOutside } from './util'

/* -------------------------------------------------------------------------------------------------
 * DismissableLayer
 * ----------------------------------------------------------------------------------------------- */

const DISMISSABLE_LAYER_NAME = 'DismissableLayer'

export const CONTEXT_UPDATE = 'dismissableLayer.update'
export const POINTER_DOWN_OUTSIDE = 'dismissableLayer.pointerDownOutside'
export const FOCUS_OUTSIDE = 'dismissableLayer.focusOutside'

let originalBodyPointerEvents: string

const DISMISSABLE_NAME = 'OkuDismissableLayer'

type DismissableLayerElement = ElementType<'div'>

type DismissableLayerContextValue = {
  layers: Ref<Set<DismissableLayerElement>>
  layersWithOutsidePointerEventsDisabled: Ref<Set<DismissableLayerElement>>
  branches: Ref<Set<DismissableLayerBranchElement>>
}

export type PointerDownOutsideEvent = CustomEvent<{
  originalEvent: PointerEvent
}>
export type FocusOutsideEvent = CustomEvent<{ originalEvent: FocusEvent }>

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
}

export const [createDismissableLayerProvide, _createDismissableLayerScope]
  = createProvideScope(DISMISSABLE_NAME)

export const [dismissableLayerProvider, useDismissableLayerInject]
  = createDismissableLayerProvide<DismissableLayerContextValue>(DISMISSABLE_NAME)

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
    asChild: {
      type: Boolean,
      default: undefined,
    },
    scopeDismissableLayer: {
      type: Object as unknown as PropType<Scope>,
      required: false,
    },
  },
  emits: [
    'onFocusOutside',
    'onDismiss',
    'onPointerDownOutside',
    'onInteractOutside',
    'onEscapeKeyDown',
  ],
  setup(props, { attrs }) {
    const {
      onDismiss,
      onFocusOutside,
      onEscapeKeyDown,
      onInteractOutside,
      onPointerDownOutside,
      disableOutsidePointerEvents,
      scopeDismissableLayer,
    } = toRefs(props)

    const { ...dismissableLayerAttrs } = attrs

    const layers = ref<Set<DismissableLayerElement>>(new Set())

    const layersWithOutsidePointerEventsDisabled = ref<
      Set<DismissableLayerElement>
    >(new Set())

    const branches = ref<Set<DismissableLayerBranchElement>>(new Set())

    dismissableLayerProvider({
      layers,
      layersWithOutsidePointerEventsDisabled,
      branches,
      scope: scopeDismissableLayer.value,
    })

    const node = ref<ComponentPublicInstanceRef<HTMLDivElement> | null>(null)

    const forwardedRef = useForwardRef()
    const composedRefs = useComposedRefs(node, forwardedRef)

    const ownerDocument = computed(
      () => node.value?.$el?.ownerDocument ?? globalThis?.document,
    )

    const context = toValue(
      useDismissableLayerInject(DISMISSABLE_NAME, scopeDismissableLayer.value),
    )

    watch(
      () => context,
      () => {
        if (context?.layers.value)
          layers.value = context.layers.value
        if (context?.layersWithOutsidePointerEventsDisabled.value) {
          layersWithOutsidePointerEventsDisabled.value
            = context.layersWithOutsidePointerEventsDisabled.value
        }
      },
      { immediate: true, deep: true },
    )

    const isBodyPointerEventsDisabled = computed(
      () => context.layersWithOutsidePointerEventsDisabled.value.size > 0,
    )

    const index = computed(() => {
      return node.value?.$el
        ? Array.from(layers.value).indexOf(node.value.$el as any)
        : -1
    })

    const isPointerEventsEnabled = computed(() => {
      const layers = Array.from(context.layers.value)
      const [highestLayerWithOutsidePointerEventsDisabled] = [
        ...context.layersWithOutsidePointerEventsDisabled.value,
      ].slice(-1)
      const highestLayerWithOutsidePointerEventsDisabledIndex = layers.indexOf(
        highestLayerWithOutsidePointerEventsDisabled,
      )
      return index.value >= highestLayerWithOutsidePointerEventsDisabledIndex
    })

    const pointerDownOutside = usePointerDownOutside((event) => {
      const target = event.target as HTMLElement
      const isPointerDownOnBranch = [...context.branches.value].some(
        (branch: any) => branch.contains(target),
      )
      if (!isPointerEventsEnabled.value || isPointerDownOnBranch)
        return
      onPointerDownOutside.value?.(event)
      onInteractOutside.value?.(event)
      if (!event.defaultPrevented)
        onDismiss.value?.()
    }, ownerDocument)

    const focusOutside = useFocusOutside((event) => {
      const target = event.target as HTMLElement
      const isFocusInBranch = [...context.branches.value].some((branch: any) =>
        branch.contains(target),
      )
      if (isFocusInBranch)
        return
      onFocusOutside.value?.(event)
      onInteractOutside.value?.(event)
      if (!event.defaultPrevented)
        onDismiss.value?.()
    }, unref(ownerDocument))

    useEscapeKeydown((event) => {
      const isHighestLayer = index.value === context.layers.value.size - 1
      if (!isHighestLayer)
        return
      onEscapeKeyDown.value?.(event)
      if (!event.defaultPrevented && onDismiss) {
        event.preventDefault()
        onDismiss.value?.()
      }
    }, unref(ownerDocument))

    watchEffect((onInvalidate) => {
      if (!node.value)
        return
      if (disableOutsidePointerEvents.value) {
        if (context.layersWithOutsidePointerEventsDisabled.value.size === 0) {
          originalBodyPointerEvents
            = ownerDocument.value.body.style.pointerEvents
          ownerDocument.value.body.style.pointerEvents = 'none'
        }
        context.layersWithOutsidePointerEventsDisabled.value.add(
          node.value as any,
        )
      }
      context.layers.value.add(node.value as any)

      onInvalidate(() => {
        if (
          disableOutsidePointerEvents.value
          && context.layersWithOutsidePointerEventsDisabled.value.size === 1
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
     * We only want them to be removed from context stacks when unmounted.
     */
    watchEffect((onInvalidate) => {
      onInvalidate(() => {
        if (!node.value)
          return
        context.layers.value.delete(node.value as any)
        context.layersWithOutsidePointerEventsDisabled.value.delete(
          node.value as any,
        )
      })
    })

    watchEffect((onInvalidate) => {
      const handleUpdate = () => {}
      document.addEventListener(CONTEXT_UPDATE, handleUpdate)

      onInvalidate(() =>
        document.removeEventListener(CONTEXT_UPDATE, handleUpdate),
      )
    })

    const originalReturn = () =>
      h(Primitive.div, {
        ref: composedRefs,
        style: {
          pointerEvents: isBodyPointerEventsDisabled.value
            ? isPointerEventsEnabled.value
              ? 'auto'
              : 'none'
            : undefined,
          ...(dismissableLayerAttrs.style as CSSPropertyRule),
        },
        ...dismissableLayerAttrs,
        // onFocusCapture: composeEventHandlers(
        //   onFocusCapture,
        //   focusOutside.onFocusCapture
        // ),
        // onBlurCapture: composeEventHandlers(
        //   props.onBlurCapture,
        //   focusOutside.onBlurCapture
        // ),
        // onPointerDownCapture: composeEventHandlers(
        //   onPointerDownCapture,
        //   pointerDownOutside.onPointerDownCapture
        // ),
      })
  },
})

export type _DismissableLayerEl = HTMLDivElement

type _DismissableLayer = MergeProps<
  DismissableLayerProps,
  DismissableLayerElement
>

type InstanceSwitchType = InstanceTypeRef<
  typeof DismissableLayer,
  _DismissableLayerEl
>

const OkuDismissableLayer = DismissableLayer as typeof DismissableLayer &
(new () => { $props: _DismissableLayer })

export { OkuDismissableLayer }
