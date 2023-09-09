<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { DYNAMIC_CONTENT_DELAY } from './ScrollArea.stories'
import ScrollAreaStory from './ScrollAreaStory.vue'
import Copy from './Copy.vue'

const showContent = ref(false)

onMounted(() => {
  setTimeout(() => {
    showContent.value = true
  }, DYNAMIC_CONTENT_DELAY)
})
</script>

<template>
  <h1>Always</h1>
  <ScrollAreaStory type="always" :style="{ width: '500px', height: '250px' }">
    <template v-if="showContent">
      <Copy v-for="(_, index) in 30" :key="index" />
    </template>
    <template v-else>
      <h1>Loading...</h1>
    </template>
  </ScrollAreaStory>

  <h1>Hover</h1>
  <ScrollAreaStory type="'hover'" :style="{ width: '500px', height: '250px' }">
    <template v-if="showContent">
      <Copy v-for="(_, index) in 30" :key="index" />
    </template>
    <template v-else>
      <h1>Loading...</h1>
    </template>
  </ScrollAreaStory>

  <h1>Scroll</h1>
  <ScrollAreaStory type="scroll" :style="{ width: '500px', height: '250px' }">
    <template v-if="showContent">
      <Copy v-for="(_, index) in 30" :key="index" />
    </template>
    <template v-else>
      <h1>Loading...</h1>
    </template>
  </ScrollAreaStory>

  <h1>Auto</h1>
  <ScrollAreaStory type="'auto'" :style="{ width: '500px', height: '250px' }">
    <template v-if="showContent">
      <Copy v-for="(_, index) in 30" :key="index" />
    </template>
    <template v-else>
      <h1>Loading...</h1>
    </template>
  </ScrollAreaStory>
</template>
