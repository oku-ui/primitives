import { computed, onWatcherCleanup, type Ref, shallowReactive, watch } from 'vue'
import { useEscapeKeydown } from '../hooks/index.ts'
import { composeEventHandlers } from '../utils/vue.ts'
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

// eslint-disable-next-line ts/consistent-type-definitions
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

  focusCapture: [event: FocusEvent]
  blurCapture: [event: FocusEvent]
  pointerdownCapture: [event: FocusEvent]
}

export const context = {
  layers: shallowReactive(new Set<HTMLElement>()),
  layersWithOutsidePointerEventsDisabled: shallowReactive(new Set<HTMLElement>()),
  branches: shallowReactive(new Set<HTMLElement>()),
}

let originalBodyPointerEvents: string | undefined

export interface UseDismissableLayerProps {
  disableOutsidePointerEvents: () => boolean
}
export interface UseDismissableLayerEmits {
  onPointerdownOutside?: (event: PointerdownOutsideEvent) => void
  onFocusOutside?: (event: FocusOutsideEvent) => void
  onInteractOutside?: (event: PointerdownOutsideEvent | FocusOutsideEvent) => void
  onEscapeKeydown?: (event: KeyboardEvent) => void
  onDismiss?: () => void
  onFocusCapture?: (event: FocusEvent) => void
  onBlurCapture?: (event: FocusEvent) => void
  onPointerdownCapture?: (event: FocusEvent) => void
}

export function useDismissableLayer($el: Ref<HTMLElement | undefined>, props: UseDismissableLayerProps, emits: UseDismissableLayerEmits) {
  const ownerDocument = () => $el.value?.ownerDocument ?? globalThis?.document

  const index = computed(() => $el.value ? Array.from(context.layers).indexOf($el.value) : -1)

  const isBodyPointerEventsDisabled = computed(() => context.layersWithOutsidePointerEventsDisabled.size > 0)

  const isPointerEventsEnabled = computed(() => {
    const layers = Array.from(context.layers)
    const [highestLayerWithOutsidePointerEventsDisabled] = [...context.layersWithOutsidePointerEventsDisabled].slice(-1)
    const highestLayerWithOutsidePointerEventsDisabledIndex = highestLayerWithOutsidePointerEventsDisabled ? layers.indexOf(highestLayerWithOutsidePointerEventsDisabled) : -1

    return index.value >= highestLayerWithOutsidePointerEventsDisabledIndex
  })

  const pointerdownOutside = usePointerdownOutside((event) => {
    if (!isPointerEventsEnabled.value)
      return

    const target = event.target as HTMLElement

    const isPointerdownOnBranch = [...context.branches].some(branch => branch.contains(target))
    if (isPointerdownOnBranch)
      return

    emits.onPointerdownOutside?.(event)
    emits.onInteractOutside?.(event)

    if (!event.defaultPrevented)
      emits.onDismiss?.()
  }, $el)

  const focusOutside = useFocusOutside((event) => {
    const target = event.target as HTMLElement

    const isFocusInBranch = [...context.branches].some(branch => branch.contains(target))
    if (isFocusInBranch)
      return

    emits.onFocusOutside?.(event)
    emits.onInteractOutside?.(event)

    if (!event.defaultPrevented)
      emits.onDismiss?.()
  }, $el)

  useEscapeKeydown((event) => {
    const isHighestLayer = index.value === context.layers.size - 1

    if (!isHighestLayer)
      return

    emits.onEscapeKeydown?.(event)

    if (!event.defaultPrevented) {
      event.preventDefault()
      emits.onDismiss?.()
    }
  }, ownerDocument)

  watch($el, (nodeVal) => {
    if (!nodeVal)
      return

    const ownerDocumentVal = ownerDocument()

    if (props.disableOutsidePointerEvents()) {
      if (context.layersWithOutsidePointerEventsDisabled.size === 0) {
        originalBodyPointerEvents = ownerDocumentVal.body.style.pointerEvents
        ownerDocumentVal.body.style.pointerEvents = 'none'
      }
      context.layersWithOutsidePointerEventsDisabled.add(nodeVal)
    }

    context.layers.add(nodeVal)

    onWatcherCleanup(() => {
      if (
        props.disableOutsidePointerEvents()
        && context.layersWithOutsidePointerEventsDisabled.size === 1
      ) {
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

  const onFocusCapture = composeEventHandlers<FocusEvent>((event) => {
    emits.onFocusCapture?.(event)
  }, focusOutside.onFocusCapture)

  const onBlurCapture = composeEventHandlers<FocusEvent>((event) => {
    emits.onBlurCapture?.(event)
  }, focusOutside.onBlurCapture)

  const onPointerdownCapture = composeEventHandlers<FocusEvent>((event) => {
    emits.onPointerdownCapture?.(event)
  }, pointerdownOutside.onPointerdownCapture)

  return {
    pointerEvents() {
      return isBodyPointerEventsDisabled.value
        ? isPointerEventsEnabled.value
          ? 'auto'
          : 'none'
        : undefined
    },
    onFocusCapture,
    onBlurCapture,
    onPointerdownCapture,
  }
}
