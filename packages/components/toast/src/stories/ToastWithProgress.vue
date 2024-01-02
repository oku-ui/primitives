<script setup lang="ts">
import { ref } from 'vue'
import { OkuToast, OkuToastDescription } from '@oku-ui/toast'

const paused = ref(false)
const duration = ref(3000)
</script>

<template>
  <OkuToast
    class="toast"
    :duration="duration"
    @pause="paused = true"
    @resume="paused = false"
  >
    <OkuToastDescription>Successfully saved</OkuToastDescription>
    <div class="toast-progress-bar">
      <div
        class="toast-progress-bar-inner"
        :style="{
          animationDuration: `${duration - 100}ms`,
          animationPlayState: paused ? 'paused' : 'running',
        }"
      />
    </div>
  </OkuToast>
</template>
