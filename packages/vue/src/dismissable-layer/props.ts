export const DISMISSABLE_NAME = 'OkuDismissableLayer'
export const BRANCH_NAME = 'OkuDismissableLayerBranch'

export const POINTER_DOWN_OUTSIDE = 'dismissableLayer.pointerdownOutside'
export const FOCUS_OUTSIDE = 'dismissableLayer.focusOutside'

export const DismissableLayerProvideKey = Symbol('DismissableLayerProvide')

export type DismissableLayerElement = HTMLDivElement

export type PointerdownOutsideEvent = CustomEvent<{ originalEvent: PointerEvent }>
export type FocusOutsideEvent = CustomEvent<{ originalEvent: FocusEvent }>

export type FocusCaptureEvent = CustomEvent<{ originalEvent: FocusEvent }>
export type FocusBlurCaptureEvent = CustomEvent<{ originalEvent: FocusEvent }>
export type PointerdownCaptureEvent = CustomEvent<{ originalEvent: PointerEvent }>
export type DismissableLayerBranchElement = HTMLDivElement
