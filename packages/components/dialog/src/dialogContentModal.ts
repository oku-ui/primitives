import { defineComponent, h, ref, watchEffect } from 'vue'
import { primitiveProps } from '@oku-ui/primitive'
import { useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import { composeEventHandlers } from '@oku-ui/utils'
import { hideOthers } from 'aria-hidden'
import { CONTENT_NAME, scopeDialogProps, useDialogInject } from './utils'
import type { DialogContentImplEmits, DialogContentImplNaviteElement, DialogContentImplProps } from './dialogContentImpl'
import { OkuDialogContentImpl } from './dialogContentImpl'

export const CONTENT_MODAL_NAME = 'OkuDialogContentModal'

export type DialogContentModalElement = DialogContentImplNaviteElement

export interface DialogContentModalProps
  extends Omit<DialogContentImplProps, 'trapFocus' | 'disableOutsidePointerEvents'> {}

export interface DialogContentModalEmits extends DialogContentImplEmits { }

export const dialogOverlayProps = {
  props: {
    ...primitiveProps,
  },
  emits: {
  },
}

const dialogContentModal = defineComponent({
  name: CONTENT_MODAL_NAME,
  inheritAttrs: false,
  props: {
    ...dialogOverlayProps.props,
    ...scopeDialogProps,
  },
  emits: dialogOverlayProps.emits,
  setup(props, { attrs, slots, emit }) {
    const { ...restAttrs } = attrs as DialogContentModalElement

    const inject = useDialogInject(CONTENT_NAME, props.scopeOkuDialog)

    const forwardRef = useForwardRef()
    const contentRef = ref<HTMLDivElement | null>(null)
    const composedRefs = useComposedRefs(forwardRef, inject.contentRef, contentRef)

    watchEffect(() => {
      const content = contentRef.value

      if (content)
        return hideOthers(content)
    })

    const originalReturn = () => h(OkuDialogContentImpl, {
      ...restAttrs,
      ref: composedRefs,
      trapFocus: inject.open?.value,
      disableOutsidePointerEvents: true,

      onCloseAutoFocus:
      composeEventHandlers<DialogContentModalEmits['closeAutoFocus'][0]>((el) => {
        emit('closeAutoFocus', el)
      }, (event) => {
        event.preventDefault()
        inject.triggerRef.value?.focus()
      }),

      onPointerdownOutside: composeEventHandlers<DialogContentModalEmits['pointerdownOutside'][0]>((el) => {
        emit('pointerdownOutside', el)
      }, (event) => {
        const originalEvent = event.detail.originalEvent
        const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true
        const isRightClick = originalEvent.button === 2 || ctrlLeftClick

        // If the event is a right-click, we shouldn't close because
        // it is effectively as if we right-clicked the `Overlay`.
        if (isRightClick)
          event.preventDefault()
      }),

      onFocusOutside: composeEventHandlers<DialogContentModalEmits['focusoutSide'][0]>((el) => {
        emit('focusOutside', el)
      }, (event) => {
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
export const OkuDialogContentModal = dialogContentModal as typeof dialogContentModal &
(new () => {
  $props: DialogContentModalElement
})
