import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import type { OkuElement } from '@oku-ui/primitive'
import { primitiveProps, propsOmit } from '@oku-ui/primitive'
import type { DialogProps } from '@oku-ui/dialog'
import { OkuDialog, dialogProps } from '@oku-ui/dialog'
import { ROOT_NAME, scopeAlertDialogProps } from './utils'

export type AlertDialogNaviteElement = OkuElement<'div'>
export type AlertDialogElement = typeof OkuDialog

export interface AlertDialogProps extends Omit<DialogProps, 'modal'> {}

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
const alertDialog = defineComponent({
  name: ROOT_NAME,
  components: { OkuDialog },
  inheritAttrs: false,
  props: {
    ...primitiveProps,
    ...alertDialogProps.props,
    ...scopeAlertDialogProps,
  },
  emits: alertDialogProps.emits,
  setup(props, { attrs, slots }) {
    const { scopeOkuAlertDialog: _scope, ...alertDialogProps } = toRefs(props)

    const _props = reactive(alertDialogProps)

    const originalReturn = () => h(OkuDialog, {
      ...mergeProps(attrs, _props),
      modal: true,
    },
    {
      default: () => slots.default?.(),
    })
    return originalReturn
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuAlertDialog = alertDialog as typeof alertDialog &
(new () => {
  $props: AlertDialogNaviteElement
})
