import type { PropType, Ref } from 'vue'
import { computed, defineComponent, h, ref, toRefs } from 'vue'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { useControllable, useForwardRef, useId } from '@oku-ui/use-composable'
import { DIALOG_NAME, DialogProvider, scopeDialogrops } from './utils'
import type { DialogContentNaviteElement } from './dialogContent'

export type DialogNaviteElement = OkuElement<'button'>

interface DialogProps {
  open?: Ref<boolean | undefined>
  defaultOpen?: Ref<boolean | undefined>
  modal?: Ref<boolean | undefined>
}
export const dialogProps = {
  props: {
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
    openChange: (open: boolean) => true,
  },
}
const dialog = defineComponent({
  name: DIALOG_NAME,
  inheritAttrs: false,
  props: {
    ...primitiveProps,
    ...scopeDialogrops,
    ...dialogProps.props,
  },
  emits: dialogProps.emits,
  setup(props, { attrs, slots, emit }) {
    const { ...restAttrs } = attrs as DialogNaviteElement
    const {
      open: openProp,
      defaultOpen,
      modal,
    } = toRefs(props)
    const triggerRef = ref<HTMLButtonElement | null>(null)
    const contentRef = ref<HTMLDivElement | null>(null)

    const { state, updateValue } = useControllable({
      prop: computed(() => openProp.value),
      defaultProp: computed(() => defaultOpen.value),
      onChange: (result: any) => {
        emit('openChange', result)
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
      open: computed(() => state.value || false),
      modal: computed(() => modal.value || true),
      onOpenChange: (open: boolean) => updateValue(open),
      onOpenToggle: () => {
        updateValue(!state.value)
      },
    })
    const originalReturn = () => h(Primitive.button, {
      asChild: props.asChild,
      ...restAttrs,
    },
    {
      default: () => slots.default?.(),
    })
    return originalReturn
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuDialog = dialog as typeof dialog &
(new () => {
  $props: DialogNaviteElement
})
