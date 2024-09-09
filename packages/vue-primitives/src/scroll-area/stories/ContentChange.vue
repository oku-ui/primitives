<script setup lang="ts">
import { shallowRef } from 'vue'
import Copy from './Copy.vue'
import ScrollAreaStory from './ScrollAreaStory.vue'

const verticalCount = shallowRef(1)
const horizontalCount = shallowRef(1)

function addVerticalContent() {
  verticalCount.value += 1
}

function addHorizontalContent() {
  horizontalCount.value += 1
}
</script>

<template>
  <div>
    <button @click="addVerticalContent">
      Add vertical content
    </button>
    <button @click="addHorizontalContent">
      Increase horizontal size
    </button>
    <ScrollAreaStory
      type="always"
      :style="{
        width: '500px',
        height: '500px',
      }"
    >
      <Copy v-for="(_, index) in verticalCount" :key="index" :style="{ width: `${300 * horizontalCount}px` }" />
    </ScrollAreaStory>
  </div>
</template>
