import { PropType, Ref, computed, defineComponent, h, ref, toRefs } from 'vue'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { useComposedRefs, useControllable, useForwardRef, useId } from '@oku-ui/use-composable'
import { composeEventHandlers } from '@oku-ui/utils'
import { OkuPresence } from '@oku-ui/presence'
import { DIALOG_NAME, DialogProvider, getState, scopeDialogrops, useDialogInject } from './utils'
import type { DialogOverlayImplNaviteElement, DialogOverlayImplProps } from './dialogOverlayImpl'
import { OkuDialogOverlayImpl } from './dialogOverlayImpl'
import { useDialogPortalInject } from './dialogPortal'

export const OVERLAY_NAME = 'OkuDialogOverlay'

export type DialogOverlayNaviteElement = DialogOverlayImplNaviteElement

interface DialogOverlayProps extends DialogOverlayImplProps {
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
      type: Boolean,
      default: true,
    },
  },
  emits: {
  },
}

const dialogOverlay = defineComponent({
  name: DIALOG_NAME,
  inheritAttrs: false,
  props: {
    ...dialogOverlayProps.props,
    ...scopeDialogrops,
  },
  emits: dialogOverlayProps.emits,
  setup(props, { attrs, slots, emit }) {
    const { ...restAttrs } = attrs as DialogOverlayNaviteElement

    const portalInject = useDialogPortalInject(OVERLAY_NAME, props.scopeOkuDialog)

    const { forceMount = ref(portalInject.forceMount) } = toRefs(props)

    const inject = useDialogInject(OVERLAY_NAME, props.scopeOkuDialog)

    const forwardRef = useForwardRef()

    const originalReturn = () => inject.modal.value
      ? h(OkuPresence, {
        present: computed(() => forceMount.value || inject.open.value).value,
        ref: forwardRef,
      },
      {
        default: () => h(OkuDialogOverlayImpl, {
          ...restAttrs,
          ref: forwardRef,
        }),
      })
      : null

    return originalReturn
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuDialogOverlay = dialogOverlay as typeof dialogOverlay &
(new () => {
  $props: DialogOverlayNaviteElement
})
