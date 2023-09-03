import { PropType, Ref, computed, defineComponent, h, ref, toRefs } from 'vue'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { useComposedRefs, useControllable, useForwardRef, useId } from '@oku-ui/use-composable'
import { composeEventHandlers } from '@oku-ui/utils'
import { DIALOG_NAME, DialogProvider, getState, scopeDialogrops, useDialogInject } from './utils'
import type { DialogContentTypeElement, DialogContentTypeEmits } from './dialogContentModal'
import { CONTENT_NAME } from './dialogContent'
import { OkuDialogContentImpl } from './dialogContentImpl'

export const CONTENTNON_NAME = 'OkuDialogContentNonModal'

export type DialogContentNonModalNaviteElement = DialogContentTypeElement

export const dialogOverlayProps = {
  props: {
    ...primitiveProps,
  },
  emits: {
  },
}

const dialogContentNonModal = defineComponent({
  name: CONTENTNON_NAME,
  inheritAttrs: false,
  props: {
    ...dialogOverlayProps.props,
    ...scopeDialogrops,
  },
  emits: dialogOverlayProps.emits,
  setup(props, { attrs, slots, emit }) {
    const { ...restAttrs } = attrs as DialogContentNonModalNaviteElement

    const inject = useDialogInject(CONTENT_NAME, props.scopeOkuDialog)

    const hasInteractedOutsideRef = ref(false)
    const hasPointerDownOutsideRef = ref(false)

    const forwardRef = useForwardRef()

    const originalReturn = () => h(OkuDialogContentImpl, {
      ...restAttrs,
      ref: forwardRef,
      trapFocus: false,
      disableOutsidePointerEvents: false,
      onCloseAutoFocus: composeEventHandlers<DialogContentTypeEmits['closeAutoFocus'][0]>((el) => {
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
      onInteractOutside: composeEventHandlers<DialogContentTypeEmits['interactOutside'][0]>((el) => {
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
    },
    {
      default: () => slots.default?.(),
    })
    return originalReturn
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuDialogContentNonModal = dialogContentNonModal as typeof dialogContentNonModal &
(new () => {
  $props: DialogContentNonModalNaviteElement
})
