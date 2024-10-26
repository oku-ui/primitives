<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps } from '../shared/index.ts'
import { type AvatarFallbackProps, useAvatarFallback } from './AvatarFallback.ts'

defineOptions({
  name: 'AvatarFallback',
})

const props = withDefaults(defineProps<AvatarFallbackProps>(), {
  as: 'span',
})

const avatarFallback = useAvatarFallback(convertPropsToHookProps(props))
</script>

<template>
  <Primitive v-if="avatarFallback.isOpen.value" :as="as">
    <slot />
  </Primitive>
</template>
