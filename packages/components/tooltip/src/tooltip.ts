import type { PropType, Ref } from 'vue'
import { computed, defineComponent, h, onUnmounted, ref, toRefs, useModel } from 'vue'
import type { ElementType } from '@oku-ui/primitive'
import { primitiveProps } from '@oku-ui/primitive'
import { useControllable, useId } from '@oku-ui/use-composable'
import { OkuPopper } from '@oku-ui/popper'
import { TOOLTIP_OPEN, createTooltipProvide, usePopperScope } from './utils'
import type { TooltipTriggerElement } from './tooltipTrigger'
import { useTooltipProviderInject } from './tooltipProvider'
import { scopeTooltipProps } from './types'

export const TOOLTIP_NAME = 'OkuTooltip'

export type LabelIntrinsicElement = ElementType<'label'>
export type LabelElement = HTMLLabelElement

type TooltipInjectValue = {
  contentId: Ref<string>
  open: Ref<boolean | undefined>
  stateAttribute: Ref<'closed' | 'delayed-open' | 'instant-open'>
  trigger: Ref<TooltipTriggerElement | null>
  onTriggerChange(trigger: TooltipTriggerElement | null): void
  onTriggerEnter(): void
  onTriggerLeave(): void
  onOpen(): void
  onClose(): void
  disableHoverableContent: Ref<boolean>
}

export const [tooltipProvide, useTooltipInject]
  = createTooltipProvide<TooltipInjectValue>(TOOLTIP_NAME)

export interface TooltipProps {
  open?: boolean
  /**
 * When `true`, trying to hover the content will result in the tooltip closing as the pointer leaves the trigger.
 * @defaultValue false
 */
  defaultOpen?: boolean
  /**
 * The duration from when the pointer enters the trigger until the tooltip gets opened. This will
 * override the prop with the same name passed to Provider.
 * @defaultValue 700
 */
  delayDuration?: number
  /**
   * When `true`, trying to hover the content will result in the tooltip closing as the pointer leaves the trigger.
   * @defaultValue false
   */
  disableHoverableContent?: boolean
}

export type TooltipEmits = {
  'update:modelValue': [open: boolean]
  'openChange': [open: boolean]
}

export const tooltipProps = {
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
      default: false,
    },
    delayDuration: {
      type: Number as PropType<number | undefined>,
      default: 700,
    },
    disableHoverableContent: {
      type: Boolean as PropType<boolean | undefined>,
      default: false,
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

const tooltip = defineComponent({
  name: TOOLTIP_NAME,
  inheritAttrs: false,
  props: {
    ...tooltipProps.props,
    ...scopeTooltipProps,
  },
  emits: tooltipProps.emits,
  setup(props, { attrs, slots, emit }) {
    const {
      open: openProp,
      defaultOpen,
      disableHoverableContent: disableHoverableContentProp,
      delayDuration: delayDurationProp,
    } = toRefs(props)
    const provideInject = useTooltipProviderInject(TOOLTIP_NAME, props.scopeOkuTooltip)
    const popperScope = usePopperScope(props.scopeOkuTooltip)
    const trigger = ref<HTMLButtonElement | null>(null)

    const contentId = useId()
    const openTimerRef = ref(0)
    const disableHoverableContent = computed(() => disableHoverableContentProp.value ?? provideInject.disableHoverableContent.value)
    const delayDuration = computed(() => delayDurationProp.value ?? provideInject.delayDuration.value)
    const wasOpenDelayedRef = ref(false)

    const modelValue = useModel(props, 'modelValue')
    const proxyChecked = computed({
      get: () => modelValue.value !== undefined ? modelValue.value : openProp.value !== undefined ? openProp.value : undefined,
      set: () => {
      },
    })

    const { state, updateValue } = useControllable({
      prop: computed(() => proxyChecked.value),
      defaultProp: computed(() => defaultOpen.value),
      onChange: (result: boolean) => {
        if (result) {
          provideInject.onOpen()
          document.dispatchEvent(new CustomEvent(TOOLTIP_OPEN))
        }
        else {
          provideInject.onClose()
        }

        emit('update:modelValue', result)
        emit('openChange', result)
      },
      initialValue: false,
    })

    const stateAttribute = computed(() => {
      return state.value ? (wasOpenDelayedRef.value ? 'delayed-open' : 'instant-open') : 'closed'
    })

    const handleOpen = () => {
      window.clearTimeout(openTimerRef.value)
      wasOpenDelayedRef.value = false
      updateValue(true)
    }

    const handleClose = () => {
      window.clearTimeout(openTimerRef.value)
      updateValue(false)
    }

    const handleDelayedOpen = () => {
      window.clearTimeout(openTimerRef.value)
      openTimerRef.value = window.setTimeout(() => {
        wasOpenDelayedRef.value = true
        updateValue(true)
      }, delayDuration.value)
    }

    onUnmounted(() => {
      window.clearTimeout(openTimerRef.value)
    })

    tooltipProvide({
      scope: props.scopeOkuTooltip,
      contentId: computed(() => contentId),
      open: state,
      stateAttribute,
      trigger,
      onTriggerChange: (value: HTMLButtonElement) => {
        trigger.value = value
      },
      onTriggerEnter: () => {
        if (provideInject.isOpenDelayed.value)
          handleDelayedOpen()
        else
          handleOpen()
      },
      onTriggerLeave: () => {
        if (disableHoverableContent.value) {
          handleClose()
        }
        else {
          // Clear the timer in case the pointer leaves the trigger before the tooltip is opened.
          window.clearTimeout(openTimerRef.value)
        }
      },
      onOpen: () => handleOpen(),
      onClose: () => handleClose(),
      disableHoverableContent,
    })
    return () => h(OkuPopper, {
      ...popperScope,
    }, slots)
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuTooltip = tooltip
