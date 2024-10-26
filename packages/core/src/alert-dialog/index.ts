export { DialogTrigger as AlertDialogTrigger } from '../dialog/index.ts'
export { DialogTitle as AlertDialogTitle } from '../dialog/index.ts'
export { DialogDescription as AlertDialogDescription } from '../dialog/index.ts'
export { DialogClose as AlertDialogAction } from '../dialog/index.ts'
export { DialogOverlay as AlertDialogOverlay } from '../dialog/index.ts'
export { DialogPortal as AlertDialogPortal } from '../dialog/index.ts'
export { default as AlertDialogCancel } from './AlertDialogCancel.vue'
export {
  type AlertDialogContentProps,
  DEFAULT_ALERT_DIALOG_CONTENT_PROPS,
  type UseAlertDialogContent,
  useAlertDialogContent,
} from './AlertDialogContent.ts'
export { default as AlertDialogContent } from './AlertDialogContent.vue'

export {
  type AlertDialogContext,
  type AlertDialogRootEmits,
  type AlertDialogRootProps,
  provideAlertDialogContext,
  useAlertDialogContext,
} from './AlertDialogRoot.ts'

export { default as AlertDialogRoot } from './AlertDialogRoot.vue'
