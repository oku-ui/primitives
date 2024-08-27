<script setup lang="ts">
import { shallowRef, watchEffect } from 'vue'
import { isClient } from '@vueuse/core'
import { Primitive } from '../primitive/index.ts'
import type { AvatarFallbackProps } from './AvatarFallback.ts'
import { useAvatarContext } from './AvatarRoot.ts'

defineOptions({
  name: 'AvatarFallback',
})

const props = withDefaults(defineProps<AvatarFallbackProps>(), {
  as: 'span',
})

const context = useAvatarContext('AvatarFallback')
const canRender = shallowRef(props.delayMs === undefined)

if (isClient) {
  watchEffect((onCleanup) => {
    if (props.delayMs !== undefined) {
      const timerId = window.setTimeout(() => canRender.value = true, props.delayMs)
      onCleanup(() => {
        window.clearTimeout(timerId)
      })
    }
  })
}
</script>

<template>
  <Primitive v-if="canRender && context.imageLoadingStatus.value !== 'loaded'" :as="as">
    <slot />
  </Primitive>
</template>
