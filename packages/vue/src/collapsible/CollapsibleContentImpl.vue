<script setup lang="ts">
import { usePrimitiveElement } from '@oku-ui/use-composable'
import { Primitive } from '@oku-ui/primitive'
import { useCollapsibleInject } from './Collapsible'
import type { CollapsibleContentImplProps } from './CollapsibleContentImpl'
import { CONTENT_IMPL_NAME } from './constants'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watchEffect } from 'vue'
import { getState } from './utils'

defineOptions({
  name: CONTENT_IMPL_NAME,
})

const props = defineProps<CollapsibleContentImplProps>()

const context = useCollapsibleInject(CONTENT_IMPL_NAME, props.scopeOkuCollapsible)

const [contentRef, setContentRef] = usePrimitiveElement<HTMLElement>()

const height = ref(0)
const width = ref(0)

const isPresent = ref(props.present)
const isOpen = computed(() => context.open.value || isPresent.value)
const isMountAnimationPreventedRef = ref(isOpen.value)
const originalStylesRef = ref<Record<string, string>>({})

const rAf = ref<number>()

onMounted(() => {
  rAf.value = requestAnimationFrame(() => (isMountAnimationPreventedRef.value = false))
})

onBeforeUnmount(() => {
  cancelAnimationFrame(rAf.value!)
})

watchEffect(async () => {
  const node = contentRef.value

  if (node) {
    originalStylesRef.value = originalStylesRef.value || {
      transitionDuration: node.style.transitionDuration,
      animationName: node.style.animationName,
    }
    // block any animations/transitions so the element renders at its full dimensions
    node.style.transitionDuration = '0s'
    node.style.animationName = 'none'

    // get width and height from full dimensions
    const rect = node.getBoundingClientRect()

    height.value = rect.height
    width.value = rect.width
    await nextTick()

    // kick off any animations/transitions that were originally set up if it isn't the initial mount
    if (!isMountAnimationPreventedRef.value) {
      node.style.transitionDuration = originalStylesRef.value.transitionDuration
      node.style.animationName = originalStylesRef.value.animationName
    }

    isPresent.value = props.present
  }
})

defineExpose({
  $el: contentRef,
})
</script>

<template>
  <Primitive
    :is="is"
    :id="context.contentId"
    :ref="setContentRef"
    :as-child="asChild"
    :data-state="getState(context.open.value)" :data-disabled="context.disabled?.value ? '' : undefined" :hidden="!isOpen"
    :style="{
      [`--oku-collapsible-content-height`]: `${height}px`,
      [`--oku-collapsible-content-width`]: `${width}px`,
    }"
  >
    <slot v-if="isOpen" />
  </Primitive>
</template>
