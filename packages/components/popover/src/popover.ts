import type { PropType, Ref } from 'vue'
import { computed, defineComponent, h, ref, toRefs, useModel } from 'vue'
import { primitiveProps } from '@oku-ui/primitive'
import { useControllable, useId } from '@oku-ui/use-composable'
import { createProvideScope } from '@oku-ui/provide'
import { OkuPopper, createPopperScope } from '@oku-ui/popper'
import type { ScopePopover } from './utils'
import { scopePopoverProps } from './utils'

const POPOVER_NAME = 'OkuPopover'

export const [createPopoverProvide, createPopoverScope] = createProvideScope(POPOVER_NAME, [
  createPopperScope,
])

export const usePopperScope = createPopperScope()

type PopoverProvideValue = {
  triggerRef: Ref<HTMLButtonElement | null>
  contentId: Ref<string>
  open: Ref<boolean>
  onOpenChange(open: boolean): void
  onOpenToggle(): void
  hasCustomAnchor: Ref<boolean>
  onCustomAnchorAdd(): void
  onCustomAnchorRemove(): void
  modal: Ref<boolean>
}

const [popoverProvide, usePopoverInject]
  = createPopoverProvide<PopoverProvideValue>(POPOVER_NAME)

export {
  usePopoverInject,
}

export interface PopoverProps {
  open?: boolean
  defaultOpen?: boolean
  modal?: boolean
}

export interface PopoverEmits {
  'openChange': [open: boolean]
}

export const popoverProps = {
  props: {
    modelValue: {
      type: [Boolean, undefined] as PropType<boolean | undefined>,
      default: undefined,
    },
    open: {
      type: Boolean,
      default: undefined,
    },
    defaultOpen: {
      type: Boolean,
      default: undefined,
    },
    modal: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    'openChange': (open: boolean) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    'update:modelValue': (open: boolean) => true,
  },
}

const popover = defineComponent({
  name: POPOVER_NAME,
  inheritAttrs: false,
  props: {
    ...popoverProps.props,
    ...primitiveProps,
    ...scopePopoverProps,
  },
  emits: popoverProps.emits,
  setup(props, { slots, emit }) {
    const {
      open: openProp,
      defaultOpen,
      modal,
      scopeOkuPopover,
    } = toRefs(props)

    const popperScope = usePopperScope(scopeOkuPopover.value)

    const triggerRef = ref<HTMLButtonElement | null>(null)
    const hasCustomAnchor = ref(false)

    const modelValue = useModel(props, 'modelValue')
    const proxyChecked = computed({
      get: () => modelValue.value !== undefined
        ? modelValue.value
        : openProp.value !== undefined
          ? openProp.value
          : undefined,
      set: () => {
      },
    })

    const { state, updateValue } = useControllable({
      prop: computed(() => proxyChecked.value),
      defaultProp: computed(() => defaultOpen.value),
      onChange: (result: any) => {
        emit('update:modelValue', result)
        emit('openChange', result)
      },
      initialValue: false,
    })

    popoverProvide({
      scope: scopeOkuPopover.value,
      contentId: computed(() => useId()),
      triggerRef,
      open: computed(() => state.value || false),
      onOpenChange: updateValue,
      onOpenToggle: () => {
        updateValue(!state.value)
      },
      hasCustomAnchor,
      onCustomAnchorAdd: () => {
        hasCustomAnchor.value = true
      },
      onCustomAnchorRemove: () => {
        hasCustomAnchor.value = false
      },
      modal,
    })

    return () => h(OkuPopper, {
      ...popperScope,
    }, {
      default: () => slots.default?.(),
    })
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuPopover = popover as typeof popover &
(new () => {
  $props: ScopePopover<any>
})
