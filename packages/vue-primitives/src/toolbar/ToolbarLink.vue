<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { type ToolbarLinkProps, useToolbarLink } from './ToolbarLink.ts'

defineOptions({
  name: 'ToolbarLink',
  inheritAttrs: false,
})

withDefaults(defineProps<ToolbarLinkProps>(), {
  as: 'a',
})

const toolbarLink = useToolbarLink()
</script>

<template>
  <Primitive v-bind="normalizeAttrs(toolbarLink.attrs([$attrs, { as }]))">
    <slot />
  </Primitive>
</template>
