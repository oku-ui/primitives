import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
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
  setup(props, { attrs, slots }) {
    const { scopeOkuAlertDialog, ...overlayProps } = toRefs(props)
    const _reactive = reactive(overlayProps)
    const reactiveOverlayProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const dialogScope = useAlertDialogScope(scopeOkuAlertDialog.value)
    const forwardRef = useForwardRef()

    return () => h(OkuDialogOverlay, {
      ...dialogScope,
      ...mergeProps(attrs, reactiveOverlayProps),
      ref: forwardRef,
    }, slots)
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuAlertDialogOverlay = alertDialogOverlay as typeof alertDialogOverlay &
(new () => {
  $props: AlertDialogOverlayNaviteElement
})
