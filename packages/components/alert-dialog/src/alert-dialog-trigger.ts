import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { useForwardRef } from '@oku-ui/use-composable'
import { OkuDialogTrigger } from '@oku-ui/dialog'
import type { AlertDialogTriggerNaviteElement } from './props'
import { TRIGGER_NAME, alertDialogTriggerProps, scopeAlertDialogProps, useAlertDialogScope } from './props'

const alertDialogTrigger = defineComponent({
  name: TRIGGER_NAME,
  inheritAttrs: false,
  props: {
    ...alertDialogTriggerProps.props,
    ...scopeAlertDialogProps,
  },
  emits: alertDialogTriggerProps.emits,
  setup(props, { attrs, slots }) {
    const { scopeOkuAlertDialog, ...alertDialogTriggerProps } = toRefs(props)
    const dialogScope = useAlertDialogScope(scopeOkuAlertDialog.value)

    const forwardRef = useForwardRef()

    const _props = reactive(alertDialogTriggerProps)

    const originalReturn = () => h(OkuDialogTrigger, {
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
export const OkuAlertDialogTrigger = alertDialogTrigger as typeof alertDialogTrigger &
(new () => {
  $props: AlertDialogTriggerNaviteElement
})
