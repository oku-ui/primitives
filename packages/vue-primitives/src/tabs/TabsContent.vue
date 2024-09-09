<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, shallowRef } from 'vue'
import { useForwardElement } from '../hooks/useForwardElement.ts'
import { usePresence } from '../presence/usePresence.ts'
import { Primitive } from '../primitive/index.ts'
import { useTabsContext } from './TabsRoot.ts'
import { makeContentId, makeTriggerId } from './utils.ts'
import type { TabsContentProps } from './TabsContent.ts'

defineOptions({
  name: 'TabsContent',
})

const props = defineProps<TabsContentProps>()

const $el = shallowRef<HTMLElement>()
const forwardElement = useForwardElement($el)

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

const isPresent = usePresence($el, () => props.forceMount || isSelected.value)
</script>

<template>
  <Primitive
    :id="contentId"
    :ref="forwardElement"
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
