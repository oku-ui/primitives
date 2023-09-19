import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { useForwardRef } from '@oku-ui/use-composable'
import { OkuDialogOverlay } from '@oku-ui/dialog'
import type { AlertDialogOverlayNaviteElement } from './props'
import { OVERLAY_NAME, alertDialogOverlayProps, scopeAlertDialogProps, useAlertDialogScope } from './props'

const alertDialogOverlay = defineComponent({
  name: OVERLAY_NAME,
  inheritAttrs: false,
  props: {
    ...alertDialogOverlayProps.props,
    ...scopeAlertDialogProps,
  },
  emits: alertDialogOverlayProps.emits,
  setup(props, { attrs, slots }) {
    const { scopeOkuAlertDialog, ...alertDialogOverlayProps } = toRefs(props)
    const dialogScope = useAlertDialogScope(scopeOkuAlertDialog.value)
    const forwardRef = useForwardRef()

    const _props = reactive(alertDialogOverlayProps)

    const originalReturn = () => h(OkuDialogOverlay, {
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
export const OkuAlertDialogOverlay = alertDialogOverlay as typeof alertDialogOverlay &
(new () => {
  $props: AlertDialogOverlayNaviteElement
})
