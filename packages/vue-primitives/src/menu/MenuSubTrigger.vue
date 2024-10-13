<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { type MenuSubTriggerProps, useMenuSubTrigger } from './MenuSubTrigger.ts'

defineOptions({
  name: 'MenuSubTrigger',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<MenuSubTriggerProps>(), {
  disabled: false,
})

const menuSubTrigger = useMenuSubTrigger({
  disabled() {
    return props.disabled
  },
  textValue: props.textValue,
})
</script>

<template>
  <Primitive v-bind="normalizeAttrs(menuSubTrigger.attrs([$attrs]))">
    <slot />
  </Primitive>
</template>
