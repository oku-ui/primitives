<script setup lang="ts" generic="T extends ToggleGroupType">
import { ToggleGroupRoot, type ToggleGroupType } from '../toggle-group/index.ts'
import { useToolbarContext } from './ToolbarRoot.ts'
import type { ToolbarToggleGroupProps } from './ToolbarToggleGroup.ts'

defineOptions({
  name: 'ToolbarToggleGroup',
})

const props = withDefaults(defineProps<ToolbarToggleGroupProps<T>>(), {
  loop: true,
})
const context = useToolbarContext('ToolbarToggleGroup')
</script>

<template>
  <ToggleGroupRoot
    :type="props.type"
    :loop="loop"
    :data-orientation="context.orientation()"
    :dir="context.dir.value"
    :roving-focus="false"
  >
    <slot />
  </ToggleGroupRoot>
</template>
