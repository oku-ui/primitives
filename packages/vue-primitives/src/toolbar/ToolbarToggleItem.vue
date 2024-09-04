<script setup lang="ts">
import { ToggleGroupItem } from '../toggle-group/index.ts'
import ToolbarButton from './ToolbarButton.vue'
import type { ToolbarToggleItemProps } from './ToolbarToggleItem.ts'

defineOptions({
  name: 'ToolbarToggleItem',
  inheritAttrs: false,
})
defineProps<ToolbarToggleItemProps>()
</script>

<template>
  <ToolbarButton as="template">
    <ToggleGroupItem
      :value="value"
      v-bind="$attrs"
    >
      <slot />
    </ToggleGroupItem>
  </ToolbarButton>
</template>
