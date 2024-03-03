<script setup lang="ts">
import { useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import { useCollapsibleInject } from './Collapsible.js'
import type { CollapsibleContentImplProps } from './CollapsibleContentImpl.ts'
import { CONTENT_IMPL_NAME } from './constants.js'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watchEffect } from 'vue'
import { getState } from './utils'

defineOptions({
  name: CONTENT_IMPL_NAME,
})

const props = defineProps<CollapsibleContentImplProps>()

const context = useCollapsibleInject(CONTENT_IMPL_NAME, props.scopeOkuCollapsible)

const elRef = ref<HTMLElement>()

const forwardedRef = useForwardRef()
const composedRefs = useComposedRefs(elRef, forwardedRef)

const height = ref<number>(0)
const width = ref<number>(0)

const isPresent = ref(props.present)
const isOpen = computed(() => context.open.value || isPresent.value)
const isMountAnimationPreventedRef = ref(isOpen.value)
const originalStylesRef = ref<Record<string, string>>()

const rAf = ref()

onMounted(() => {
  rAf.value = requestAnimationFrame(() => (isMountAnimationPreventedRef.value = false))
})

onBeforeUnmount(() => {
  cancelAnimationFrame(rAf.value)
})

watchEffect(async () => {
  const node = elRef.value

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

</script>

<template>
  <Primitive
    :is="is"
    :id="context.contentId"
    :ref="composedRefs"
    :as-child="asChild"
    :data-state="getState(context.open.value)"
    :data-disabled="context.disabled?.value ? '' : undefined"
    :hidden="!isOpen"
    :style="{
      [`--oku-collapsible-content-height`]: `${height}px`,
      [`--oku-collapsible-content-width`]: `${width}px`,
    }"
  >
    <slot v-if="isOpen" />
  </Primitive>
</template>
