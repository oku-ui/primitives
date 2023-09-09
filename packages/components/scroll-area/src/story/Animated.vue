<script setup lang="ts">
import ScrollAreaStory from './ScrollAreaStory.vue'
</script>

<template>
  <ScrollAreaStory animated :style="{ width: '800px', height: '800px' }">
    <Copy v-for="(_, index) in 30" :key="index" />
  </ScrollAreaStory>
</template>
