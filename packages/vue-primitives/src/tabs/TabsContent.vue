<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, shallowRef } from 'vue'
import { Primitive } from '../primitive/index.ts'
import { usePresence } from '../presence/usePresence.ts'
import type { TabsContentProps } from './TabsContent.ts'
import { useTabsContext } from './TabsRoot.ts'
import { makeContentId, makeTriggerId } from './utils.ts'

defineOptions({
  name: 'TabsContent',
})

const props = defineProps<TabsContentProps>()

const elRef = shallowRef<HTMLElement>()

const context = useTabsContext('TabsContent')
const triggerId = computed(() => makeTriggerId(context.baseId, props.value))
const contentId = computed(() => makeContentId(context.baseId, props.value))
const isSelected = computed(() => context.value.value === props.value)

let isMountAnimationPrevented = isSelected.value

let rAf: number

onMounted(() => {
  rAf = requestAnimationFrame(() => {
    isMountAnimationPrevented = false
  })
})

onBeforeUnmount(() => {
  cancelAnimationFrame(rAf)
})

const isPresent = usePresence(elRef, () => props.forceMount || isSelected.value)
</script>

<template>
  <Primitive
    :id="contentId"
    :data-state="isSelected ? 'active' : 'inactive'"
    :data-orientation="context.orientation"
    role="tabpanel"
    :aria-labelledby="triggerId"
    :hidden="!isPresent"
    tabindex="0"
    :style="{
      animationDuration: isMountAnimationPrevented ? '0s' : undefined,
    }"
  >
    <slot v-if="isPresent" />
  </Primitive>
</template>
