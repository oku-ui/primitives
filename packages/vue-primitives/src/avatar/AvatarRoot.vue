<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { type AvatarRootProps, DEFAULT_AVATAR_ROOT_PROPS, useAvatarRoot } from './AvatarRoot.ts'

defineOptions({
  name: 'AvatarRoot',
})

withDefaults(defineProps<AvatarRootProps>(), DEFAULT_AVATAR_ROOT_PROPS)

useAvatarRoot()
</script>

<template>
  <Primitive :as="as">
    <slot />
  </Primitive>
</template>
