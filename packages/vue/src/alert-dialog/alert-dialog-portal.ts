import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { OkuDialogPortal } from '@oku-ui/dialog'
import { reactiveOmit } from '@oku-ui/use-composable'
import type { AlertDialogPortalNaviteElement } from './props'
import { PORTAL_NAME, alertDialogPortalProps, scopeAlertDialogProps, useAlertDialogScope } from './props'

const alertDialogPortal = defineComponent({
  name: PORTAL_NAME,
  inheritAttrs: false,
  props: {
    ...alertDialogPortalProps.props,
    ...scopeAlertDialogProps,
  },
  setup(props, { attrs, slots }) {
    const { scopeOkuAlertDialog, ...portalProps } = toRefs(props)
    const _reactive = reactive(portalProps)
    const reactivePortalProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const dialogScope = useAlertDialogScope(scopeOkuAlertDialog.value)

    return () => h(OkuDialogPortal, {
      ...dialogScope,
      ...mergeProps(attrs, reactivePortalProps),
    }, slots)
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuAlertDialogPortal = alertDialogPortal as typeof alertDialogPortal &
  (new () => {
    $props: AlertDialogPortalNaviteElement
  })
