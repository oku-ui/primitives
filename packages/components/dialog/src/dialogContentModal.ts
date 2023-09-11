import { defineComponent, h, mergeProps, onUnmounted, ref } from 'vue'
import { primitiveProps, propsOmit } from '@oku-ui/primitive'
import { useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import { composeEventHandlers } from '@oku-ui/utils'
import { hideOthers } from 'aria-hidden'
import { CONTENT_NAME, scopeDialogProps, useDialogInject } from './utils'
import type { DialogContentImplEmits, DialogContentImplNaviteElement, DialogContentImplProps } from './dialogContentImpl'
import { OkuDialogContentImpl, dialogContentImplProps } from './dialogContentImpl'

export const CONTENT_MODAL_NAME = 'OkuDialogContentModal'

export type DialogContentModalElement = DialogContentImplNaviteElement

export interface DialogContentTypeProps
  extends Omit<DialogContentImplProps, 'trapFocus' | 'disableOutsidePointerEvents'> {}

export interface DialogContentModalEmits extends DialogContentImplEmits { }

export const dialogContentTypeProps = {
  props: {
    ...propsOmit(dialogContentImplProps.props, ['trapFocus', 'disableOutsidePointerEvents']),
  },
  emits: {
    ...dialogContentImplProps.emits,
  },
}

const dialogContentModal = defineComponent({
  name: CONTENT_MODAL_NAME,
  inheritAttrs: false,
  props: {
    ...dialogContentTypeProps.props,
    ...primitiveProps,
    ...scopeDialogProps,
  },
  emits: dialogContentTypeProps.emits,
  setup(props, { attrs, slots, emit }) {
    const inject = useDialogInject(CONTENT_NAME, props.scopeOkuDialog)

    const forwardRef = useForwardRef()
    const contentRef = ref<HTMLDivElement | null>(null)
    const composedRefs = useComposedRefs(forwardRef, inject.contentRef, contentRef)

    const isRightClickOutsideRef = ref(false)

    onUnmounted(() => {
      const content = contentRef.value
      if (content)
        return hideOthers(content)
    })

    return () => h(OkuDialogContentImpl, {
      ...mergeProps(attrs, props),
      ref: composedRefs,
      // we make sure focus isn't trapped once `DialogContent` has been closed
      // (closed !== unmounted when animating out)
      trapFocus: inject.open.value,
      disableOutsidePointerEvents: true,
      onOpenAutoFocus: composeEventHandlers<DialogContentModalEmits['openAutoFocus'][0]>((el) => {
        emit('openAutoFocus', el)
      }, (event) => {
        event.preventDefault()
        if (!isRightClickOutsideRef.value)
          inject.triggerRef.value?.focus()
      }),
      onCloseAutoFocus: composeEventHandlers<DialogContentModalEmits['closeAutoFocus'][0]>((el) => {
        emit('closeAutoFocus', el)
      }, (event) => {
        event.preventDefault()
        if (!isRightClickOutsideRef.value)
          inject.triggerRef.value?.focus()
      }),
      onPointerdownOutside: composeEventHandlers<DialogContentModalEmits['pointerdownOutside'][0]>((el) => {
        emit('pointerdownOutside', el)
      }, (event) => {
        const originalEvent = event.detail.originalEvent
        const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true
        const isRightClick = originalEvent.button === 2 || ctrlLeftClick

        isRightClickOutsideRef.value = isRightClick
      }, { checkForDefaultPrevented: false }),
      onInteractOutside: (event) => {
        emit('interactOutside', event)
      },
      onEscapeKeyDown: (event) => {
        emit('escapeKeyDown', event)
      },
      onFocusoutSide: (event) => {
        emit('focusoutSide', event)
      },
      onDismiss: () => {
        inject.onOpenChange(false)
      },
    }, {
      default: () => slots.default?.(),
    })
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuDialogContentModal = dialogContentModal as typeof dialogContentModal &
(new () => {
  $props: DialogContentModalElement
})
