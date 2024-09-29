<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { type RovingFocusGroupItemProps, useRovingFocusGroupItem } from './RovingFocusGroupItem.ts'

defineOptions({
  name: 'RovingFocusGroupItem',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<RovingFocusGroupItemProps>(), {
  focusable: true,
  active: false,
  as: 'span',
})

const rovingFocusGroupItem = useRovingFocusGroupItem({
  focusable() {
    return props.focusable
  },
  active() {
    return props.active
  },
  tabStopId() {
    return props.tabStopId
  },
})
</script>

<template>
  <Primitive v-bind="normalizeAttrs(rovingFocusGroupItem.attrs([{ as }]), $attrs)">
    <slot />
  </Primitive>
</template>
