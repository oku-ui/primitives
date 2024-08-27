<script setup lang="ts">
import { shallowRef } from 'vue'
import { Primitive } from '../primitive/index.ts'
import { type AvatarRootProps, type ImageLoadingStatus, provideAvatarContext } from './AvatarRoot.ts'

defineOptions({
  name: 'AvatarRoot',
})

withDefaults(defineProps<AvatarRootProps>(), {
  as: 'span',
})

const imageLoadingStatus = shallowRef<ImageLoadingStatus>('idle')

provideAvatarContext({
  imageLoadingStatus,
  onImageLoadingStatusChange(newStatus) {
    imageLoadingStatus.value = newStatus
  },
})
</script>

<template>
  <Primitive
    :as="as"
  >
    <slot />
  </Primitive>
</template>
