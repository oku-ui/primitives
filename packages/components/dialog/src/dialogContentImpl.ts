import type { PropType } from 'vue'
import { Fragment, defineComponent, h, ref, toRefs } from 'vue'
import type { OkuElement } from '@oku-ui/primitive'
import { useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import { type DismissableLayerEmits, OkuDismissableLayer, type DismissableLayerProps as OkuDismissableLayerProps, dismissableLayerProps } from '@oku-ui/dismissable-layer'
import { type FocusScopeEmits, type FocusScopeProps, OkuFocusScope } from '@oku-ui/focus-scope'
import { useFocusGuards } from '@oku-ui/focus-guards'
import { getState, scopeDialogProps, useDialogInject } from './utils'
import { OkuDialogTitleWarning } from './dialogTitleWarning'
import { OkuDialogDescriptionWarning } from './dialogDescriptionWarning'

export const CONTENT_NAME = 'OkuDialogContentImpl'

export type DialogContentImplNaviteElement = OkuElement<'div'>

export interface DialogContentImplProps extends OkuDismissableLayerProps {
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

  // pointerdownOutside: [event: DismissableLayerEmits['pointerdownOutside'][0]]

} & Omit<DismissableLayerEmits, 'dismiss'>

export const dialogContentImplProps = {
  props: {
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
  name: CONTENT_NAME,
  components: {
    OkuFocusScope,
    OkuDismissableLayer,
  },
  inheritAttrs: false,
  props: {
    ...dialogContentImplProps.props,
    ...scopeDialogProps,
  },
  emits: dialogContentImplProps.emits,
  setup(props, { emit, attrs, slots }) {
    const { scopeOkuDialog, trapFocus: _trapFocus, onOpenAutoFocus: _onOpen, onCloseAutoFocus: _onClose, ...contentProps } = props

    const { trapFocus } = toRefs(props)

    const inject = useDialogInject(CONTENT_NAME, scopeOkuDialog)

    const forwardRef = useForwardRef()
    const contentRef = ref<HTMLDivElement | null>(null)
    const composedRefs = useComposedRefs(forwardRef, contentRef)

    useFocusGuards()

    return () => h(Fragment,
      [h(OkuFocusScope, {
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
          'aria-describedby': inject.descriptionId?.value,
          'aria-labelledby': inject.titleId?.value,
          'data-state': getState(inject.open?.value || false),
          ...attrs,
          ...contentProps,
          'ref': composedRefs,
          'onDismiss': () => {
            inject.onOpenChange(false)
          },
        }, {
          default: () => slots.default?.(),
        }),
      }),
      process.env.NODE_ENV !== 'production'
        && (h(Fragment,
          [h(OkuDialogTitleWarning, {
            titleId: inject.titleId.value,
          }), h(OkuDialogDescriptionWarning, {
            contentRef: inject.contentRef.value,
            descriptionId: inject.descriptionId.value,
          }),
          ])),
      ],
    )
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuDialogContentImpl = dialogContentImpl as typeof dialogContentImpl &
(new () => {
  $props: DialogContentImplNaviteElement
})
