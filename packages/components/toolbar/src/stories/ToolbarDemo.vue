<script setup lang="ts">
import Styled from './Styled.vue'
import Chromatic from './Chromatic.vue'

export interface OkuToolbarProps {
  template: 'Styled' | 'Chromatic'
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
    <div v-if="template === 'Chromatic' || allshow" class="flex flex-col">
      <Chromatic />
    </div>
  </div>
</template>
