export { default as DialogRoot } from './DialogRoot.vue'
export { default as DialogTrigger } from './DialogTrigger.vue'
export { default as DialogContent } from './DialogContent.vue'
export { default as DialogTitle } from './DialogTitle.vue'
export { default as DialogDescription } from './DialogDescription.vue'
export { default as DialogClose } from './DialogClose.vue'
export { default as DialogOverlay } from './DialogOverlay.vue'
export { Portal as DialogPortal } from '../portal/index.ts'

export {
  type DialogRootProps,
  type DialogRootEmits,
  type DialogContext,
  provideDialogContext,
  useDialogContext,
} from './DialogRoot.ts'
export { type DialogTriggerProps, type DialogTriggerEmits } from './DialogTrigger.ts'
export { type DialogContentProps } from './DialogContent.ts'
export { type DialogTitleProps } from './DialogTitle.ts'
export { type DialogDescriptionProps } from './DialogDescription.ts'
export { type DialogCloseProps, type DialogCloseEmits } from './DialogClose.ts'
export { type DialogOverlayProps } from './DialogOverlay.ts'
