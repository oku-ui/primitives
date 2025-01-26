import type { Ref } from 'vue'
import type { EmitsToHookProps, PrimitiveDefaultProps, PrimitiveElAttrs, RadixPrimitiveReturns } from '../shared/index.ts'
import { computed, onWatcherCleanup, shallowReactive, shallowRef, watch } from 'vue'
import { useEscapeKeydown } from '../hooks/index.ts'
import { mergePrimitiveAttrs } from '../shared/index.ts'
import { useFocusOutside, usePointerdownOutside } from './utils.ts'

export type PointerdownOutsideEvent = CustomEvent<{ originalEvent: PointerEvent }>
export type FocusOutsideEvent = CustomEvent<{ originalEvent: FocusEvent }>

export interface DismissableLayerProps {
  /**
   * When `true`, hover/focus/click interactions will be disabled on elements outside
   * the `DismissableLayer`. Users will need to click twice on outside elements to
   * interact with them: once to close the `DismissableLayer`, and again to trigger the element.
   */
  disableOutsidePointerEvents?: boolean
}

export const DEFAULT_DISMISSABLE_LAYER_PROPS = {
  disableOutsidePointerEvents: false,
} satisfies PrimitiveDefaultProps<DismissableLayerProps, 'disableOutsidePointerEvents'>

export type DismissableLayerEmits = {
  /**
   * Event handler called when the escape key is down.
   * Can be prevented.
   */
  escapeKeydown: [event: KeyboardEvent]
  /**
   * Event handler called when the a `pointerdown` event happens outside of the `DismissableLayer`.
   * Can be prevented.
   */
  pointerdownOutside: [event: PointerdownOutsideEvent]
  /**
   * Event handler called when the focus moves outside of the `DismissableLayer`.
   * Can be prevented.
   */
  focusOutside: [event: FocusOutsideEvent]
  /**
   * Event handler called when an interaction happens outside the `DismissableLayer`.
   * Specifically, when a `pointerdown` event happens outside or focus moves outside of it.
   * Can be prevented.
   */
  interactOutside: [event: PointerdownOutsideEvent | FocusOutsideEvent]
  /**
   * Handler called when the `DismissableLayer` should be dismissed
   */
  dismiss: []

  // focusCapture: [event: FocusEvent]
  // blurCapture: [event: FocusEvent]
  // pointerdownCapture: [event: FocusEvent]
}

export const context = {
  layers: shallowReactive(new Set<HTMLElement>()),
  layersWithOutsidePointerEventsDisabled: shallowReactive(new Set<HTMLElement>()),
  branches: shallowReactive(new Set<HTMLElement>()),
}

let originalBodyPointerEvents: string | undefined

export interface UseDismissableLayerProps extends EmitsToHookProps<DismissableLayerEmits> {
  el?: Ref<HTMLElement | undefined>
  disableOutsidePointerEvents?: () => boolean
}

export function useDismissableLayer(props: UseDismissableLayerProps = {}): RadixPrimitiveReturns {
  const { disableOutsidePointerEvents = () => false } = props

  const el = props.el || shallowRef<HTMLElement>()
  const setElRef = props.el ? undefined : (value: HTMLElement | undefined) => el.value = value

  const ownerDocument = () => el.value?.ownerDocument ?? globalThis?.document

  const index = computed(() => el.value ? Array.from(context.layers).indexOf(el.value) : -1)

  const isBodyPointerEventsDisabled = computed(() => context.layersWithOutsidePointerEventsDisabled.size > 0)

  const isPointerEventsEnabled = computed(() => {
    const layers = Array.from(context.layers)
    const [highestLayerWithOutsidePointerEventsDisabled] = [...context.layersWithOutsidePointerEventsDisabled].slice(-1)
    const highestLayerWithOutsidePointerEventsDisabledIndex = highestLayerWithOutsidePointerEventsDisabled ? layers.indexOf(highestLayerWithOutsidePointerEventsDisabled) : -1

    return index.value >= highestLayerWithOutsidePointerEventsDisabledIndex
  })

  usePointerdownOutside((event) => {
    if (!isPointerEventsEnabled.value)
      return

    const target = event.target as HTMLElement

    const isPointerdownOnBranch = [...context.branches].some(branch => branch.contains(target))
    if (isPointerdownOnBranch)
      return

    props.onPointerdownOutside?.(event)
    props.onInteractOutside?.(event)

    if (!event.defaultPrevented) {
      props.onDismiss?.()
    }
  }, el)

  useFocusOutside((event) => {
    const target = event.target as HTMLElement

    const isFocusInBranch = [...context.branches].some(branch => branch.contains(target))
    if (isFocusInBranch)
      return

    props.onFocusOutside?.(event)
    props.onInteractOutside?.(event)

    if (!event.defaultPrevented)
      props.onDismiss?.()
  }, el)

  useEscapeKeydown((event) => {
    const isHighestLayer = index.value === context.layers.size - 1

    if (!isHighestLayer)
      return

    props.onEscapeKeydown?.(event)

    if (!event.defaultPrevented) {
      event.preventDefault()
      props.onDismiss?.()
    }
  }, ownerDocument)

  watch(el, (nodeVal) => {
    if (!nodeVal)
      return

    const ownerDocumentVal = ownerDocument()

    const _disableOutsidePointerEvents = disableOutsidePointerEvents()
    if (_disableOutsidePointerEvents) {
      if (context.layersWithOutsidePointerEventsDisabled.size === 0) {
        originalBodyPointerEvents = ownerDocumentVal.body.style.pointerEvents
        ownerDocumentVal.body.style.pointerEvents = 'none'
      }
      context.layersWithOutsidePointerEventsDisabled.add(nodeVal)
    }

    context.layers.add(nodeVal)

    onWatcherCleanup(() => {
      if (_disableOutsidePointerEvents && context.layersWithOutsidePointerEventsDisabled.size === 1) {
        if (!originalBodyPointerEvents) {
          const syles = ownerDocumentVal.body.style
          syles.removeProperty('pointer-events')
        }
        else {
          ownerDocumentVal.body.style.pointerEvents = originalBodyPointerEvents
        }
      }

      /**
       * We purposefully prevent combining this effect with the `disableOutsidePointerEvents` effect
       * because a change to `disableOutsidePointerEvents` would remove this layer from the stack
       * and add it to the end again so the layering order wouldn't be _creation order_.
       * We only want them to be removed from context stacks when unmounted.
       */
      context.layers.delete(nodeVal)
      context.layersWithOutsidePointerEventsDisabled.delete(nodeVal)
    })
  })

  // const onFocusCapture = composeEventHandlers<FocusEvent>((event) => {
  //   emits.onFocusCapture?.(event)
  // }, focusOutside.onFocusCapture)

  // const onBlurCapture = composeEventHandlers<FocusEvent>((event) => {
  //   emits.onBlurCapture?.(event)
  // }, focusOutside.onBlurCapture)

  // const onPointerdownCapture = composeEventHandlers<FocusEvent>((event) => {
  //   // emits.onPointerdownCapture?.(event)
  // }, pointerdownOutside.onPointerdownCapture)

  return {
    attrs(extraAttrs) {
      const attrs: PrimitiveElAttrs = {
        'elRef': setElRef,
        'data-dismissable-layer': true,
        'style': {
          pointerEvents: isBodyPointerEventsDisabled.value
            ? isPointerEventsEnabled.value
              ? 'auto'
              : 'none'
            : undefined,
        },
      }

      if (extraAttrs && extraAttrs.length > 0)
        mergePrimitiveAttrs(attrs, extraAttrs)

      return attrs
    },
  }
}
