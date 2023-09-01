<script setup lang="ts">
import Styled from './Styled.vue'

export interface OkuToolbarProps {
  template: 'Styled' | 'Default'
  allshow?: boolean
}

withDefaults(defineProps<OkuToolbarProps>(), {
  template: 'Styled',
})
</script>

<template>
  <div class="cursor-default inline-block">
    <div v-if="template === 'Styled' || allshow" class="flex flex-col">
      <Styled />
    </div>
  </div>
</template>
