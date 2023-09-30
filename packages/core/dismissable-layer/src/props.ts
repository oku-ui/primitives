import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { type Ref, reactive } from 'vue'

export const dismissableLayerContext = reactive({
  layersRoot: new Set<DismissableLayerElement>(),
  layersWithOutsidePointerEventsDisabled: new Set<DismissableLayerElement>(),
  branches: new Set<DismissableLayerElement>(),
})

export const INJECT_UPDATE = 'dismissableLayer.update'
export const POINTER_DOWN_OUTSIDE = 'dismissableLayer.pointerdownOutside'
export const FOCUS_OUTSIDE = 'dismissableLayer.focusoutSide'

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
