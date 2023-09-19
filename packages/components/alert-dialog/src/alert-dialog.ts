import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { primitiveProps } from '@oku-ui/primitive'
import { OkuDialog } from '@oku-ui/dialog'
import { reactiveOmit } from '@oku-ui/use-composable'
import { ROOT_NAME, alertDialogProps, scopeAlertDialogProps, useAlertDialogScope } from './props'
import type { AlertDialogNaviteElement } from './props'

const alertDialog = defineComponent({
  name: ROOT_NAME,
  components: { OkuDialog },
  inheritAttrs: false,
  props: {
    ...primitiveProps,
    ...alertDialogProps.props,
    ...scopeAlertDialogProps,
  },
  emits: alertDialogProps.emits,
  setup(props, { attrs, slots }) {
    const { scopeOkuAlertDialog, ...alertDialogProps } = toRefs(props)
    const _reactive = reactive(alertDialogProps)
    const reactiveAlertDialogProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const useDialogScope = useAlertDialogScope(scopeOkuAlertDialog?.value)
    return () => h(OkuDialog, {
      ...useDialogScope,
      ...mergeProps(attrs, reactiveAlertDialogProps),
      modal: true,
    },
    {
      default: () => slots.default?.(),
    })
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuAlertDialog = alertDialog as typeof alertDialog &
(new () => {
  $props: AlertDialogNaviteElement
})
