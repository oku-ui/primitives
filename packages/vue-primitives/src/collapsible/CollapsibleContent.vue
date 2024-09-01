<script setup lang="ts">
import { computed, nextTick, onMounted, shallowRef } from 'vue'
import { Primitive } from '../primitive/index.ts'
import { usePresence } from '../presence/usePresence.ts'
import { useForwardElement } from '../hooks/index.ts'
import type { CollapsibleContentProps } from './CollapsibleContent.ts'
import { useCollapsibleContext } from './CollapsibleRoot.ts'
import { getState } from './utils.ts'

defineOptions({
  name: 'CollapsibleContent',
})

const props = defineProps<CollapsibleContentProps>()
const $el = shallowRef<HTMLElement>()
const forwardElement = useForwardElement($el)

const context = useCollapsibleContext('CollapsibleContent')

let originalStyles: Pick<CSSStyleDeclaration, 'transitionDuration' | 'animationName'>

const isPresent = usePresence($el, () => props.forceMount || context.open.value, () => {
  const node = $el.value
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
  nodeStyle.setProperty('--radix-collapsible-content-height', `${rect.height}px`)
  nodeStyle.setProperty('--radix-collapsible-content-width', `${rect.width}px`)

  // kick off any animations/transitions that were originally set up if it isn't the initial mount
  nodeStyle.transitionDuration = originalStyles.transitionDuration
  nodeStyle.animationName = originalStyles.animationName
})

// when opening we want it to immediately open to retrieve dimensions
// when closing we delay `present` to retrieve dimensions before closing
const isOpen = computed(() => context.open.value || isPresent.value)

const blockAnimationStyles = shallowRef<Partial<CSSStyleDeclaration>>(isOpen.value
  ? {
      transitionDuration: '0s !important',
      animationName: 'none !important',
    }
  : {})

onMounted(async () => {
  if (!isOpen.value)
    return

  const node = $el.value
  if (!node)
    return

  blockAnimationStyles.value = {}
  await nextTick()

  const nodeStyle = node.style

  originalStyles = originalStyles || {
    transitionDuration: nodeStyle.transitionDuration,
    animationName: nodeStyle.animationName,
  }

  nodeStyle.transitionDuration = '0s'
  nodeStyle.animationName = 'none'
})
</script>

<template>
  <Primitive
    :id="context.contentId"
    :ref="forwardElement"
    :data-state="getState(context.open.value)"
    :data-disabled="context.disabled() ? '' : undefined"
    :hidden="!isOpen"
    :style="{
      '--radix-collapsible-content-height': '0px',
      '--radix-collapsible-content-width': '0px',
      ...blockAnimationStyles,
    }"
  >
    <slot v-if="isOpen" />
  </Primitive>
</template>
