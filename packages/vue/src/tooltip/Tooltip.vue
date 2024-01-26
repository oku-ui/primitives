<script lang="ts">
import type { Scope } from '@oku-ui/provide'

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

  scopeOkuTooltip?: Scope
}

export type TooltipEmits = {
  'update:modelValue': [open: boolean]
  'openChange': [open: boolean]
}

</script>

<script setup lang="ts">
import type { Ref } from 'vue'
import { computed, onBeforeUnmount, ref, withDefaults } from 'vue'
import { useId, useVModel } from '@oku-ui/use-composable'
import { OkuPopper } from '@oku-ui/popper'
import { usePopperScope, useTooltipProvide, useTooltipProviderInject } from './utils'

const props = withDefaults(
  defineProps<TooltipProps>(),
  {
    modelValue: undefined,
    open: undefined,
    defaultOpen: false,
    delayDuration: 700,
    disableHoverableContent: false,
  },
)

const emits = defineEmits<TooltipEmits>()
const trigger = ref<HTMLButtonElement | null>(null)

const provideInject = useTooltipProviderInject('TooltipProvider', props.scopeOkuTooltip)
const popperScope = usePopperScope(props.scopeOkuTooltip)

const contentId = useId()
const openTimerRef = ref(0)
const disableHoverableContent = computed(() => props.disableHoverableContent ?? provideInject.disableHoverableContent.value)
const delayDuration = computed(() => props.delayDuration ?? provideInject.delayDuration.value)
const wasOpenDelayedRef = ref(false)

const openValue = useVModel(props, 'open', emits, {
  defaultValue: props.defaultOpen,
  passive: (props.open === undefined) as false,
  shouldEmit(v: any) {
    emits('openChange', v)
    return true
  },
}) as unknown as Ref<boolean>

const stateAttribute = computed(() => {
  return openValue.value ? (wasOpenDelayedRef.value ? 'delayed-open' : 'instant-open') : 'closed'
})

function handleOpen() {
  window.clearTimeout(openTimerRef.value)
  wasOpenDelayedRef.value = false
  openValue.value = true
}

function handleClose() {
  window.clearTimeout(openTimerRef.value)
  openValue.value = false
}

function handleDelayedOpen() {
  window.clearTimeout(openTimerRef.value)
  openTimerRef.value = window.setTimeout(() => {
    wasOpenDelayedRef.value = true
    openValue.value = true
  }, delayDuration.value)
}

onBeforeUnmount(() => {
  window.clearTimeout(openTimerRef.value)
})

useTooltipProvide({
  scope: props.scopeOkuTooltip,
  contentId: computed(() => contentId),
  open: openValue,
  stateAttribute,
  trigger: trigger as Ref<HTMLButtonElement | null>,
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
</script>

<template>
  <OkuPopper
    v-bind="popperScope"
  >
    <slot />
  </OkuPopper>
</template>
