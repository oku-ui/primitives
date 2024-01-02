<script setup lang="ts">
import Basic from './Basic.vue'

withDefaults(defineProps<IVisuallyHiddenProps>(), {})

export interface IVisuallyHiddenProps {
  template?: 'Basic'
  allshow?: boolean
}
</script>

<template>
  <div v-if="template === 'Basic' || allshow">
    <Basic />
  </div>
</template>
