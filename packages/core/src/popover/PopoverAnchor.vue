<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps, normalizeAttrs } from '../shared/index.ts'
import { type PopoverAnchorProps, usePopoverAnchor } from './PopoverAnchor.ts'

defineOptions({
  name: 'PopoverAnchor',
  inheritAttrs: false,
})

const props = defineProps<PopoverAnchorProps>()

const popoverAnchor = usePopoverAnchor(convertPropsToHookProps(props))
</script>

<template>
  <Primitive v-if="!virtualRef" v-bind="normalizeAttrs(popoverAnchor.attrs([$attrs]))">
    <slot />
  </Primitive>
</template>
