<script setup lang="ts">
import Styled from './Styled.vue'
import CustomRatios from './CustomRatios.vue'
import Chromatic from './Chromatic.vue'

withDefaults(defineProps<IAspectRatioProps>(), {})

export interface IAspectRatioProps {
  template?: 'Styled' | 'CustomRatios' | 'Chromatic'
  allshow?: boolean
}
</script>

<template>
  <div>
    <template v-if="template === 'Styled' || allshow">
      <Styled />
    </template>

    <template v-if="template === 'CustomRatios' || allshow">
      <CustomRatios />
    </template>

    <template v-if="template === 'Chromatic' || allshow">
      <Chromatic />
    </template>
  </div>
</template>

<style>
.aspect-ratio-root {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: crimson;
  color: white;
}
</style>
