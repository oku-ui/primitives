<script lang="ts">
import { createProvideScope } from '@oku-ui/provide'
import type { PrimitiveProps } from '@oku-ui/primitive'
import type { Ref } from 'vue'

export interface ScopeAvatar {
  scopeOkuAvatar?: any
}

export type AvatarProvide = {
  _names: 'OkuAvatar'
  imageLoadingStatus: Ref<ImageLoadingStatus>
  onImageLoadingStatusChange(status: ImageLoadingStatus): void
}

export const { composeProviderScopes, createProvide }
    = createProvideScope<AvatarProvide['_names']>('OkuAvatar')

export const { useProvider, useInject: useAvatarInject }
    = createProvide<Omit<AvatarProvide, '_names'>>('OkuAvatar')

export interface AvatarProps extends PrimitiveProps {
  scopeOkuAvatar?: any
}
</script>

<script setup lang="ts">
import { defineOptions, ref } from 'vue'
import { useComponentRef } from '@oku-ui/use-composable'
import { Primitive } from '@oku-ui/primitive'
import type { ImageLoadingStatus } from './types'

defineOptions({
  name: 'OkuAvatar',
})

const props = withDefaults(defineProps<AvatarProps>(), {
  is: 'span',
})

const imageLoadingStatus = ref<ImageLoadingStatus>('idle')

const { componentRef } = useComponentRef<HTMLLabelElement | null>()

useProvider({
  scope: props.scopeOkuAvatar,
  imageLoadingStatus,
  onImageLoadingStatusChange: (status: ImageLoadingStatus) => imageLoadingStatus.value = status,
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
