<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps, normalizeAttrs } from '../shared/index.ts'
import { DEFAULT_TOGGLE_GROUP_ITEM_PROPS, type ToggleGroupItemProps, useToggleGroupItem } from './ToggleGroupItem.ts'

defineOptions({
  name: 'ToggleGroupItem',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ToggleGroupItemProps>(), DEFAULT_TOGGLE_GROUP_ITEM_PROPS)

const toggleGroupItem = useToggleGroupItem(convertPropsToHookProps(
  props,
  ['value', 'disabled'],
))
</script>

<template>
  <Primitive v-bind="normalizeAttrs(toggleGroupItem.attrs([$attrs, { as }]))">
    <slot />
  </Primitive>
</template>
