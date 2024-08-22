<script setup lang="ts">
import { useAttrs } from 'vue'
import { ToggleGroupItem } from '../toggle-group/index.ts'
import ToolbarButton from './ToolbarButton.vue'
import type { ToolbarToggleItemProps } from './ToolbarToggleItem.ts'

defineOptions({
  name: 'ToolbarToggleItem',
  inheritAttrs: false,
})
withDefaults(defineProps<ToolbarToggleItemProps>(), {
  disabled: undefined,
})
const attrs = useAttrs()
</script>

<template>
  <ToolbarButton
    as-child
  >
    <ToggleGroupItem
      :as="as"
      :as-child="asChild"
      :pressed="pressed"
      :value="value"
      :disabled="disabled"
      v-bind="attrs"
    >
      <slot />
    </ToggleGroupItem>
  </ToolbarButton>
</template>
