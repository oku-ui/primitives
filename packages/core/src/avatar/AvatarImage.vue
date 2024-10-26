<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps, type EmitsToHookProps, normalizeAttrs } from '../shared/index.ts'
import { type AvatarImageEmits, type AvatarImageProps, DEFAULT_AVATAR_IMAGE_PROPS, useAvatarImage } from './AvatarImage.ts'

defineOptions({
  name: 'AvatarImage',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<AvatarImageProps>(), DEFAULT_AVATAR_IMAGE_PROPS)

const emit = defineEmits<AvatarImageEmits>()

const avatarImage = useAvatarImage(convertPropsToHookProps(
  props,
  ['src'],
  (): Required<EmitsToHookProps<AvatarImageEmits>> => ({
    onLoadingStatusChange(status) {
      emit('loadingStatusChange', status)
    },
  }),
))
</script>

<template>
  <Primitive v-bind="normalizeAttrs(avatarImage.attrs([$attrs, { as }]))">
    <slot />
  </Primitive>
</template>
