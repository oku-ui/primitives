<script setup lang="ts">
import { OkuToast, OkuToastDescription } from '@oku-ui/toast'
import { ref } from 'vue'

const paused = ref(false)
const duration = ref(3000)
</script>

<template>
  <OkuToast
    class="toast-toast"
    :duration="duration"
    @pause="paused = true"
    @resume="paused = false"
  >
    <OkuToastDescription>Successfully saved</OkuToastDescription>
    <div class="progress-bar">
      <div
        class="progress-bar-inner"
        :style="{
          animationDuration: `${duration - 100}ms`,
          animationPlayState: paused ? 'paused' : 'running',
        }"
      />
    </div>
  </OkuToast>
</template>

<style scoped>
.progress-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  overflow: hidden;
  background-color: #ccc;
}

@keyframes loading {
  from {
    transform: translateX(-100%);
  }
  to {
     transform: translateX(0%);
  }
}

.progress-bar-inner {
  height: 100%;
  background-color: green;
  animation-name: loading;
  animation-timing-function: linear;
}
</style>
