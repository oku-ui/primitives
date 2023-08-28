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
  onMounted,
  onUnmounted,
  provide,
  reactive,
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
  pointerdownoutSide: [event: PointerDownOutsideEvent]
  /**
   * Event handler called when the focus moves outside of the `DismissableLayer`.
   * Can be prevented.
   */
  focusoutSide: [event: FocusOutsideEvent]
  /**
  * Event handler called when an interaction happens outside the `DismissableLayer`.
  * Specifically, when a `pointerdown` event happens outside or focus moves outside of it.
  * Can be prevented.
  */
  interactoutSide: [event: PointerDownOutsideEvent | FocusOutsideEvent]
  /**
  * Handler called when the `DismissableLayer` should be dismissed
  */
  dismiss: []
  focusCapture: [event: FocusCaptureEvent]
  blurCapture: [event: FocusBlurCaptureEvent]
  pointerdownCapture: [event: PointerDownCaptureEvent]
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
    pointerdownOutside: (event: PointerDownOutsideEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    focusoutSide: (event: FocusOutsideEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    interactoutSide: (event: PointerDownOutsideEvent | FocusOutsideEvent) => true,
    dismiss: () => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    focusCapture: (event: FocusCaptureEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    blurCapture: (event: FocusBlurCaptureEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    pointerdownCapture: (event: PointerDownCaptureEvent) => true,
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
    const { disableOutsidePointerEvents } = toRefs(props)
    const { ...dismissableLayerAttrs } = attrs

    const provider = reactive<DismissableLayerProvideValue>({
      layers: ref(new Set<DismissableLayerElement>()),
      layersWithOutsidePointerEventsDisabled: ref(
        new Set<DismissableLayerElement>(),
      ),
      branches: ref(new Set<DismissableLayerElement>()),
    })

    const layers = computed(() => Array.from(provider.layers))

    provide<DismissableLayerProvideValue, symbol>(DismissableLayerProvideKey, {
      layers: provider.layers,
      layersWithOutsidePointerEventsDisabled: provider.layersWithOutsidePointerEventsDisabled,
      branches: provider.branches,
    })

    const node = ref<HTMLDivElement | null>(null)

    const forwardedRef = useForwardRef()
    const composedRefs = useComposedRefs(node, forwardedRef)

    const ownerDocument = computed(
      () => node.value?.ownerDocument ?? globalThis?.document,
    )

    const highestLayerWithOutsidePointerEventsDisabled = computed(() => {
      const [highestLayerWithOutsidePointerEventsDisabled] = [
        ...provider.layersWithOutsidePointerEventsDisabled,
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
      () => provider.layersWithOutsidePointerEventsDisabled.size > 0,
    )

    const isPointerEventsEnabled = computed(() => {
      return (
        index.value >= highestLayerWithOutsidePointerEventsDisabledIndex.value
      )
    })

    const pointerDownOutside = usePointerDownOutside((event) => {
      const target = event.target as HTMLElement
      const isPointerDownOnBranch = [...provider.branches].some(branch =>
        branch.contains(target),
      )

      if (!isPointerEventsEnabled.value || isPointerDownOnBranch)
        return

      emit('pointerdownOutside', event)
      emit('interactoutSide', event)

      if (!event.defaultPrevented)
        emit('dismiss')
    }, ownerDocument.value)

    const focusOutside = useFocusOutside((event) => {
      const target = event.target as HTMLElement
      const isFocusInBranch = [...provider.branches].some(branch =>
        branch.contains(target),
      )

      if (isFocusInBranch)
        return

      emit('focusoutSide', event)
      emit('interactoutSide', event)

      if (!event.defaultPrevented)
        emit('dismiss')
    }, ownerDocument.value)

    useEscapeKeydown((event) => {
      const isHighestLayer = index.value === provider.layers.size - 1

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
        if (provider.layersWithOutsidePointerEventsDisabled.size === 0) {
          originalBodyPointerEvents
            = ownerDocument.value.body.style.pointerEvents
          ownerDocument.value.body.style.pointerEvents = 'none'
        }
        provider.layersWithOutsidePointerEventsDisabled.add(node.value)
      }

      provider.layers.add(node.value)

      dispatchUpdate()

      onInvalidate(() => {
        if (
          disableOutsidePointerEvents.value
          && provider.layersWithOutsidePointerEventsDisabled.size === 1
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
        provider.layers.delete(node.value)
        provider.layersWithOutsidePointerEventsDisabled.delete(node.value)
        dispatchUpdate()
      })
    })

    const handleUpdate = () => { }

    onMounted(() => {
      document.addEventListener(INJECT_UPDATE, handleUpdate)
    })

    onUnmounted(() => {
      document.removeEventListener(INJECT_UPDATE, handleUpdate)
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
          onPointerdownCapture: composeEventHandlers<PointerDownCaptureEvent>(
            (e) => {
              emit('pointerdownCapture', e)
            },
            pointerDownOutside.onPointerdownCapture,
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
