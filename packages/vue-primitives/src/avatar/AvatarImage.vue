<script setup lang="ts">
import { watchEffect } from 'vue'
import { Primitive } from '../primitive/index.ts'
import type { AvatarImageEmits, AvatarImageProps } from './AvatarImage.ts'
import { type ImageLoadingStatus, useAvatarContext } from './Avatar.ts'
import { useImageLoadingStatus } from './utils.ts'

defineOptions({
  name: 'AvatarImage',
})

const props = withDefaults(defineProps<AvatarImageProps>(), {
  as: 'img',
})

const emit = defineEmits<AvatarImageEmits>()

const context = useAvatarContext()
const imageLoadingStatus = useImageLoadingStatus(() => props.src)

function handleLoadingStatusChange(status: ImageLoadingStatus) {
  emit('loadingStatusChange', status)
  context.onImageLoadingStatusChange(status)
}

watchEffect(() => {
  console.error(imageLoadingStatus.value)
  if (imageLoadingStatus.value !== 'idle') {
    handleLoadingStatusChange(imageLoadingStatus.value)
  }
})
</script>

<template>
  <Primitive v-if="imageLoadingStatus === 'loaded'" :as="as" :as-child="asChild" :src="src">
    <slot />
  </Primitive>
</template>
