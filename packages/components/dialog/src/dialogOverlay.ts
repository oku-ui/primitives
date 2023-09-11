import type { PropType } from 'vue'
import { computed, defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { primitiveProps } from '@oku-ui/primitive'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { OkuPresence } from '@oku-ui/presence'
import { OVERLAY_NAME, scopeDialogProps, useDialogInject, useDialogPortalInject } from './utils'
import type { DialogOverlayImplNaviteElement, DialogOverlayImplProps } from './dialogOverlayImpl'
import { OkuDialogOverlayImpl } from './dialogOverlayImpl'

export type DialogOverlayNaviteElement = DialogOverlayImplNaviteElement

export interface DialogOverlayProps extends DialogOverlayImplProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true
}
export const dialogOverlayProps = {
  props: {
    ...primitiveProps,
    forceMount: {
      type: Boolean as PropType<true | undefined>,
      default: undefined,
    },
  },
  emits: {
  },
}

const dialogOverlay = defineComponent({
  name: OVERLAY_NAME,
  inheritAttrs: false,
  props: {
    ...dialogOverlayProps.props,
    ...scopeDialogProps,
  },
  emits: dialogOverlayProps.emits,
  setup(props, { attrs, slots }) {
    const { forceMount: asForceMount, ...overlayProps } = toRefs(props)
    const _reactive = reactive(overlayProps)
    const reactiveOverlayProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const portalInject = useDialogPortalInject(OVERLAY_NAME, props.scopeOkuDialog)
    const forceMount = computed(() => asForceMount.value || portalInject.forceMount?.value)

    const forceMountRef = computed(() => forceMount.value || portalInject.forceMount?.value)

    const inject = useDialogInject(OVERLAY_NAME, props.scopeOkuDialog)

    const forwardRef = useForwardRef()

    return () => inject.modal.value
      ? h(OkuPresence, {
        present: computed(() => forceMountRef.value || inject.open?.value).value,
      },
      {
        default: () => h(OkuDialogOverlayImpl, {
          ...mergeProps(attrs, reactiveOverlayProps),
          ref: forwardRef,
        }, slots),
      })
      : null
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuDialogOverlay = dialogOverlay as typeof dialogOverlay &
(new () => {
  $props: DialogOverlayNaviteElement
})
