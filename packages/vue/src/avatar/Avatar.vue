<script lang="ts">
import type { PrimitiveProps } from '@oku-ui/primitive'

export interface ScopeAvatar {
  scopeOkuAvatar?: any
}

export interface AvatarProps extends PrimitiveProps {
  scopeOkuAvatar?: any
}
</script>

<script setup lang="ts">
import { defineOptions, ref } from 'vue'
import { useComponentRef } from '@oku-ui/use-composable'
import { Primitive } from '@oku-ui/primitive'
import type { ImageLoadingStatus } from './types'
import { useAvatarProvider } from './utils'

defineOptions({
  name: 'OkuAvatar',
})

const props = withDefaults(defineProps<AvatarProps>(), {
  is: 'span',
})

const imageLoadingStatus = ref<ImageLoadingStatus>('idle')

const { componentRef, currentElement } = useComponentRef<HTMLLabelElement | null>()

useAvatarProvider({
  scope: props.scopeOkuAvatar,
  imageLoadingStatus,
  onImageLoadingStatusChange: (status: ImageLoadingStatus) => imageLoadingStatus.value = status,
})

defineExpose({
  $el: currentElement,
})

</script>

<template>
  <Primitive
    v-bind="props"
    ref="componentRef"
  >
    <slot />
  </Primitive>
</template>
