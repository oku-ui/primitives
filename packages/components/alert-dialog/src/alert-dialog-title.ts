import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import type { OkuElement } from '@oku-ui/primitive'
import { primitiveProps } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
import type { DialogTitleProps } from '@oku-ui/dialog'
import { OkuDialogTitle, dialogTitleProps } from '@oku-ui/dialog'
import { scopeAlertDialogProps, useAlertDialogScope } from './utils'

const TITLE_NAME = 'OkuAlertDialogTitle'

export type AlertDialogTitleNaviteElement = OkuElement<'h2'>
export type AlertDialogTitleElement = typeof OkuDialogTitle

export interface AlertDialogTitleProps extends DialogTitleProps {}

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
const alertDialogTitle = defineComponent({
  name: TITLE_NAME,
  inheritAttrs: false,
  props: {
    ...primitiveProps,
    ...alertDialogTitleProps.props,
    ...scopeAlertDialogProps,
  },
  emits: alertDialogTitleProps.emits,
  setup(props, { attrs, slots }) {
    const { scopeOkuAlertDialog, ...alertDialogTitleProps } = toRefs(props)
    const dialogScope = useAlertDialogScope(scopeOkuAlertDialog.value)
    const forwardRef = useForwardRef()

    const _props = reactive(alertDialogTitleProps)

    const originalReturn = () => h(OkuDialogTitle, {
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
export const OkuAlertDialogTitle = alertDialogTitle as typeof alertDialogTitle &
(new () => {
  $props: AlertDialogTitleNaviteElement
})
