<script setup lang="ts">
import { watchEffect } from 'vue'
import { Primitive } from '../primitive/index.ts'
import { type ImageLoadingStatus, useAvatarContext } from './AvatarRoot.ts'
import { useImageLoadingStatus } from './utils.ts'
import type { AvatarImageEmits, AvatarImageProps } from './AvatarImage.ts'

defineOptions({
  name: 'AvatarImage',
})

const props = withDefaults(defineProps<AvatarImageProps>(), {
  as: 'img',
})

const emit = defineEmits<AvatarImageEmits>()

const context = useAvatarContext('AvatarImage')
const imageLoadingStatus = useImageLoadingStatus(() => props.src)

function handleLoadingStatusChange(status: ImageLoadingStatus) {
  emit('loadingStatusChange', status)
  context.onImageLoadingStatusChange(status)
}

watchEffect(() => {
  if (imageLoadingStatus.value !== 'idle') {
    handleLoadingStatusChange(imageLoadingStatus.value)
  }
})
</script>

<template>
  <Primitive :hidden="imageLoadingStatus !== 'loaded'" :as="as" :src="src">
    <slot />
  </Primitive>
</template>
