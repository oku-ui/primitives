<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/mergeProps.ts'
import { type TabsListProps, useTabsList } from './TabsList.ts'

defineOptions({
  name: 'TabsList',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<TabsListProps>(), {
  loop: true,
})

const tabsList = useTabsList({
  loop: props.loop,
})
</script>

<template>
  <Primitive v-bind="normalizeAttrs(tabsList.attrs(), $attrs)">
    <slot />
  </Primitive>
</template>
