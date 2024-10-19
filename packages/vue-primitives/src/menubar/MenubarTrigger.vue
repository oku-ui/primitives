<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { type MenubarTriggerProps, useMenubarTrigger } from './MenubarTrigger.ts'

defineOptions({
  name: 'MenubarTrigger',
})

const props = withDefaults(defineProps<MenubarTriggerProps>(), {
  as: 'button',
  disabled: undefined,
})

const menubarTrigger = useMenubarTrigger({
  disabled() {
    return props.disabled
  },
})
</script>

<template>
  <Primitive v-bind="normalizeAttrs(menubarTrigger.attrs([$attrs, { as }]))">
    <slot />
  </Primitive>
</template>
