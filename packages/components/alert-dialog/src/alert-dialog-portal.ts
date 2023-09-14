import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import type { OkuElement } from '@oku-ui/primitive'
import { primitiveProps } from '@oku-ui/primitive'
import type { DialogTriggerProps } from '@oku-ui/dialog'
import { OkuDialogPortal, dialogTriggerProps } from '@oku-ui/dialog'
import { scopeAlertDialogProps, useAlertDialogScope } from './utils'

const PORTAL_NAME = 'OkuAlertDialogPortal'

export type AlertDialogPortalNaviteElement = OkuElement<'div'>
export type AlertDialogPortalElement = typeof OkuDialogPortal

export interface AlertDialogPortalProps extends DialogTriggerProps {}

export type AlertDialogPortalEmits = {
  click: [event: MouseEvent]
}

export const alertDialogPortalProps = {
  props: {
    ...dialogTriggerProps.props,
  },
  emits: {
    ...dialogTriggerProps.emits,
  },
}
const alertDialogPortal = defineComponent({
  name: PORTAL_NAME,
  inheritAttrs: false,
  props: {
    ...primitiveProps,
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
