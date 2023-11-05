import type { PropType } from 'vue'
import { computed, defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { primitiveProps } from '@oku-ui/primitive'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { OkuPresence } from '@oku-ui/presence'
import { composeEventHandlers } from '@oku-ui/utils'
import { CONTENT_NAME, scopeDialogProps, useDialogInject, useDialogPortalInject } from './utils'
import type { DialogContentModalElement, DialogContentModalEmits, DialogContentTypeProps } from './dialogContentModal'
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
  setup(props, { attrs, slots, emit }) {
    const { forceMount: asForceMount, ...dialogProps } = toRefs(props)
    const _reactive = reactive(dialogProps)
    const reactiveDialogProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const portalInject = useDialogPortalInject(CONTENT_NAME, props.scopeOkuDialog)

    const forceMount = computed(() => asForceMount.value || portalInject.forceMount?.value)

    const inject = useDialogInject(CONTENT_NAME, props.scopeOkuDialog)

    const forwardRef = useForwardRef()

    const originalReturn = () => h(OkuPresence, {
      present: computed(() => forceMount.value || inject.open.value).value,
    }, {
      default: () => inject.modal.value
        ? h(OkuDialogContentModal, {
          ...mergeProps(attrs, reactiveDialogProps),
          ref: forwardRef,
          onOpenAutoFocus: composeEventHandlers<DialogContentModalEmits['openAutoFocus'][0]>((el) => {
            emit('openAutoFocus', el)
          }, (event) => {
            event.preventDefault()
          }),
          onCloseAutoFocus: composeEventHandlers<DialogContentModalEmits['closeAutoFocus'][0]>((el) => {
            emit('closeAutoFocus', el)
          }, (event) => {
            event.preventDefault()
          }),
          onInteractOutside: (event) => {
            emit('interactOutside', event)
          },
          onEscapeKeydown: (event) => {
            emit('escapeKeydown', event)
          },
          onPointerdownOutside: (event) => {
            emit('pointerdownOutside', event)
          },
          onFocusOutside: (event) => {
            emit('focusOutside', event)
          },
          onDismiss: () => {
            inject.onOpenChange(false)
          },
        }, slots)
        : h(OkuDialogContentNonModal, {
          ...mergeProps(attrs, reactiveDialogProps),
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
