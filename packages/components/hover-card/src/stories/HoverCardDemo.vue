<script setup lang="ts">
import Basic from './Basic.vue'

export interface OkuHoverCardProps {
  template: 'basic' | 'contain-text-selection'
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
</template>
