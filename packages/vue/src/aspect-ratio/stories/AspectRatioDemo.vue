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
  <Styled v-if="template === 'Styled' || allshow" />

  <CustomRatios v-if="template === 'CustomRatios' || allshow" />

  <Chromatic v-if="template === 'Chromatic' || allshow" />
</template>

<style>
.aspect-ratio {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: crimson;
  color: white;
}
</style>
