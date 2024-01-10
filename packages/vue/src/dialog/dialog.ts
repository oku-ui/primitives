import type { PropType } from 'vue'
import { computed, defineComponent, ref, toRefs, useModel } from 'vue'
import type { OkuElement } from '@oku-ui/primitive'
import { useControllable, useId } from '@oku-ui/use-composable'
import { DIALOG_NAME, DialogProvider, scopeDialogProps } from './utils'

export type DialogNaviteElement = OkuElement<'div'>

export interface DialogProps {
  open?: boolean
  defaultOpen?: boolean
  modal?: boolean
}

export type DialogEmits = {
  openChange: [open: boolean]
  modelValue: [open: boolean]
}

export const dialogProps = {
  props: {
    modelValue: {
      type: [Boolean, undefined] as PropType<boolean | undefined>,
      default: undefined,
    },
    open: {
      type: [Boolean, undefined] as PropType<boolean | undefined>,
      default: undefined,
    },
    defaultOpen: {
      type: [Boolean, undefined] as PropType<boolean | undefined>,
      default: undefined,
    },
    modal: {
      type: [Boolean, undefined] as PropType<boolean | undefined>,
      default: undefined,
    },
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    'openChange': (open: boolean) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    'update:modelValue': (open: boolean) => true,
  },
}
const dialog = defineComponent({
  name: DIALOG_NAME,
  inheritAttrs: false,
  props: {
    ...scopeDialogProps,
    ...dialogProps.props,
  },
  emits: dialogProps.emits,
  setup(props, { slots, emit }) {
    const {
      open: openProp,
      defaultOpen,
      modal,
    } = toRefs(props)
    const triggerRef = ref<HTMLButtonElement | null>(null)
    const contentRef = ref<HTMLDivElement | null>(null)

    const modelValue = useModel(props, 'modelValue')

    const openProxy = computed(() => {
      if (openProp.value === undefined && modelValue.value === undefined)
        return undefined
      if (openProp.value !== undefined)
        return openProp.value
      if (modelValue.value !== undefined)
        return modelValue.value
    })

    const [open, setOpen] = useControllable({
      prop: computed(() => openProxy.value),
      defaultProp: computed(() => defaultOpen.value),
      onChange: (result) => {
        emit('openChange', result)
        emit('update:modelValue', result)
      },
      initialValue: false,
    })

    DialogProvider({
      scope: props.scopeOkuDialog,
      triggerRef,
      contentRef,
      contentId: computed(() => useId()),
      titleId: computed(() => useId()),
      descriptionId: computed(() => useId()),
      open,
      modal: computed(() => modal.value || true),
      onOpenChange: (open: boolean) => setOpen(open),
      onOpenToggle: () => {
        setOpen(!open.value)
      },
    })

    return () => slots.default?.()
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuDialog = dialog as typeof dialog
&
  (new () => {
    $props: DialogNaviteElement
  })
