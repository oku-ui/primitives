import type { PropType } from 'vue'
import { Ref, computed, defineComponent, h, ref, toRefs } from 'vue'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { useComposedRefs, useControllable, useForwardRef, useId } from '@oku-ui/use-composable'
import { composeEventHandlers } from '@oku-ui/utils'
import { OkuDismissableLayer, dismissableLayerProps } from '@oku-ui/dismissable-layer'
import type { type DismissableLayerEmits, DismissableLayerProps, type DismissableLayerProps as OkuDismissableLayerProps } from '@oku-ui/dismissable-layer'
import { type FocusScopeEmits, OkuFocusScope } from '@oku-ui/focus-scope'
import { useFocusGuards } from '@oku-ui/focus-guards'
import { DialogOverlayImplNaviteElement, DialogOverlayImplProps } from './dialogOverlayImpl'
import { DIALOG_NAME, DialogProvider, getState, scopeDialogrops, useDialogInject } from './utils'
import { OkuDialogTitleWarning } from './dialogTitleWarning'
import { OkuDialogDescriptionWarning } from './dialogDescriptionWarning'

export const CONTENT_NAME = 'OkuDialogContentImpl'

export type DialogContentImplNaviteElement = OkuElement<HTMLDivElement>

export interface FocusScopeProps extends PrimitiveProps {
  /**
   * When `true`, tabbing from last item will focus first tabbable
   * and shift+tab from first item will focus last tababble.
   * @defaultValue false
   */
  loop?: boolean

  /**
   * When `true`, focus cannot escape the focus scope via keyboard,
   * pointer, or a programmatic focus.
   * @defaultValue false
   */
  trapped?: boolean
}
export interface DialogContentImplProps extends Omit<DismissableLayerProps, 'onDismiss'> {
  /**
   * When `true`, focus cannot escape the `Content` via keyboard,
   * pointer, or a programmatic focus.
   * @defaultValue false
   */
  trapFocus?: FocusScopeProps['trapped']
}
export type DialogContentImplEmits = {
  /**
   * Event handler called when auto-focusing on open.
   * Can be prevented.
   */
  openAutoFocus: [event: FocusScopeEmits['mountAutoFocus'][0]]
  /**
   * Event handler called when auto-focusing on close.
   * Can be prevented.
   */
  closeAutoFocus: [event: FocusScopeEmits['unmountAutoFocus'][0]]

  pointerdownOutside: [event: DismissableLayerEmits['pointerdownOutside'][0]]

} & Omit<DismissableLayerEmits, 'dismiss'>

export const dialogOverlayProps = {
  props: {
    ...primitiveProps,
    ...dismissableLayerProps.props,
    trapFocus: {
      type: Boolean as PropType<FocusScopeProps['trapped']>,
      default: false,
    },
  },
  emits: {
    ...dismissableLayerProps.emits,
    // eslint-disable-next-line unused-imports/no-unused-vars
    openAutoFocus: (event: FocusScopeEmits['mountAutoFocus'][0]) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    closeAutoFocus: (event: FocusScopeEmits['unmountAutoFocus'][0]) => true,
  },
}

const dialogContentImpl = defineComponent({
  name: DIALOG_NAME,
  inheritAttrs: false,
  props: {
    ...dialogOverlayProps.props,
    ...scopeDialogrops,
  },
  emits: dialogOverlayProps.emits,
  setup(props, { attrs, slots, emit }) {
    const { ...restAttrs } = attrs as DialogContentImplNaviteElement

    const { trapFocus, asChild } = toRefs(props)

    const inject = useDialogInject(CONTENT_NAME, props.scopeOkuDialog)

    const forwardRef = useForwardRef()
    const contentRef = ref<HTMLDivElement | null>(null)
    const composedRefs = useComposedRefs(forwardRef, contentRef)

    useFocusGuards()

    return () => {
      return [h(OkuFocusScope, {
        asChild: true,
        loop: true,
        trapped: trapFocus.value,
        onMountAutoFocus: (event) => {
          emit('openAutoFocus', event)
        },
        onUnmountAutoFocus: (event) => {
          emit('closeAutoFocus', event)
        },
      }, {
        default: () => h(OkuDismissableLayer, {
          'role': 'dialog',
          'id': inject.contentId.value,
          'aria-describedby': inject.descriptionId.value,
          'aria-labelledby': inject.titleId.value,
          'data-state': getState(inject.open.value!),
          ...restAttrs,
          'ref': composedRefs,
          'onDismiss': () => {
            inject.onOpenChange(false)
          },
        }),
      }),
      process.env.NODE_ENV !== 'production' && h(OkuDialogTitleWarning, {
        titleId: inject.titleId.value,
      })
    && h(OkuDialogDescriptionWarning, {
      contentRef: inject.contentRef.value,
      descriptionId: inject.descriptionId.value,
    }),
      ]
    }
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuDialogContentImpl = dialogContentImpl as typeof dialogContentImpl &
(new () => {
  $props: DialogContentImplNaviteElement
})
