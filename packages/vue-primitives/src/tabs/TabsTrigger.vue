<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { type TabsTriggerProps, useTabsTrigger } from './TabsTrigger.ts'

defineOptions({
  name: 'TabsTrigger',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<TabsTriggerProps>(), {
  as: 'button',
  disabled: undefined,
})

const tabsTrigger = useTabsTrigger({
  value() {
    return props.value
  },
  disabled() {
    return props.disabled
  },
})
</script>

<template>
  <Primitive :as="as" v-bind="normalizeAttrs(tabsTrigger.attrs(), $attrs)">
    <slot />
  </Primitive>
</template>
