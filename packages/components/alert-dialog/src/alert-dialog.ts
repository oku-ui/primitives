import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { primitiveProps } from '@oku-ui/primitive'
import { OkuDialog } from '@oku-ui/dialog'
import { ROOT_NAME, alertDialogProps, scopeAlertDialogProps } from './props'
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
    const { scopeOkuAlertDialog: _scope, ...alertDialogProps } = toRefs(props)

    const _props = reactive(alertDialogProps)

    const originalReturn = () => h(OkuDialog, {
      ...mergeProps(attrs, _props),
      modal: true,
    },
    {
      default: () => slots.default?.(),
    })
    return originalReturn
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuAlertDialog = alertDialog as typeof alertDialog &
(new () => {
  $props: AlertDialogNaviteElement
})
