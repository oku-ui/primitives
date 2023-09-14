import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import type { OkuElement } from '@oku-ui/primitive'
import { primitiveProps } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
import type { DialogOverlayProps } from '@oku-ui/dialog'
import { OkuDialogOverlay, dialogOverlayProps } from '@oku-ui/dialog'
import { scopeAlertDialogProps, useAlertDialogScope } from './utils'

const OVERLAY_NAME = 'OkuAlertDialogOverlay'

export type AlertDialogOverlayNaviteElement = OkuElement<'div'>
export type AlertDialogOverlayElement = typeof OkuDialogOverlay

export interface AlertDialogOverlayProps extends DialogOverlayProps {}

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
const alertDialogOverlay = defineComponent({
  name: OVERLAY_NAME,
  inheritAttrs: false,
  props: {
    ...primitiveProps,
    ...alertDialogOverlayProps.props,
    ...scopeAlertDialogProps,
  },
  emits: alertDialogOverlayProps.emits,
  setup(props, { attrs, slots }) {
    const { scopeOkuAlertDialog, ...alertDialogOverlayProps } = toRefs(props)
    const dialogScope = useAlertDialogScope(scopeOkuAlertDialog.value)
    const forwardRef = useForwardRef()

    const _props = reactive(alertDialogOverlayProps)

    const originalReturn = () => h(OkuDialogOverlay, {
      ...dialogScope,
      ...mergeProps(attrs, _props),
      ref: forwardRef,
    },
    {
      default: () => slots.default?.(),
    })
    return originalReturn
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuAlertDialogOverlay = alertDialogOverlay as typeof alertDialogOverlay &
(new () => {
  $props: AlertDialogOverlayNaviteElement
})
