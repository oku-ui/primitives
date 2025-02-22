<script setup lang="ts">
import type { PopoverAnchorProps } from './PopoverAnchor.ts'
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps, normalizeAttrs } from '../shared/index.ts'
import { usePopoverAnchor } from './PopoverAnchor.ts'

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
