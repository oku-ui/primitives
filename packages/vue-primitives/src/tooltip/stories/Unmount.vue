<script setup lang="ts">
import { shallowRef } from 'vue'
import { TooltipTrigger, useTooltipProvider } from '../index.ts'
import SimpleTooltip from './SimpleTooltip.vue'
import './styles.css'

useTooltipProvider()

const isMounted = shallowRef(true)

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    isMounted.value = false
  }
}
</script>

<template>
  <div>
    <ul>
      <li>Focus the first button (tooltip 1 shows)</li>
      <li>Focus the second button (tooltip 2 shows)</li>
      <li>Press escape (second button unmounts)</li>
      <li>Focus the first button (tooltip 1 should still show)</li>
    </ul>
    <SimpleTooltip label="tooltip 1">
      <TooltipTrigger :style="{ alignSelf: 'flex-start', margin: '0vmin' }">
        Tool 1
      </TooltipTrigger>
    </SimpleTooltip>

    <SimpleTooltip v-if="isMounted" label="tooltip 2">
      <TooltipTrigger
        :style="{ alignSelf: 'flex-start', margin: '0vmin' }"
        @keydown="onKeydown"
      >
        Tool 2
      </TooltipTrigger>
    </SimpleTooltip>
  </div>
</template>
