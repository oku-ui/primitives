import { defineComponent, h, mergeProps, ref } from 'vue'
import { primitiveProps } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
import { composeEventHandlers } from '@oku-ui/utils'
import { CONTENT_NAME, scopeDialogProps, useDialogInject } from './utils'
import { type DialogContentModalElement, type DialogContentModalEmits, type DialogContentTypeProps, dialogContentTypeProps } from './dialogContentModal'
import { OkuDialogContentImpl } from './dialogContentImpl'

export const CONTENTNON_NAME = 'OkuDialogContentNonModal'

export type DialogContentNonModalNaviteElement = DialogContentModalElement

export interface DialogContentNonModalProps extends DialogContentTypeProps {}

export const dialogContentNonModalProps = {
  props: {
    ...dialogContentTypeProps.props,
    ...primitiveProps,
  },
  emits: {
    ...dialogContentTypeProps.emits,
  },
}

const dialogContentNonModal = defineComponent({
  name: CONTENTNON_NAME,
  inheritAttrs: false,
  props: {
    ...dialogContentNonModalProps.props,
    ...scopeDialogProps,
  },
  emits: dialogContentNonModalProps.emits,
  setup(props, { attrs, slots, emit }) {
    const inject = useDialogInject(CONTENT_NAME, props.scopeOkuDialog)

    const hasInteractedOutsideRef = ref(false)
    const hasPointerDownOutsideRef = ref(false)

    const forwardRef = useForwardRef()

    const originalReturn = () => h(OkuDialogContentImpl, {
      ...mergeProps(attrs, props),
      ref: forwardRef,
      trapFocus: false,
      disableOutsidePointerEvents: false,
      onCloseAutoFocus: composeEventHandlers<DialogContentModalEmits['closeAutoFocus'][0]>((el) => {
        emit('closeAutoFocus', el)
      }, (event) => {
        if (!event.defaultPrevented) {
          if (!hasInteractedOutsideRef.value)
            inject.triggerRef.value?.focus()
          // Always prevent auto focus because we either focus manually or want user agent focus
          event.preventDefault()
        }

        hasInteractedOutsideRef.value = false
        hasPointerDownOutsideRef.value = false
      }),
      onInteractOutside: composeEventHandlers<DialogContentModalEmits['interactOutside'][0]>((el) => {
        emit('interactOutside', el)
      }, (event) => {
        if (!event.defaultPrevented) {
          hasInteractedOutsideRef.value = true
          if (event.detail.originalEvent.type === 'pointerdown')
            hasPointerDownOutsideRef.value = true
        }

        // Prevent dismissing when clicking the trigger.
        // As the trigger is already setup to close, without doing so would
        // cause it to close and immediately open.
        const target = event.target as HTMLElement
        const targetIsTrigger = inject.triggerRef.value?.contains(target)
        if (targetIsTrigger)
          event.preventDefault()

        // On Safari if the trigger is inside a container with tabIndex={0}, when clicked
        // we will get the pointer down outside event on the trigger, but then a subsequent
        // focus outside event on the container, we ignore any focus outside event when we've
        // already had a pointer down outside event.
        if (event.detail.originalEvent.type === 'focusin' && hasPointerDownOutsideRef.value)
          event.preventDefault()
      }),
    }, slots)
    return originalReturn
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuDialogContentNonModal = dialogContentNonModal as typeof dialogContentNonModal &
(new () => {
  $props: DialogContentNonModalNaviteElement
})
