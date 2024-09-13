<script setup lang="ts" generic="T extends ToggleGroupType">
import type { ToolbarToggleGroupProps } from './ToolbarToggleGroup.ts'
import { ToggleGroupRoot, type ToggleGroupType } from '../toggle-group/index.ts'
import { useToolbarContext } from './ToolbarRoot.ts'

defineOptions({
  name: 'ToolbarToggleGroup',
})

withDefaults(defineProps<ToolbarToggleGroupProps<T>>(), {
  loop: true,
})
const context = useToolbarContext('ToolbarToggleGroup')
</script>

<template>
  <ToggleGroupRoot
    :type="type"
    :loop="loop"
    :data-orientation="context.orientation()"
    :dir="context.dir.value"
    :roving-focus="false"
  >
    <slot />
  </ToggleGroupRoot>
</template>
