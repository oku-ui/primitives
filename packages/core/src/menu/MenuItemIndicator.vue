<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps, normalizeAttrs } from '../shared/index.ts'
import { DEFAULT_MENU_ITEM_INDICATOR_PROPS, type MenuItemIndicatorProps, useMenuItemIndicator } from './MenuItemIndicator.ts'

defineOptions({
  name: 'MenuItemIndicator',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<MenuItemIndicatorProps>(), DEFAULT_MENU_ITEM_INDICATOR_PROPS)

const indicatorContext = useMenuItemIndicator(convertPropsToHookProps(props))
</script>

<template>
  <Primitive
    v-if="indicatorContext.isPresent.value"
    v-bind="normalizeAttrs(indicatorContext.attrs([$attrs, { as }]))"
  >
    <slot />
  </Primitive>
</template>
