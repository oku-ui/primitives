import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { useForwardRef } from '@oku-ui/use-composable'
import { OkuDialogDescription } from '@oku-ui/dialog'
import type { AlertDialogDescriptionNaviteElement } from './props'
import { DESCRIPTION_NAME, alertDialogDescriptionProps, scopeAlertDialogProps, useAlertDialogScope } from './props'

const alertDialogDescription = defineComponent({
  name: DESCRIPTION_NAME,
  inheritAttrs: false,
  props: {
    ...alertDialogDescriptionProps.props,
    ...scopeAlertDialogProps,
  },
  emits: alertDialogDescriptionProps.emits,
  setup(props, { attrs, slots }) {
    const { scopeOkuAlertDialog, ...alertDialogDescriptionProps } = toRefs(props)

    const _props = reactive(alertDialogDescriptionProps)

    const dialogScope = useAlertDialogScope(scopeOkuAlertDialog.value)
    const forwardRef = useForwardRef()
    const originalReturn = () => h(OkuDialogDescription, {
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
export const OkuAlertDialogDescription = alertDialogDescription as typeof alertDialogDescription &
(new () => {
  $props: AlertDialogDescriptionNaviteElement
})
