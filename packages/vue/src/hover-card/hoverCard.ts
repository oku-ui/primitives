import type { PropType, Ref } from 'vue'
import { computed, defineComponent, h, onBeforeUnmount, ref, toRefs, useModel } from 'vue'
import { primitiveProps } from '@oku-ui/primitive'
import { useControllable } from '@oku-ui/use-composable'
import { createProvideScope } from '@oku-ui/provide'
import { OkuPopper, createPopperScope } from '@oku-ui/popper'
import { scopeHoverCardProps } from './utils'

export const HOVERCARD_NAME = 'OkuHoverCard'

const [createHoverCardProvider, createHoverCardScope] = createProvideScope(HOVERCARD_NAME, [
  createPopperScope,
])

export const usePopperScope = createPopperScope()

type HoverCardProvideValue = {
  open: Ref<boolean>
  onOpenChange(open: boolean): void
  onOpen(): void
  onClose(): void
  onDismiss(): void
  hasSelectionRef: Ref<boolean>
  isPointerDownOnContentRef: Ref<boolean>
}

export const [hoverCardProvide, useHoverCardInject]
  = createHoverCardProvider<HoverCardProvideValue>(HOVERCARD_NAME)

export interface HoverCardProps {
  open?: boolean
  defaultOpen?: boolean
  openDelay?: number
  closeDelay?: number
}

export type HoverCardEmits = {
  'update:modelValue': [open: boolean]
  'openChange': [open: boolean]
}

export const hoverCardProps = {
  props: {
    modelValue: {
      type: [Boolean] as PropType<boolean | undefined>,
      default: undefined,
    },
    open: {
      type: Boolean as PropType<boolean | undefined>,
      default: undefined,
    },
    defaultOpen: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    openDelay: {
      type: Number as PropType<number | undefined>,
      default: 700,
    },
    closeDelay: {
      type: Number as PropType<number | undefined>,
      default: 300,
    },
    ...primitiveProps,
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    'update:modelValue': (open: boolean) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    'openChange': (open: boolean) => true,
  },
}

const hoverCard = defineComponent({
  name: HOVERCARD_NAME,
  inheritAttrs: false,
  props: {
    ...hoverCardProps.props,
    ...scopeHoverCardProps,
  },
  setup(props, { slots, emit }) {
    const {
      scopeOkuHoverCard,
      open: openProp,
      defaultOpen,
      openDelay: openDelayProp,
      closeDelay: closeDelayProp,
    } = toRefs(props)

    const popperScope = usePopperScope(scopeOkuHoverCard.value)
    const openTimerRef = ref(0)
    const closeTimerRef = ref(0)
    const hasSelectionRef = ref(false)
    const isPointerDownOnContentRef = ref(false)

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

    const handleOpen = () => {
      clearTimeout(closeTimerRef.value)
      openTimerRef.value = window.setTimeout(() => {
        setOpen(true)
      }, openDelayProp.value)
    }

    const handleClose = () => {
      clearTimeout(openTimerRef.value)
      if (!hasSelectionRef.value && !isPointerDownOnContentRef.value) {
        closeTimerRef.value = window.setTimeout(() => {
          setOpen(false)
        }, closeDelayProp.value)
      }
    }

    const handleDismiss = () => {
      setOpen(false)
    }

    onBeforeUnmount(() => {
      clearTimeout(openTimerRef.value)
      clearTimeout(closeTimerRef.value)
    })

    hoverCardProvide({
      scope: scopeOkuHoverCard.value,
      open: computed(() => open.value || false),
      onOpenChange: open => setOpen(open),
      onOpen: () => handleOpen(),
      onClose: () => handleClose(),
      onDismiss: () => handleDismiss(),
      hasSelectionRef,
      isPointerDownOnContentRef,
    })

    return () => h(OkuPopper, {
      ...popperScope,
    }, slots)
  },
})

export const OkuHoverCard = hoverCard

export {
  createHoverCardScope,
}
