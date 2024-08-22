<script setup lang="ts">
import { Separator } from '../separator/index.ts'
import { useToolbarContext } from './Toolbar.ts'
import type { ToolbarSeparatorProps } from './ToolbarSeparator.ts'

defineOptions({
  name: 'ToolbarSeparator',
})

withDefaults(defineProps<ToolbarSeparatorProps>(), {
  decorative: undefined,
})

const context = useToolbarContext('ToolbarSeparator')
</script>

<template>
  <Separator
    :as="as"
    :as-child="asChild"
    :orientation="context.orientation()"
    :decorative="decorative"
  >
    <slot />
  </Separator>
</template>
