<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { type TabsContentProps, useTabsContent } from './TabsContent.ts'

defineOptions({
  name: 'TabsContent',
  inheritAttrs: false,
})

const props = defineProps<TabsContentProps>()

const tabsContent = useTabsContent({
  value() {
    return props.value
  },
  forceMount: props.forceMount,
})
</script>

<template>
  <Primitive v-bind="normalizeAttrs(tabsContent.attrs(), $attrs)">
    <slot v-if="tabsContent.isPresent.value" />
  </Primitive>
</template>
