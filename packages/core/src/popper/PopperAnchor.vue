<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps, normalizeAttrs } from '../shared/index.ts'
import { type PopperAnchorProps, usePopperAnchor } from './PopperAnchor.ts'

defineOptions({
  name: 'PopperAnchor',
  inheritAttrs: false,
})

const props = defineProps<PopperAnchorProps>()

const popperAnchor = usePopperAnchor(convertPropsToHookProps(props))
</script>

<template>
  <Primitive v-if="!virtualRef" v-bind="normalizeAttrs(popperAnchor.attrs([$attrs]))">
    <slot />
  </Primitive>
</template>
