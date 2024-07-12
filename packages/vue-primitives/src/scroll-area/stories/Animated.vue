<script setup lang="ts">
import ScrollAreaStory from './ScrollAreaStory.vue'
import Copy from './Copy.vue'
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
