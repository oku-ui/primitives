<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { type MenuItemIndicatorProps, useMenuItemIndicator } from './MenuItemIndicator.ts'

defineOptions({
  name: 'MenuItemIndicator',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<MenuItemIndicatorProps>(), {
  as: 'span',
})

const indicatorContext = useMenuItemIndicator({
  forceMount: props.forceMount,
})
</script>

<template>
  <Primitive
    v-if="indicatorContext.isPresent.value"
    v-bind="normalizeAttrs(indicatorContext.attrs([$attrs, { as }]))"
  >
    <slot />
  </Primitive>
</template>
