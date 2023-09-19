import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { OkuDialogPortal } from '@oku-ui/dialog'
import type { AlertDialogPortalNaviteElement } from './props'
import { PORTAL_NAME, alertDialogPortalProps, scopeAlertDialogProps, useAlertDialogScope } from './props'

const alertDialogPortal = defineComponent({
  name: PORTAL_NAME,
  inheritAttrs: false,
  props: {
    ...alertDialogPortalProps.props,
    ...scopeAlertDialogProps,
  },
  emits: alertDialogPortalProps.emits,
  setup(props, { attrs, slots }) {
    const { scopeOkuAlertDialog, ...alertDialogPortalProps } = toRefs(props)
    const dialogScope = useAlertDialogScope(scopeOkuAlertDialog.value)

    const _props = reactive(alertDialogPortalProps)

    const originalReturn = () => h(OkuDialogPortal, {
      ...dialogScope,
      ...mergeProps(attrs, _props),
    },
    {
      default: () => slots.default?.(),
    })
    return originalReturn
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuAlertDialogPortal = alertDialogPortal as typeof alertDialogPortal &
(new () => {
  $props: AlertDialogPortalNaviteElement
})
