<script setup lang="ts">
import { shallowRef, watchEffect } from 'vue'
import { isClient } from '@vueuse/core'
import { Primitive } from '../primitive/index.ts'
import type { AvatarFallbackProps } from './AvatarFallback.ts'
import { useAvatarContext } from './Avatar.ts'

defineOptions({
  name: 'AvatarFallback',
})

const props = withDefaults(defineProps<AvatarFallbackProps>(), {
  as: 'span',
})

const context = useAvatarContext()
const canRender = shallowRef(props.delayMs === undefined)

watchEffect((onCleanup) => {
  if (!isClient)
    return

  if (props.delayMs !== undefined) {
    const timerId = window.setTimeout(() => canRender.value = true, props.delayMs)
    onCleanup(() => {
      window.clearTimeout(timerId)
    })
  }
})
</script>

<template>
  <Primitive v-if="canRender && context.imageLoadingStatus.value !== 'loaded'" :as="as" :as-child="asChild">
    <slot />
  </Primitive>
</template>
