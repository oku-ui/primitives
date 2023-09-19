import {
  reactiveOmit,
  useComposedRefs,
  useEscapeKeydown,
  useForwardRef,
} from '@oku-ui/use-composable'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import type { Ref } from 'vue'
import {
  computed,
  defineComponent,
  h,
  mergeProps,
  nextTick,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  toRefs,
  watchEffect,
} from 'vue'
import { composeEventHandlers } from '@oku-ui/utils'
import {
  dispatchUpdate,
  scopeDismissableLayerProps,
  useFocusoutSide,
  usePointerdownOutside,
} from './util'

export const dismissableLayerContext = reactive({
  layersRoot: new Set<DismissableLayerElement>(),
  layersWithOutsidePointerEventsDisabled: new Set<DismissableLayerElement>(),
  branches: new Set<DismissableLayerElement>(),
})

export const INJECT_UPDATE = 'dismissableLayer.update'
export const POINTER_DOWN_OUTSIDE = 'dismissableLayer.pointerDownOutside'
export const FOCUS_OUTSIDE = 'dismissableLayer.focusOutside'

let originalBodyPointerEvents: string

export const DISMISSABLE_NAME = 'OkuDismissableLayer'
export const DismissableLayerProvideKey = Symbol('DismissableLayerProvide')

export type DismissableLayerNativeElement = OkuElement<'div'>
export type DismissableLayerElement = HTMLDivElement

export type DismissableLayerProvideValue = {
  layers: Ref<Set<DismissableLayerElement>>
  layersWithOutsidePointerEventsDisabled: Ref<Set<DismissableLayerElement>>
  branches: Ref<Set<DismissableLayerElement>>
}

export type PointerdownOutsideEvent = CustomEvent<{
  originalEvent: PointerEvent
}>
export type FocusoutSideEvent = CustomEvent<{ originalEvent: FocusEvent }>
export type FocusCaptureEvent = CustomEvent<{ originalEvent: FocusEvent }>
export type FocusBlurCaptureEvent = CustomEvent<{ originalEvent: FocusEvent }>
export type PointerdownCaptureEvent = CustomEvent<{
  originalEvent: PointerEvent
}>

export interface DismissableLayerProps extends PrimitiveProps {
  /**
   * When `true`, hover/focus/click interactions will be disabled on elements outside
   * the `DismissableLayer`. Users will need to click twice on outside elements to
   * interact with them: once to close the `DismissableLayer`, and again to trigger the element.
   */
  disableOutsidePointerEvents?: boolean
}

export type DismissableLayerEmits = {
  /**
  * Event handler called when the escape key is down.
  * Can be prevented.
  */
  escapeKeyDown: [event: KeyboardEvent]
  /**
  * Event handler called when the a `pointerdown` event happens outside of the `DismissableLayer`.
  * Can be prevented.
  */
  pointerdownOutside: [event: PointerdownOutsideEvent]
  /**
   * Event handler called when the focus moves outside of the `DismissableLayer`.
   * Can be prevented.
   */
  focusoutSide: [event: FocusoutSideEvent]
  /**
  * Event handler called when an interaction happens outside the `DismissableLayer`.
  * Specifically, when a `pointerdown` event happens outside or focus moves outside of it.
  * Can be prevented.
  */
  interactOutside: [event: PointerdownOutsideEvent | FocusoutSideEvent]
  /**
  * Handler called when the `DismissableLayer` should be dismissed
  */
  dismiss: []
  focusCapture: [event: FocusCaptureEvent]
  blurCapture: [event: FocusBlurCaptureEvent]
  pointerdownCapture: [event: PointerdownCaptureEvent]
}

export const dismissableLayerProps = {
  props: {
    disableOutsidePointerEvents: {
      type: Boolean,
      default: false,
    },
  },

  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    escapeKeyDown: (event: KeyboardEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    pointerdownOutside: (event: PointerdownOutsideEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    focusoutSide: (event: FocusoutSideEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    interactOutside: (event: PointerdownOutsideEvent | FocusoutSideEvent) => true,
    dismiss: () => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    focusCapture: (event: FocusCaptureEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    blurCapture: (event: FocusBlurCaptureEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    pointerdownCapture: (event: PointerdownCaptureEvent) => true,
  },
}

const DismissableLayer = defineComponent({
  name: DISMISSABLE_NAME,
  inheritAttrs: false,
  props: {
    ...dismissableLayerProps.props,
    ...primitiveProps,
    ...scopeDismissableLayerProps,
  },
  emits: dismissableLayerProps.emits,
  setup(props, { attrs, emit, slots }) {
    const { disableOutsidePointerEvents, ...layerProps } = toRefs(props)
    const _reactive = reactive(layerProps)
    const reactiveLayerProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const node = ref<HTMLDivElement | null>(null)
    const ownerDocument = computed(
      () => node.value?.ownerDocument ?? globalThis?.document,
    )

    const forwardedRef = useForwardRef()
    const composedRefs = useComposedRefs(node, forwardedRef)

    const layers = computed(() => Array.from(dismissableLayerContext.layersRoot))

    const highestLayerWithOutsidePointerEventsDisabled = computed(() => {
      const [highestLayerWithOutsidePointerEventsDisabled] = [
        ...dismissableLayerContext.layersWithOutsidePointerEventsDisabled,
      ].slice(-1)

      return highestLayerWithOutsidePointerEventsDisabled
    })

    const index = computed(() => {
      return node.value ? layers.value.indexOf(node.value) : -1
    })

    const highestLayerWithOutsidePointerEventsDisabledIndex = computed(() =>
      layers.value.indexOf(highestLayerWithOutsidePointerEventsDisabled.value),
    )
    const isPointerEventsEnabled = computed(() => index.value >= highestLayerWithOutsidePointerEventsDisabledIndex.value)

    const isBodyPointerEventsDisabled = computed(
      () => dismissableLayerContext.layersWithOutsidePointerEventsDisabled.size > 0,
    )

    const pointerdownOutside = usePointerdownOutside((event) => {
      const target = event.target as HTMLElement
      const isPointerDownOnBranch = [...dismissableLayerContext.branches].some(branch =>
        branch.contains(target),
      )

      if (!isPointerEventsEnabled.value || isPointerDownOnBranch)
        return

      emit('pointerdownOutside', event)
      emit('interactOutside', event)

      if (!event.defaultPrevented)
        emit('dismiss')
    }, ownerDocument.value)

    const focusoutSide = useFocusoutSide((event) => {
      const target = event.target as HTMLElement
      const isFocusInBranch = [...dismissableLayerContext.branches].some(branch =>
        branch.contains(target),
      )

      if (isFocusInBranch)
        return

      emit('focusoutSide', event)
      emit('interactOutside', event)

      if (!event.defaultPrevented)
        emit('dismiss')
    }, ownerDocument.value)

    useEscapeKeydown((event) => {
      const isHighestLayer = index.value === dismissableLayerContext.layersRoot.size - 1

      if (!isHighestLayer)
        return

      emit('escapeKeyDown', event)

      if (!event.defaultPrevented && props.onDismiss)
        emit('dismiss')
    }, ownerDocument.value)

    watchEffect(async (onInvalidate) => {
      if (!node.value)
        return

      if (disableOutsidePointerEvents.value) {
        if (dismissableLayerContext.layersWithOutsidePointerEventsDisabled.size === 0) {
          originalBodyPointerEvents
            = ownerDocument.value.body.style.pointerEvents
          ownerDocument.value.body.style.pointerEvents = 'none'
        }
        await nextTick()
        dismissableLayerContext.layersWithOutsidePointerEventsDisabled.add(node.value)
      }

      dismissableLayerContext.layersRoot.add(node.value)

      dispatchUpdate()

      onInvalidate(() => {
        if (
          disableOutsidePointerEvents.value
          && dismissableLayerContext.layersWithOutsidePointerEventsDisabled.size === 1
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
        dismissableLayerContext.layersRoot.delete(node.value)
        dismissableLayerContext.layersWithOutsidePointerEventsDisabled.delete(node.value)
        dispatchUpdate()
      })
    })

    const handleUpdate = () => { }

    onMounted(() => {
      document.addEventListener(INJECT_UPDATE, handleUpdate)
    })

    onBeforeUnmount(() => {
      document.removeEventListener(INJECT_UPDATE, handleUpdate)
    })
    const originalReturn = () =>
      h(
        Primitive.div,
        {
          ...mergeProps(attrs, reactiveLayerProps),
          ref: composedRefs,
          style: {
            pointerEvents: isBodyPointerEventsDisabled.value
              ? isPointerEventsEnabled.value
                ? 'auto'
                : 'none'
              : undefined,
            ...(attrs.style as CSSPropertyRule),
          },
          onFocusCapture: composeEventHandlers<FocusCaptureEvent>((e) => {
            emit('focusCapture', e)
          }, focusoutSide.onFocusCapture),
          onBlurCapture: composeEventHandlers<FocusBlurCaptureEvent>((e) => {
            emit('blurCapture', e)
          }, focusoutSide.onBlurCapture),
          onPointerdownCapture: composeEventHandlers<PointerdownCaptureEvent>(
            (e) => {
              emit('pointerdownCapture', e)
            },
            pointerdownOutside.onPointerdownCapture,
          ),
        }, slots,
      )

    return originalReturn
  },
})

export const OkuDismissableLayer = DismissableLayer as typeof DismissableLayer &
(new () => {
  $props: DismissableLayerNativeElement
})
