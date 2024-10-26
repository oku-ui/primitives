<script setup lang="ts">
import { onMounted, shallowRef } from 'vue'
import Copy from './Copy.vue'
import ScrollAreaStory from './ScrollAreaStory.vue'

const showContent = shallowRef(false)

onMounted(() => {
  setTimeout(() => {
    showContent.value = true
  }, 2000)
})
</script>

<template>
  <div>
    <h1>Always</h1>
    <ScrollAreaStory type="always" :style="{ width: '500px', height: '250px' }">
      <template v-if="showContent">
        <Copy v-for="(_, index) in 30" :key="index" />
      </template>
      <h1 v-else>
        Loading...
      </h1>
    </ScrollAreaStory>

    <h1>Hover</h1>
    <ScrollAreaStory type="hover" :style="{ width: '500px', height: '250px' }">
      <template v-if="showContent">
        <Copy v-for="(_, index) in 30" :key="index" />
      </template>
      <h1 v-else>
        Loading...
      </h1>
    </ScrollAreaStory>

    <h1>Scroll</h1>
    <ScrollAreaStory type="scroll" :style="{ width: '500px', height: '250px' }">
      <template v-if="showContent">
        <Copy v-for="(_, index) in 30" :key="index" />
      </template>
      <h1 v-else>
        Loading...
      </h1>
    </ScrollAreaStory>

    <h1>Auto</h1>
    <ScrollAreaStory type="auto" :style="{ width: '500px', height: '250px' }">
      <template v-if="showContent">
        <Copy v-for="(_, index) in 30" :key="index" />
      </template>
      <h1 v-else>
        Loading...
      </h1>
    </ScrollAreaStory>
  </div>
</template>
