<script setup lang="ts">
import Copy from './Copy.vue'
import ScrollAreaStory from './ScrollAreaStory.vue'
</script>

<template>
  <div>
    <ScrollAreaStory
      animated
      :style="{
        width: '500px',
        height: '500px',
      }"
    >
      <Copy v-for="(_, index) in 30" :key="index" />
    </ScrollAreaStory>
  </div>
</template>
