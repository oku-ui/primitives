import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
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
    const { scopeOkuAlertDialog, ...descriptionProps } = toRefs(props)
    const _reactive = reactive(descriptionProps)
    const reactiveDescriptionProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const dialogScope = useAlertDialogScope(scopeOkuAlertDialog.value)
    const forwardRef = useForwardRef()

    return () => h(OkuDialogDescription, {
      ...dialogScope,
      ...mergeProps(attrs, reactiveDescriptionProps),
      ref: forwardRef,
    }, slots)
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuAlertDialogDescription = alertDialogDescription as typeof alertDialogDescription &
(new () => {
  $props: AlertDialogDescriptionNaviteElement
})
