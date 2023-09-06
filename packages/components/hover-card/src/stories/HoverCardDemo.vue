<script setup lang="ts">
import Basic from './Basic.vue'
import ContainTextSelection from './ContainTextSelection.vue'

export interface OkuHoverCardProps {
  template: 'basic' | 'ContainTextSelection'
  allshow?: boolean
}

withDefaults(defineProps<OkuHoverCardProps>(), {
  template: 'basic',
})
</script>

<template>
  <div v-if="template === 'basic' || allshow" class="flex flex-col justify-center">
    <Basic />
  </div>
  <div v-if="template === 'ContainTextSelection' || allshow" class="flex flex-col justify-center">
    <ContainTextSelection />
  </div>
</template>
