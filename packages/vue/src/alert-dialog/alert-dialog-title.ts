import type { AlertDialogTitleNaviteElement } from './props'
import { OkuDialogTitle } from '@oku-ui/dialog'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { alertDialogTitleProps, scopeAlertDialogProps, TITLE_NAME, useAlertDialogScope } from './props'

const alertDialogTitle = defineComponent({
  name: TITLE_NAME,
  inheritAttrs: false,
  props: {
    ...alertDialogTitleProps.props,
    ...scopeAlertDialogProps,
  },
  setup(props, { attrs, slots }) {
    const { scopeOkuAlertDialog, ...titleProps } = toRefs(props)
    const _reactive = reactive(titleProps)
    const reactiveTitleProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const dialogScope = useAlertDialogScope(scopeOkuAlertDialog.value)
    const forwardRef = useForwardRef()

    return () => h(OkuDialogTitle, {
      ...dialogScope,
      ...mergeProps(attrs, reactiveTitleProps),
      ref: forwardRef,
    }, slots)
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuAlertDialogTitle = alertDialogTitle as typeof alertDialogTitle &
  (new () => {
    $props: AlertDialogTitleNaviteElement
  })
