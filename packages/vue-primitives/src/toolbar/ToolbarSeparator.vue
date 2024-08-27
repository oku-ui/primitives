<script setup lang="ts">
import { Separator } from '../separator/index.ts'
import { useToolbarContext } from './ToolbarRoot.ts'

defineOptions({
  name: 'ToolbarSeparator',
})

const context = useToolbarContext('ToolbarSeparator')
</script>

<template>
  <Separator
    :orientation="context.orientation() === 'horizontal' ? 'vertical' : 'horizontal'"
  >
    <slot />
  </Separator>
</template>
