<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { TabsTriggerDefaltProps, type TabsTriggerProps, useTabsTrigger } from './TabsTrigger.ts'

defineOptions({
  name: 'TabsTrigger',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<TabsTriggerProps>(), TabsTriggerDefaltProps)

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
  <Primitive v-bind="normalizeAttrs(tabsTrigger.attrs([$attrs, { as }]))">
    <slot />
  </Primitive>
</template>
