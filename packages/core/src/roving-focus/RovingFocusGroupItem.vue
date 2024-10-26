<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps, normalizeAttrs } from '../shared/index.ts'
import { DEFAULT_ROVING_FOCUS_GROUP_ITEM_PROPS, type RovingFocusGroupItemProps, useRovingFocusGroupItem } from './RovingFocusGroupItem.ts'

defineOptions({
  name: 'RovingFocusGroupItem',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<RovingFocusGroupItemProps>(), DEFAULT_ROVING_FOCUS_GROUP_ITEM_PROPS)

const rovingFocusGroupItem = useRovingFocusGroupItem(convertPropsToHookProps(props, ['tabStopId', 'active', 'focusable']))
</script>

<template>
  <Primitive v-bind="normalizeAttrs(rovingFocusGroupItem.attrs([$attrs, { as }]))">
    <slot />
  </Primitive>
</template>
