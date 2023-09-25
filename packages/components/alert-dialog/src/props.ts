import type { DialogCloseProps, DialogContentProps, DialogDescriptionProps, DialogOverlayProps, DialogProps, DialogTitleProps, DialogTriggerProps, OkuDialog, OkuDialogClose, OkuDialogContent, OkuDialogDescription, OkuDialogOverlay, OkuDialogPortal, OkuDialogTitle, OkuDialogTrigger } from '@oku-ui/dialog'
import type { OkuElement } from '@oku-ui/primitive'
import { propsOmit } from '@oku-ui/primitive'
import { createDialogScope, dialogCloseProps, dialogContentProps, dialogDescriptionProps, dialogOverlayProps, dialogProps, dialogTitleProps, dialogTriggerProps } from '@oku-ui/dialog'
import type { Scope } from '@oku-ui/provide'
import { ScopePropObject, createProvideScope } from '@oku-ui/provide'
import type { PropType, Ref } from 'vue'

export const ROOT_NAME = 'OkuAlertDialog'
export const TITLE_NAME = 'OkuAlertDialogTitle'
export const CONTENT_NAME = 'OkuAlertDialogContent'
export const DESCRIPTION_NAME = 'OkuAlertDialogDescription'
export const TRIGGER_NAME = 'OkuAlertDialogTrigger'
export const PORTAL_NAME = 'OkuAlertDialogPortal'
export const OVERLAY_NAME = 'OkuAlertDialogOverlay'
export const DESCRIPTION_WARNING_NAME = 'OkuAlertDialogDescriptionWarning'
export const CANCEL_NAME = 'OkuAlertDialogCancel'
export const ACTION_NAME = 'OkuAlertDialogAction'

export type ScopeDialog<T> = T & { scopeOkuAlertDialog?: Scope }

export const scopeAlertDialogProps = {
  scopeOkuAlertDialog: {
    ...ScopePropObject,
  },
}

/* -------------------------------------------------------------------------- */
/*                         AlertDialog - alert-dialog.ts                      */
/* -------------------------------------------------------------------------- */

export const [createAlertDialogProvider, createAlertDialogScope] = createProvideScope(ROOT_NAME, [createDialogScope])
export const useAlertDialogScope = createDialogScope()

type AlertDialogContentContextValue = {
  cancelRef: Ref<HTMLButtonElement | null>

}

export const [AlertDialogContentProvider, useAlertDialogContentInject]
  = createAlertDialogProvider<AlertDialogContentContextValue>(ROOT_NAME)

export type AlertDialogNaviteElement = OkuElement<'div'>
export type AlertDialogElement = typeof OkuDialog

export interface AlertDialogProps extends Omit<DialogProps, 'modal'> { }

export type AlertDialogEmits = {
  openChange: [open: boolean]
  modelValue: [open: boolean]
}

export const alertDialogProps = {
  props: {
    ...propsOmit(dialogProps.props, ['modal']),
  },
  emits: {
    ...dialogProps.emits,
  },
}

/* -------------------------------------------------------------------------- */
/*                         AlertDialogTrigger - alert-dialog-trigger.ts       */
/* -------------------------------------------------------------------------- */

export type AlertDialogTriggerNaviteElement = OkuElement<'button'>
export type AlertDialogTriggerElement = typeof OkuDialogTrigger

export interface AlertDialogTriggerProps extends DialogTriggerProps { }

export type AlertDialogTriggerEmits = {
  click: [event: MouseEvent]
}

export const alertDialogTriggerProps = {
  props: {
    ...dialogTriggerProps.props,
  },
  emits: {
    ...dialogTriggerProps.emits,
  },
}

/* -------------------------------------------------------------------------- */
/*                         AlertDialogTitle - alert-dialog-title.ts           */
/* -------------------------------------------------------------------------- */

export type AlertDialogTitleNaviteElement = OkuElement<'h2'>
export type AlertDialogTitleElement = typeof OkuDialogTitle

export interface AlertDialogTitleProps extends DialogTitleProps { }

export type AlertDialogTitleEmits = {
  click: [event: MouseEvent]
}

export const alertDialogTitleProps = {
  props: {
    ...dialogTitleProps.props,
  },
  emits: {
    ...dialogTitleProps.emits,
  },
}

/* -------------------------------------------------------------------------- */
/*                         AlertDialogPortal - alert-dialog-portal.ts         */
/* -------------------------------------------------------------------------- */

export type AlertDialogPortalNaviteElement = OkuElement<'div'>
export type AlertDialogPortalElement = typeof OkuDialogPortal

export interface AlertDialogPortalProps extends DialogTriggerProps { }

export type AlertDialogPortalEmits = {
  click: [event: MouseEvent]
}

export const alertDialogPortalProps = {
  props: {
    ...dialogTriggerProps.props,
  },
  emits: {
    ...dialogTriggerProps.emits,
  },
}

/* -------------------------------------------------------------------------- */
/*                         AlertDialogOverlay - alert-dialog-overlay.ts       */
/* -------------------------------------------------------------------------- */

export type AlertDialogOverlayNaviteElement = OkuElement<'div'>
export type AlertDialogOverlayElement = typeof OkuDialogOverlay

export interface AlertDialogOverlayProps extends DialogOverlayProps { }

export type AlertDialogOverlayEmits = {
  click: [event: MouseEvent]
}

export const alertDialogOverlayProps = {
  props: {
    ...dialogOverlayProps.props,
  },
  emits: {
    ...dialogOverlayProps.emits,
  },
}

/* -------------------------------------------------------------------------- */
/*                 AlertDialogDescription - alert-dialog-description.ts       */
/* -------------------------------------------------------------------------- */

export type AlertDialogDescriptionNaviteElement = OkuElement<'p'>
export type AlertDialogDescriptionElement = typeof OkuDialogDescription

export interface AlertDialogDescriptionProps extends DialogDescriptionProps { }

export type AlertDialogDescriptionEmits = {
  click: [event: MouseEvent]
}

export const alertDialogDescriptionProps = {
  props: {
    ...dialogDescriptionProps.props,
  },
  emits: {
    ...dialogDescriptionProps.emits,
  },
}

/* -------------------------------------------------------------------------- */
/*  AlertDialogDescriptionWarning - alert-dialog-description-warning.ts       */
/* -------------------------------------------------------------------------- */

export type DescriptionWarningProps = {
  contentRef: HTMLDivElement
}
export const dialogDescriptionWarningProps = {
  props: {
    contentRef: {
      type: [Object, null] as PropType<HTMLDivElement | null>,
      required: true,
    },
  },
  emits: {
  },
}

/* -------------------------------------------------------------------------- */
/*                 AlertDialogContent - alert-dialog-content.ts               */
/* -------------------------------------------------------------------------- */

export type AlertDialogContentNaviteElement = OkuElement<'div'>
export type AlertDialogContentElement = typeof OkuDialogContent

export interface AlertDialogContentProps extends Omit<DialogContentProps, 'onPointerDownOutside' | 'onInteractOutside'> { }

export type AlertDialogContentEmits = {
  click: [event: MouseEvent]
}

export const alertDialogContentProps = {
  props: {
    ...dialogContentProps.props,
  },
  emits: {
    ...propsOmit(dialogContentProps.emits, ['pointerdownOutside', 'interactOutside']),
  },
}

/* -------------------------------------------------------------------------- */
/*                 AlertDialogCancel - alert-dialog-cancel.ts                 */
/* -------------------------------------------------------------------------- */

export type AlertDialogCancelNaviteElement = OkuElement<'button'>
export type AlertDialogCancelElement = typeof OkuDialogClose

export interface AlertDialogCancelProps extends DialogCloseProps { }

export type AlertDialogCancelEmits = {
  click: [event: MouseEvent]
}

export const alertDialogCancelProps = {
  props: {
    ...dialogCloseProps.props,
  },
  emits: {
    ...dialogCloseProps.emits,
  },
}

/* -------------------------------------------------------------------------- */
/*                 AlertDialogAction - alert-dialog-action.ts                 */
/* -------------------------------------------------------------------------- */

export type AlertDialogActionNaviteElement = OkuElement<'button'>
export type AlertDialogActionElement = typeof OkuDialogClose

export interface AlertDialogActionProps extends DialogCloseProps { }

export type AlertDialogActionEmits = {
  click: [event: MouseEvent]
}

export const alertDialogActionProps = {
  props: {
    ...dialogCloseProps.props,
  },
  emits: {
    ...dialogCloseProps.emits,
  },
}
