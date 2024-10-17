import type { AlertDialogNaviteElement } from './props'
import { OkuDialog } from '@oku-ui/dialog'
import { primitiveProps } from '@oku-ui/primitive'
import { reactiveOmit } from '@oku-ui/use-composable'
import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { alertDialogProps, ROOT_NAME, scopeAlertDialogProps, useAlertDialogScope } from './props'

const alertDialog = defineComponent({
  name: ROOT_NAME,
  components: { OkuDialog },
  inheritAttrs: false,
  props: {
    ...primitiveProps,
    ...alertDialogProps.props,
    ...scopeAlertDialogProps,
  },
  setup(props, { attrs, slots }) {
    const { scopeOkuAlertDialog, ...alertDialogProps } = toRefs(props)
    const _reactive = reactive(alertDialogProps)
    const reactiveAlertDialogProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const useDialogScope = useAlertDialogScope(scopeOkuAlertDialog?.value)
    return () => h(OkuDialog, {
      ...useDialogScope,
      ...mergeProps(attrs, reactiveAlertDialogProps),
      modal: true,
    }, slots)
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuAlertDialog = alertDialog as typeof alertDialog &
  (new () => {
    $props: AlertDialogNaviteElement
  })
