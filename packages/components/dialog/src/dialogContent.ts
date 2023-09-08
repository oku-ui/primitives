import type { PropType } from 'vue'
import { computed, defineComponent, h, mergeProps, toRefs } from 'vue'
import { primitiveProps } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
import { OkuPresence } from '@oku-ui/presence'
import { CONTENT_NAME, scopeDialogProps, useDialogInject, useDialogPortalInject } from './utils'
import type { DialogContentModalElement, DialogContentTypeProps } from './dialogContentModal'
import { OkuDialogContentModal, dialogContentTypeProps } from './dialogContentModal'
import { OkuDialogContentNonModal } from './dialogContentNonModal'

export type DialogContentNaviteElement = DialogContentModalElement

export interface DialogContentProps extends DialogContentTypeProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true
}
export const dialogContentProps = {
  props: {
    ...primitiveProps,
    ...dialogContentTypeProps.props,
    forceMount: {
      type: Boolean as PropType<true | undefined>,
      default: undefined,
    },
  },
  emits: {
    ...dialogContentTypeProps.emits,
  },
}

const dialogContent = defineComponent({
  name: CONTENT_NAME,
  inheritAttrs: false,
  props: {
    ...dialogContentProps.props,
    ...scopeDialogProps,
  },
  emits: dialogContentProps.emits,
  setup(props, { attrs, slots }) {
    const { forceMount: _asForceMount, ...dialogProps } = props
    const portalInject = useDialogPortalInject(CONTENT_NAME, props.scopeOkuDialog)

    const { forceMount: force } = toRefs(props)
    const forceMountRef = computed(() => force.value || portalInject.forceMount?.value)

    const inject = useDialogInject(CONTENT_NAME, props.scopeOkuDialog)

    const forwardRef = useForwardRef()
    const originalReturn = () => h(OkuPresence, {
      present: computed(() => forceMountRef?.value || inject.open.value).value,
    },
    {
      default: () => inject.modal.value
        ? h(OkuDialogContentModal, {
          ...mergeProps(attrs, dialogProps),
          ref: forwardRef,
        }, slots)
        : h(OkuDialogContentNonModal, {
          ...mergeProps(attrs, dialogProps),
          ref: forwardRef,
        }, slots),
    })
    return originalReturn
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuDialogContent = dialogContent as typeof dialogContent &
(new () => {
  $props: DialogContentNaviteElement
})
