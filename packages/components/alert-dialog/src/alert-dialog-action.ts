import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { primitiveProps } from '@oku-ui/primitive'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { OkuDialogClose } from '@oku-ui/dialog'
import type { AlertDialogActionNaviteElement } from './props'
import { ACTION_NAME, alertDialogActionProps, scopeAlertDialogProps, useAlertDialogScope } from './props'

const alertDialogAction = defineComponent({
  name: ACTION_NAME,
  inheritAttrs: false,
  props: {
    ...primitiveProps,
    ...alertDialogActionProps.props,
    ...scopeAlertDialogProps,
  },
  setup(props, { attrs, slots }) {
    const { scopeOkuAlertDialog, ...actionProps } = toRefs(props)
    const _reactive = reactive(actionProps)
    const reactiveActionProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const dialogScope = useAlertDialogScope(scopeOkuAlertDialog.value)
    const forwardRef = useForwardRef()

    return () => h(OkuDialogClose, {
      ...dialogScope,
      ...mergeProps(attrs, reactiveActionProps),
      ref: forwardRef,
    }, slots)
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuAlertDialogAction = alertDialogAction as typeof alertDialogAction &
(new () => {
  $props: AlertDialogActionNaviteElement
})
