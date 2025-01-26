<script setup lang="ts">
import type { ToolbarLinkProps } from './ToolbarLink.ts'
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { DEFAULT_TOOLBAR_LINK_PROPS, useToolbarLink } from './ToolbarLink.ts'

defineOptions({
  name: 'ToolbarLink',
  inheritAttrs: false,
})

withDefaults(defineProps<ToolbarLinkProps>(), DEFAULT_TOOLBAR_LINK_PROPS)

const toolbarLink = useToolbarLink()
</script>

<template>
  <Primitive v-bind="normalizeAttrs(toolbarLink.attrs([$attrs, { as }]))">
    <slot />
  </Primitive>
</template>
