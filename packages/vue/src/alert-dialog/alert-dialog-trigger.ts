import type { AlertDialogTriggerNaviteElement } from './props'
import { OkuDialogTrigger } from '@oku-ui/dialog'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { alertDialogTriggerProps, scopeAlertDialogProps, TRIGGER_NAME, useAlertDialogScope } from './props'

const alertDialogTrigger = defineComponent({
  name: TRIGGER_NAME,
  inheritAttrs: false,
  props: {
    ...alertDialogTriggerProps.props,
    ...scopeAlertDialogProps,
  },
  setup(props, { attrs, slots }) {
    const { scopeOkuAlertDialog, ...triggerProps } = toRefs(props)
    const _reactive = reactive(triggerProps)
    const reactiveTriggerProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const dialogScope = useAlertDialogScope(scopeOkuAlertDialog.value)

    const forwardRef = useForwardRef()

    return () => h(OkuDialogTrigger, {
      ...dialogScope,
      ...mergeProps(attrs, reactiveTriggerProps),
      ref: forwardRef,
    }, slots)
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuAlertDialogTrigger = alertDialogTrigger as typeof alertDialogTrigger &
  (new () => {
    $props: AlertDialogTriggerNaviteElement
  })
