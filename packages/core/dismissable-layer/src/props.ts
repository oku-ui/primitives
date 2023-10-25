import { type Ref, reactive } from 'vue'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { primitiveProps } from '@oku-ui/primitive'
import type { Scope } from '@oku-ui/provide'
import { ScopePropObject } from '@oku-ui/provide'

export type ScopeDismissableLayer<T> = T & { scopeOkuDismissableLayer?: Scope }

export const scopeDismissableLayerProps = {
  scopeOkuDismissableLayer: {
    ...ScopePropObject,
  },
}

// NAMES
export const DISMISSABLE_NAME = 'OkuDismissableLayer'
export const BRANCH_NAME = 'OkuDismissableLayerBranch'

/* -------------------------------------------------------------------------------------------------
* DismissableLayer - DismissableLayer.ts
* ----------------------------------------------------------------------------------------------- */

export const INJECT_UPDATE = 'dismissableLayer.update'
export const POINTER_DOWN_OUTSIDE = 'dismissableLayer.pointerdownOutside'
export const FOCUS_OUTSIDE = 'dismissableLayer.focusOutside'

export const DismissableLayerProvideKey = Symbol('DismissableLayerProvide')

export type DismissableLayerProvideValue = {
  layers: Ref<Set<DismissableLayerElement>>
  layersWithOutsidePointerEventsDisabled: Ref<Set<DismissableLayerElement>>
  branches: Ref<Set<DismissableLayerBranchElement>>
}

export const dismissableLayerInject = reactive({
  layers: new Set<DismissableLayerElement>(),
  layersWithOutsidePointerEventsDisabled: new Set<DismissableLayerElement>(),
  branches: new Set<DismissableLayerBranchElement>(),
})

export type DismissableLayerNativeElement = OkuElement<'div'>
export type DismissableLayerElement = HTMLDivElement

export type PointerdownOutsideEvent = CustomEvent<{ originalEvent: PointerEvent }>
export type FocusOutsideEvent = CustomEvent<{ originalEvent: FocusEvent }>

export type FocusCaptureEvent = CustomEvent<{ originalEvent: FocusEvent }>
export type FocusBlurCaptureEvent = CustomEvent<{ originalEvent: FocusEvent }>
export type PointerdownCaptureEvent = CustomEvent<{ originalEvent: PointerEvent }>

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
    ...primitiveProps,
  },

  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    escapeKeydown: (event: KeyboardEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    pointerdownOutside: (event: PointerdownOutsideEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    focusOutside: (event: FocusOutsideEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    interactOutside: (event: PointerdownOutsideEvent | FocusOutsideEvent) => true,
    dismiss: () => true,

    // eslint-disable-next-line unused-imports/no-unused-vars
    focusCapture: (event: FocusCaptureEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    blurCapture: (event: FocusBlurCaptureEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    pointerdownCapture: (event: PointerdownCaptureEvent) => true,
  },
}

/* -------------------------------------------------------------------------------------------------
 * DismissableLayerBranch - DismissableLayerBranch.ts
 * ----------------------------------------------------------------------------------------------- */

export type DismissableLayerBranchNativeElement = OkuElement<'div'>
export type DismissableLayerBranchElement = HTMLDivElement

export interface DismissableLayerBranchProps extends PrimitiveProps { }

export const dismissableLayerBranchProps = {
  props: {
    ...primitiveProps,
  },
  emits: {},
}
