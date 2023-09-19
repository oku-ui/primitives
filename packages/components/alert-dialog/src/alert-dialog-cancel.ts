import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { primitiveProps } from '@oku-ui/primitive'
import { reactiveOmit, useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import { OkuDialogClose } from '@oku-ui/dialog'
import type { AlertDialogCancelNaviteElement } from './props'
import { CANCEL_NAME, alertDialogCancelProps, scopeAlertDialogProps, useAlertDialogContentInject, useAlertDialogScope } from './props'

const alertDialogCancel = defineComponent({
  name: CANCEL_NAME,
  inheritAttrs: false,
  props: {
    ...primitiveProps,
    ...alertDialogCancelProps.props,
    ...scopeAlertDialogProps,
  },
  setup(props, { attrs, slots }) {
    const { scopeOkuAlertDialog, ...cancelProps } = toRefs(props)
    const _reactive = reactive(cancelProps)
    const reactiveCancelProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const dialogScope = useAlertDialogScope(scopeOkuAlertDialog.value)

    const { cancelRef } = useAlertDialogContentInject(CANCEL_NAME, scopeOkuAlertDialog.value)

    const forwardRef = useForwardRef()
    const composedRefs = useComposedRefs(forwardRef, cancelRef)

    return () => h(OkuDialogClose, {
      ...dialogScope,
      ...mergeProps(attrs, reactiveCancelProps),
      ref: composedRefs,
    }, slots)
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuAlertDialogCancel = alertDialogCancel as typeof alertDialogCancel &
(new () => {
  $props: AlertDialogCancelNaviteElement
})
