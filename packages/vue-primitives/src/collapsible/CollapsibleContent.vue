<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, shallowRef, watch } from 'vue'
import { Primitive } from '../primitive/index.ts'
import { usePresence } from '../presence/usePresence.ts'
import type { CollapsibleContentProps } from './CollapsibleContent.ts'
import { useCollapsibleContext } from './Collapsible.ts'
import { getState } from './utils.ts'

defineOptions({
  name: 'CollapsibleContent',
})

const props = defineProps<CollapsibleContentProps>()
const elRef = shallowRef<HTMLElement>()

const context = useCollapsibleContext()

const isPresent = usePresence(elRef, () => props.forceMount || context.open.value)

const width = shallowRef(0)
const height = shallowRef(0)

// when opening we want it to immediately open to retrieve dimensions
// when closing we delay `present` to retrieve dimensions before closing
const isOpen = computed(() => context.open.value || isPresent.value)
// TODO: block any animations/transitions
let isMountAnimationPrevented = isOpen.value
let originalStyles: Record<string, string>

let rAf: number
const initStyles = shallowRef<Record<string, string> | undefined>({
  transitionDuration: '0s !important',
  animationDuration: '0s !important',
  // animationName: 'none !important',
})

onMounted(() => {
  initStyles.value = undefined
  rAf = requestAnimationFrame(() => {
    isMountAnimationPrevented = false
  })
})

onBeforeUnmount(() => {
  cancelAnimationFrame(rAf)
})

watch(
  () => [context.open.value, elRef.value],
  async () => {
    const node = elRef.value

    if (context.open.value)
      await nextTick()

    if (!node)
      return

    const nodeStyle = node.style

    originalStyles = originalStyles || {
      transitionDuration: nodeStyle.transitionDuration,
      animationName: nodeStyle.animationName,
    }

    // block any animations/transitions so the element renders at its full dimensions
    nodeStyle.transitionDuration = '0s'
    nodeStyle.animationName = 'none'

    // get width and height from full dimensions
    const rect = node.getBoundingClientRect()
    height.value = rect.height
    width.value = rect.width

    // kick off any animations/transitions that were originally set up if it isn't the initial mount
    if (!isMountAnimationPrevented) {
      nodeStyle.transitionDuration = originalStyles.transitionDuration!
      nodeStyle.animationName = originalStyles.animationName!
    }
  },
)
</script>

<template>
  <Primitive
    :id="context.contentId"
    :ref="(el: any) => elRef = el?.$el"
    :as="as"
    :as-child="asChild"
    :data-state="getState(context.open.value)"
    :data-disabled="context.disabled?.value ? '' : undefined"
    :hidden="!isOpen"
    :style="{
      '--radix-collapsible-content-height': `${height}px`,
      '--radix-collapsible-content-width': `${width}px`,
      ...initStyles,
    }"
  >
    <slot v-if="isOpen" />
  </Primitive>
</template>
