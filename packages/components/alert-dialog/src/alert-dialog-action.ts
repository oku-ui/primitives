import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { primitiveProps } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
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
  emits: alertDialogActionProps.emits,
  setup(props, { attrs, slots }) {
    const { scopeOkuAlertDialog, ...alertDialogActionProps } = toRefs(props)
    const dialogScope = useAlertDialogScope(scopeOkuAlertDialog.value)
    const forwardRef = useForwardRef()

    const _props = reactive(alertDialogActionProps)

    const originalReturn = () => h(OkuDialogClose, {
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
export const OkuAlertDialogAction = alertDialogAction as typeof alertDialogAction &
(new () => {
  $props: AlertDialogActionNaviteElement
})
