<script lang="ts">
import type { Scope } from '@oku-ui/provide'

export interface TooltipProviderProps {
  scopeOkuTooltip?: Scope
  /**
   * The duration from when the pointer enters the trigger until the tooltip gets opened.
   * @defaultValue 700
   */
  delayDuration?: number
  /**
   * How much time a user has to enter another trigger without incurring a delay again.
   * @defaultValue 300
   */
  skipDelayDuration?: number
  /**
   * When `true`, trying to hover the content will result in the tooltip closing as the pointer leaves the trigger.
   * @defaultValue false
   */
  disableHoverableContent?: boolean
}

</script>

<script setup lang="ts">
import {
  defineOptions,
  onBeforeUnmount,
  onMounted,
  ref,
  toRefs,
  withDefaults,
} from 'vue'
import {
  useTooltipProviderProvide,
} from './utils'

defineOptions({
  name: 'OkuTooltipProvider',
})

const props = withDefaults(
  defineProps<TooltipProviderProps>(),
  {
    delayDuration: 700,
    skipDelayDuration: 300,
    disableHoverableContent: false,
  },
)

const isOpenDelayed = ref(true)
const isPointerInTransitRef = ref(false)
const skipDelayTimerRef = ref(0)
const skipDelayTimer = ref()

onMounted(() => {
  skipDelayTimer.value = skipDelayTimerRef.value
})

onBeforeUnmount(() => {
  window.clearTimeout(skipDelayTimer.value)
})

const {
  delayDuration,
  disableHoverableContent,
  scopeOkuTooltip,
  skipDelayDuration,
} = toRefs(props)

useTooltipProviderProvide({
  scope: scopeOkuTooltip.value,
  isOpenDelayed,
  delayDuration,
  onOpen() {
    window.clearTimeout(skipDelayTimerRef.value)
    isOpenDelayed.value = false
  },
  onClose() {
    window.clearTimeout(skipDelayTimerRef.value)
    skipDelayTimerRef.value = window.setTimeout(
      () => isOpenDelayed.value = false,
      skipDelayDuration.value,
    )
  },
  isPointerInTransitRef,
  onPointerInTransitChange(inTransit: boolean) {
    isPointerInTransitRef.value = inTransit
  },
  disableHoverableContent,
})
</script>

<template>
  <slot />
</template>
