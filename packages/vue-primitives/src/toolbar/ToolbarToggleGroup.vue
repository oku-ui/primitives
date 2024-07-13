<script setup lang="ts" generic="T extends ToggleGroupType">
import { ToggleGroup, type ToggleGroupType } from '../toggle-group/index.ts'
import { useToolbarContext } from './Toolbar.ts'
import type { ToolbarToggleGroupProps } from './ToolbarToggleGroup.ts'

defineOptions({
  name: 'ToolbarToggleGroup',
})

const props = withDefaults(defineProps<ToolbarToggleGroupProps<T>>(), {
  disabled: false,
  loop: true,
})
const context = useToolbarContext('ToolbarToggleGroup')
</script>

<template>
  <ToggleGroup
    v-bind="props"
    :data-orientation="context.orientation()"
    :dir="context.dir.value"
    :roving-focus="false"
  >
    <slot />
  </ToggleGroup>
</template>
