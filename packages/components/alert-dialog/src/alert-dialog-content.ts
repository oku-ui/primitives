import { computed, defineComponent, h, mergeProps, reactive, ref, toRefs } from 'vue'
import type { OkuElement } from '@oku-ui/primitive'
import { primitiveProps, propsOmit } from '@oku-ui/primitive'
import { useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import type { DialogContentModalEmits, DialogContentProps } from '@oku-ui/dialog'
import { OkuDialogContent, OkuDialogDescriptionWarning, WarningProvider, dialogContentProps } from '@oku-ui/dialog'
import { composeEventHandlers } from '@oku-ui/utils'
import { OkuSlottable } from '@oku-ui/slot'
import { AlertDialogContentProvider, CONTENT_NAME, TITLE_NAME, scopeAlertDialogProps, useAlertDialogScope } from './utils'

export type AlertDialogContentNaviteElement = OkuElement<'div'>
export type AlertDialogContentElement = typeof OkuDialogContent

export interface AlertDialogContentProps extends Omit<DialogContentProps, 'onPointerDownOutside' | 'onInteractOutside'> {}

export type AlertDialogContentEmits = {
  click: [event: MouseEvent]
}

export const alertDialogContentProps = {
  props: {
    ...dialogContentProps.props,
  },
  emits: {
    ...propsOmit(dialogContentProps.emits, ['pointerdownOutside', 'interactOutside']),
  },
}
const alertDialogContent = defineComponent({
  name: CONTENT_NAME,
  inheritAttrs: false,
  props: {
    ...primitiveProps,
    ...alertDialogContentProps.props,
    ...scopeAlertDialogProps,
  },
  emits: alertDialogContentProps.emits,
  setup(props, { attrs, slots, emit }) {
    const { scopeOkuAlertDialog, asChild: _asChild, ...alertDialogContentProps } = toRefs(props)
    const dialogScope = useAlertDialogScope(scopeOkuAlertDialog.value)

    const forwardRef = useForwardRef()
    const contentRef = ref<HTMLDivElement | null>(null)
    const composedRefs = useComposedRefs(forwardRef, contentRef)

    const cancelRef = ref<HTMLButtonElement | null>(null)

    const _props = reactive(alertDialogContentProps)

    WarningProvider({
      contentName: computed(() => CONTENT_NAME),
      titleName: computed(() => TITLE_NAME),
      docsSlug: computed(() => 'alert-dialog'),
    })

    AlertDialogContentProvider({
      scope: scopeOkuAlertDialog.value,
      cancelRef,
    })
    const originalReturn = () => h(OkuDialogContent, {
      role: 'alertdialog',
      ...dialogScope,
      ...mergeProps(attrs, _props),
      ref: composedRefs,
      onOpenAutoFocus: composeEventHandlers<DialogContentModalEmits['openAutoFocus'][0]>((el) => {
        el.preventDefault()
        cancelRef.value?.focus({ preventScroll: true })
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
        event.preventDefault()
        emit('interactOutside', event)
      },
      onEscapeKeyDown: (event) => {
        emit('escapeKeyDown', event)
      },
      onPointerdownOutside: (event) => {
        event.preventDefault()
        emit('pointerdownOutside', event)
      },
      onFocusoutSide: (event) => {
        emit('focusoutSide', event)
      },
    },
    {
      /**
             * We have to use `Slottable` here as we cannot wrap the `AlertDialogContentProvider`
             * around everything, otherwise the `DescriptionWarning` would be rendered straight away.
             * This is because we want the accessibility checks to run only once the content is actually
             * open and that behaviour is already encapsulated in `DialogContent`.
             */
      default: () => [h(OkuSlottable, {}, {
        default: () => slots.default && slots.default(),
      }),
      process.env.NODE_ENV === 'development'
      && h(OkuDialogDescriptionWarning, {
        contentRef: contentRef.value,
      }),
      ],
    })
    return originalReturn
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuAlertDialogContent = alertDialogContent as typeof alertDialogContent &
(new () => {
  $props: AlertDialogContentNaviteElement
})
