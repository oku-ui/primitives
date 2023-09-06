import { computed, defineComponent, h, ref, toRefs } from 'vue'
import { primitiveProps } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
import { OkuPresence } from '@oku-ui/presence'
import { CONTENT_NAME, scopeDialogProps, useDialogInject, useDialogPortalInject } from './utils'
import type { DialogContentModalElement, DialogContentModalProps } from './dialogContentModal'
import { OkuDialogContentModal } from './dialogContentModal'
import { OkuDialogContentNonModal } from './dialogContentNonModal'

export type DialogContentNaviteElement = DialogContentModalElement

interface DialogContentProps extends DialogContentModalProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true
}
export const dialogContentProps = {
  props: {
    ...primitiveProps,
    forceMount: {
      type: Boolean,
      default: true,
    },
  },
  emits: {
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
  setup(props, { attrs, slots, emit }) {
    const { ...restAttrs } = attrs as DialogContentNaviteElement

    const portalInject = useDialogPortalInject(CONTENT_NAME, props.scopeOkuDialog)

    const { forceMount = ref(portalInject.forceMount) } = toRefs(props)

    const inject = useDialogInject(CONTENT_NAME, props.scopeOkuDialog)

    const forwardRef = useForwardRef()

    const originalReturn = () => h(OkuPresence, {
      present: computed(() => forceMount?.value || inject.open?.value).value,
    },
    {
      default: () => inject.modal.value
        ? h(OkuDialogContentModal, {
          ...restAttrs,
          ref: forwardRef,
        })
        : h(OkuDialogContentNonModal, {
          ...restAttrs,
          ref: forwardRef,
        }),
    })
    return originalReturn
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuDialogContent = dialogContent as typeof dialogContent &
(new () => {
  $props: DialogContentNaviteElement
})
