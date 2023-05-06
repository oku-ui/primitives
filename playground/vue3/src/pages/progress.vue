<script setup lang="ts">
import { OkuProgress, OkuProgressIndicator } from '@oku-ui/progress'
import { onMounted, onUnmounted, ref } from 'vue'

const value = ref(13)

function startTimer() {
  return setTimeout(() => {
    value.value = 66
  }, 500)
}
let timer: any = null

onMounted(() => {
  timer = startTimer()
})

onUnmounted(() => {
  clearTimeout(timer)
})
</script>

<template>
  <OkuProgress class="ProgressRoot" :value="value">
    <OkuProgressIndicator class="ProgressIndicator" :style="{ transform: `translateX(-${100 - value}%)` }" />
  </OkuProgress>
</template>

<style>
.ProgressRoot {
  position: relative;
  overflow: hidden;
  background: #c8cdd4;
  border-radius: 99999px;
  width: 300px;
  height: 25px;

  /* Fix overflow clipping in Safari */
  /* https://gist.github.com/domske/b66047671c780a238b51c51ffde8d3a0 */
  transform: translateZ(0);
}

.ProgressIndicator {
  background-color: #528ab3;
  width: 100%;
  height: 100%;
  transition: transform 660ms cubic-bezier(0.65, 0, 0.35, 1);
}
</style>
