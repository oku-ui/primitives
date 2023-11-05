import { computed, defineComponent, h, mergeProps, reactive, ref, toRefs } from 'vue'
import { reactiveOmit, useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import type { DialogContentModalEmits } from '@oku-ui/dialog'
import { OkuDialogContent, OkuDialogDescriptionWarning, WarningProvider } from '@oku-ui/dialog'
import { composeEventHandlers } from '@oku-ui/utils'
import { OkuSlottable } from '@oku-ui/slot'
import type { AlertDialogContentNaviteElement } from './props'
import { AlertDialogContentProvider, CONTENT_NAME, TITLE_NAME, alertDialogContentProps, scopeAlertDialogProps, useAlertDialogScope } from './props'

const alertDialogContent = defineComponent({
  name: CONTENT_NAME,
  inheritAttrs: false,
  props: {
    ...alertDialogContentProps.props,
    ...scopeAlertDialogProps,
  },
  emits: alertDialogContentProps.emits,
  setup(props, { attrs, slots }) {
    const { scopeOkuAlertDialog, ...contentProps } = toRefs(props)
    const _reactive = reactive(contentProps)
    const reactiveContentProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const dialogScope = useAlertDialogScope(scopeOkuAlertDialog.value)

    const forwardRef = useForwardRef()
    const contentRef = ref<HTMLDivElement | null>(null)
    const composedRefs = useComposedRefs(forwardRef, contentRef)

    const cancelRef = ref<HTMLButtonElement | null>(null)

    WarningProvider({
      contentName: computed(() => CONTENT_NAME),
      titleName: computed(() => TITLE_NAME),
      docsSlug: computed(() => 'alert-dialog'),
    })

    AlertDialogContentProvider({
      scope: scopeOkuAlertDialog.value,
      cancelRef,
    })
    return () => h(OkuDialogContent, {
      role: 'alertdialog',
      ...dialogScope,
      ...mergeProps(attrs, reactiveContentProps),
      ref: composedRefs,
      onOpenAutoFocus: composeEventHandlers<DialogContentModalEmits['openAutoFocus'][0]>((event) => {
        event.preventDefault()
      }, (el) => {
        el.preventDefault()
        cancelRef.value?.focus({ preventScroll: true })
      }),
      onInteractOutside: event => event.preventDefault(),
      onPointerdownOutside: event => event.preventDefault(),
    }, {
      /**
       * We have to use `Slottable` here as we cannot wrap the `AlertDialogContentProvider`
       * around everything, otherwise the `DescriptionWarning` would be rendered straight away.
       * This is because we want the accessibility checks to run only once the content is actually
       * open and that behaviour is already encapsulated in `DialogContent`.
       */
      default: () => [
        h(OkuSlottable, {}, {
          default: () => slots.default?.(),
        }),
        process.env.NODE_ENV === 'development'
        && h(OkuDialogDescriptionWarning, {
          contentRef: contentRef.value,
        }),
      ],
    })
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuAlertDialogContent = alertDialogContent as typeof alertDialogContent &
(new () => {
  $props: AlertDialogContentNaviteElement
})
