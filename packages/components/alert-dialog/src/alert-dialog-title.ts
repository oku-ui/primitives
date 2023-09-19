import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { useForwardRef } from '@oku-ui/use-composable'
import { OkuDialogTitle } from '@oku-ui/dialog'
import type { AlertDialogTitleNaviteElement } from './props'
import { TITLE_NAME, alertDialogTitleProps, scopeAlertDialogProps, useAlertDialogScope } from './props'

const alertDialogTitle = defineComponent({
  name: TITLE_NAME,
  inheritAttrs: false,
  props: {
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
