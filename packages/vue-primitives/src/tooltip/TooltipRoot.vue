<script setup lang="ts">
import { onBeforeUnmount, shallowRef } from 'vue'
import { useControllableState, useId } from '../hooks/index.ts'
import { type Measurable, providePopperContext } from '../popper/index.ts'
import { useTooltipProviderContext } from './TooltipProvider.ts'
import { provideTooltipContext, TOOLTIP_OPEN, type TooltipRootEmits, type TooltipRootProps } from './TooltipRoot.ts'

defineOptions({
  name: 'TooltipRoot',
})

const props = withDefaults(defineProps<TooltipRootProps>(), {
  open: undefined,
  defaultOpen: false,
  delayDuration: undefined,
  disableHoverableContent: undefined,
})
const emit = defineEmits<TooltipRootEmits>()

const providerContext = useTooltipProviderContext('Tooltip')
const trigger = shallowRef<HTMLButtonElement>()

let openTimerRef = 0

const disableHoverableContent = props.disableHoverableContent ?? providerContext.disableHoverableContent
const delayDuration = () => props.delayDuration ?? providerContext.delayDuration
let wasOpenDelayedRef = false

const open = useControllableState(
  props,
  'open',
  (v) => {
    if (v) {
      providerContext.onOpen()

      // as `onChange` is called within a lifecycle method we
      // avoid dispatching via `dispatchDiscreteCustomEvent`.
      document.dispatchEvent(new CustomEvent(TOOLTIP_OPEN))
    }
    else {
      providerContext.onClose()
    }
    emit('update:open', v)
  },
  props.defaultOpen,
)

function handleOpen() {
  window.clearTimeout(openTimerRef)
  wasOpenDelayedRef = false
  open.value = true
}

function handleClose() {
  window.clearTimeout(openTimerRef)
  open.value = false
}

function handleDelayedOpen() {
  window.clearTimeout(openTimerRef)
  openTimerRef = window.setTimeout(() => {
    wasOpenDelayedRef = true
    open.value = true
  }, delayDuration())
}

onBeforeUnmount(() => {
  window.clearTimeout(openTimerRef)
})

provideTooltipContext({
  contentId: useId(),
  open,
  stateAttribute() {
    return open.value ? (wasOpenDelayedRef ? 'delayed-open' : 'instant-open') : 'closed'
  },
  trigger,
  onTriggerChange(v) {
    trigger.value = v
  },
  onTriggerEnter() {
    if (providerContext.isOpenDelayed.value)
      handleDelayedOpen()
    else handleOpen()
  },
  onTriggerLeave() {
    if (disableHoverableContent) {
      handleClose()
    }
    else {
      // Clear the timer in case the pointer leaves the trigger before the tooltip is opened.
      window.clearTimeout(openTimerRef)
    }
  },
  onOpen: handleOpen,
  onClose: handleClose,
  disableHoverableContent,
})

// COMP::PopperRoot

const anchor = shallowRef<Measurable>()

providePopperContext({
  content: shallowRef(),
  anchor,
  onAnchorChange(newAnchor) {
    anchor.value = newAnchor
  },
})
</script>

<template>
  <slot />
</template>
