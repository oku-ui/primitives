<script setup lang="ts">
import { ref } from 'vue'
import ScrollAreaStory from './ScrollAreaStory.vue'
import Copy from './Copy.vue'

const verticalCount = ref(1)
const horizontalCount = ref(1)
</script>

<template>
  <button @click="verticalCount++">
    Add vertical content
  </button>
  <button @click="horizontalCount++">
    Increase horizontal size
  </button>
  <ScrollAreaStory type="always" :style="{ width: 800, height: 800 }">
    <Copy v-for="(_, index) in verticalCount" :key="index" :style="{ width: `${300 * horizontalCount}px` }" />
  </ScrollAreaStory>
</template>
