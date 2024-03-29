<script lang="ts">
import type { PrimitiveProps } from '@oku-ui/primitive'
import type { ImageLoadingStatus } from './types'
import { useAvatarInject, useImageLoadingStatus } from './utils'

export interface AvatarImageProps extends PrimitiveProps {
  scopeOkuAvatar?: any
  src: string
}

export type AvatarImageEmits = {
  loadingStatusChange: [status: ImageLoadingStatus]
}

</script>

<script setup lang="ts">
import { defineOptions, watchEffect, withDefaults } from 'vue'
import { useComponentRef } from '@oku-ui/use-composable'
import { Primitive } from '@oku-ui/primitive'

defineOptions({
  name: 'OkuAvatarImage',
})

const props = withDefaults(defineProps<AvatarImageProps>(), {
  is: 'img',
})

const emits = defineEmits<AvatarImageEmits>()

const { componentRef, currentElement } = useComponentRef<HTMLLabelElement | null>()

const inject = useAvatarInject('OkuAvatar', props.scopeOkuAvatar)

const imageLoadingStatus = useImageLoadingStatus(props.src)

function handleLoadingStatusChange(status: ImageLoadingStatus) {
  emits('loadingStatusChange', status)
  inject.onImageLoadingStatusChange(status)
}

watchEffect(() => {
  if (imageLoadingStatus.value !== 'idle')
    handleLoadingStatusChange(imageLoadingStatus.value)
})

defineExpose({
  $el: currentElement,
})
</script>

<template>
  <Primitive
    v-if="imageLoadingStatus === 'loaded'"
    v-bind="props"
    ref="componentRef"
  >
    <slot />
  </Primitive>
</template>
