import { reactiveOmit, useComposedRefs, useEscapeKeydown, useForwardRef } from '@oku-ui/use-composable'
import { Primitive } from '@oku-ui/primitive'
import { computed, defineComponent, h, mergeProps, reactive, ref, toRefs, watchEffect } from 'vue'
import { composeEventHandlers } from '@oku-ui/utils'
import { dispatchUpdate, useFocusOutside, usePointerdownOutside } from './util'
import type { DismissableLayerElement, DismissableLayerNativeElement, FocusBlurCaptureEvent, FocusCaptureEvent, PointerdownCaptureEvent } from './props'
import { DISMISSABLE_NAME, INJECT_UPDATE, dismissableLayerInject, dismissableLayerProps, scopeDismissableLayerProps } from './props'

let originalBodyPointerEvents: string

const DismissableLayer = defineComponent({
  name: DISMISSABLE_NAME,
  inheritAttrs: false,
  props: {
    ...dismissableLayerProps.props,
    ...scopeDismissableLayerProps,
  },
  emits: dismissableLayerProps.emits,
  setup(props, { attrs, emit, slots }) {
    const { disableOutsidePointerEvents, ...layerProps } = toRefs(props)
    const _reactive = reactive(layerProps)
    const reactiveLayerProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const inject = dismissableLayerInject
    const node = ref<DismissableLayerElement | null>(null)
    const ownerDocument = computed(() => node.value?.ownerDocument ?? globalThis?.document)
    const force = ref({})
    const forwardedRef = useForwardRef()
    const composedRefs = useComposedRefs(forwardedRef, node)
    const layers = computed(() => Array.from(inject.layers))
    const highestLayerWithOutsidePointerEventsDisabled = computed(() => {
      const [highestLayerWithOutsidePointerEventsDisabled] = [
        ...inject.layersWithOutsidePointerEventsDisabled,
      ].slice(-1)

      return highestLayerWithOutsidePointerEventsDisabled
    })
    // const [highestLayerWithOutsidePointerEventsDisabled] = [...inject.layersWithOutsidePointerEventsDisabled].slice(-1)
    const highestLayerWithOutsidePointerEventsDisabledIndex = computed(() => layers.value.indexOf(highestLayerWithOutsidePointerEventsDisabled.value))
    const index = computed(() => node.value ? layers.value.indexOf(node.value) : -1)
    const isBodyPointerEventsDisabled = computed(() => inject.layersWithOutsidePointerEventsDisabled.size > 0)
    const isPointerEventsEnabled = computed(() => index.value >= highestLayerWithOutsidePointerEventsDisabledIndex.value)

    const pointerdownOutside = usePointerdownOutside((event) => {
      const target = event.target as HTMLElement
      const isPointerdownOnBranch = [...inject.branches].some(branch => branch.contains(target))
      if (!isPointerEventsEnabled.value || isPointerdownOnBranch)
        return

      emit('pointerdownOutside', event)
      emit('interactOutside', event)

      if (!event.defaultPrevented)
        emit('dismiss')
    }, ownerDocument)

    const focusOutside = useFocusOutside((event) => {
      const target = event.target as HTMLElement
      const isFocusInBranch = [...inject.branches].some(branch => branch.contains(target))
      if (isFocusInBranch)
        return

      emit('focusOutside', event)
      emit('interactOutside', event)

      if (!event.defaultPrevented)
        emit('dismiss')
    }, ownerDocument)

    useEscapeKeydown((event) => {
      const isHighestLayer = index.value === inject.layers.size - 1
      if (!isHighestLayer)
        return

      // eslint-disable-next-line no-console
      console.log('useEscapeKeydown', event)

      emit('escapeKeydown', event)

      if (!event.defaultPrevented) {
        event.preventDefault()
        emit('dismiss')
      }
    }, ownerDocument)

    watchEffect(async (onInvalidate) => {
      if (!node.value)
        return

      if (disableOutsidePointerEvents.value) {
        if (inject.layersWithOutsidePointerEventsDisabled.size === 0) {
          originalBodyPointerEvents = ownerDocument.value.body.style.pointerEvents
          ownerDocument.value.body.style.pointerEvents = 'none'
        }
        inject.layersWithOutsidePointerEventsDisabled.add(node.value)
      }

      inject.layers.add(node.value)

      dispatchUpdate()

      onInvalidate(() => {
        if (
          disableOutsidePointerEvents.value
          && inject.layersWithOutsidePointerEventsDisabled.size === 1
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

        inject.layers.delete(node.value)
        inject.layersWithOutsidePointerEventsDisabled.delete(node.value)
        dispatchUpdate()
      })
    })

    // const handleUpdate = () => force.value = { }

    // onMounted(() => {
    //   document.addEventListener(INJECT_UPDATE, handleUpdate)
    // })

    // onBeforeUnmount(() => {
    //   document.removeEventListener(INJECT_UPDATE, handleUpdate)
    // })

    watchEffect((onInvalidate) => {
      const handleUpdate = () => force.value = {}
      document.addEventListener(INJECT_UPDATE, handleUpdate)

      onInvalidate(() => document.removeEventListener(INJECT_UPDATE, handleUpdate))
    })

    return () => h(Primitive.div,
      {
        ...mergeProps(attrs, reactiveLayerProps),
        ref: composedRefs,
        style: {
          pointerEvents: isBodyPointerEventsDisabled.value
            ? isPointerEventsEnabled.value
              ? 'auto'
              : 'none'
            : undefined,
          ...(attrs.style as any),
        },
        onFocusCapture: composeEventHandlers<FocusCaptureEvent>((event) => {
          emit('focusCapture', event)
        }, focusOutside.onFocusCapture),
        onBlurCapture: composeEventHandlers<FocusBlurCaptureEvent>((event) => {
          emit('blurCapture', event)
        }, focusOutside.onBlurCapture),
        onPointerdownCapture: composeEventHandlers<PointerdownCaptureEvent>((event) => {
          emit('pointerdownCapture', event)
        }, pointerdownOutside.onPointerdownCapture),
      }, slots,
    )
  },
})

export const OkuDismissableLayer = DismissableLayer as typeof DismissableLayer &
(new () => { $props: DismissableLayerNativeElement })
