<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { type TabsRootEmits, type TabsRootProps, useTabsRoot } from './TabsRoot.ts'

defineOptions({
  name: 'TabsRoot',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<TabsRootProps>(), {
  orientation: 'horizontal',
  activationMode: 'automatic',
})

const emit = defineEmits<TabsRootEmits>()

const tabsRoot = useTabsRoot({
  value() {
    return props.value
  },
  onUpdateValue(value) {
    emit('update:value', value)
  },
  defaultValue: props.defaultValue,
  orientation: props.orientation,
  dir() {
    return props.dir
  },
  activationMode: props.activationMode,
})
</script>

<template>
  <Primitive v-bind="normalizeAttrs(tabsRoot.attrs(), $attrs)">
    <slot />
  </Primitive>
</template>
