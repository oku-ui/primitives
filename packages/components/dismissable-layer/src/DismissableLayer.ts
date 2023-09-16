import {
  reactiveOmit,
  useComposedRefs,
  useEscapeKeydown,
  useForwardRef,
} from '@oku-ui/use-composable'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import {
  computed,
  defineComponent,
  h,
  mergeProps,
  onMounted,
  onUnmounted,
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
import type { DismissableLayerNativeElement, FocusBlurCaptureEvent, FocusCaptureEvent, PointerdownCaptureEvent } from './props'
import { DISMISSABLE_NAME, INJECT_UPDATE, dismissableLayerContext, dismissableLayerProps } from './props'

let originalBodyPointerEvents: string

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
    }, ownerDocument)

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
    }, ownerDocument)

    useEscapeKeydown((event) => {
      const isHighestLayer = index.value === dismissableLayerContext.layersRoot.size - 1

      if (!isHighestLayer)
        return

      emit('escapeKeyDown', event)

      if (!event.defaultPrevented)
        emit('dismiss')
    }, ownerDocument)

    watchEffect(async (onInvalidate) => {
      if (!node.value)
        return

      if (disableOutsidePointerEvents.value) {
        if (dismissableLayerContext.layersWithOutsidePointerEventsDisabled.size === 0) {
          originalBodyPointerEvents
            = ownerDocument.value.body.style.pointerEvents
          ownerDocument.value.body.style.pointerEvents = 'none'
        }
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

    onUnmounted(() => {
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
