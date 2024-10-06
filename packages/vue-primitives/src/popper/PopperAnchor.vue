<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/mergeProps.ts'
import { type PopperAnchorProps, usePopperAnchor } from './PopperAnchor.ts'

defineOptions({
  name: 'PopperAnchor',
  inheritAttrs: false,
})

const props = defineProps<PopperAnchorProps>()

const popperAnchor = usePopperAnchor({
  virtualRef: props.virtualRef,
})
</script>

<template>
  <Primitive v-if="!virtualRef" v-bind="normalizeAttrs(popperAnchor.attrs([$attrs]))">
    <slot />
  </Primitive>
</template>
