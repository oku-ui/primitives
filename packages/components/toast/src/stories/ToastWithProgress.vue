<script setup lang="ts">
import { OkuToast, OkuToastDescription } from '@oku-ui/toast'
import { ref } from 'vue'

const paused = ref(false)
const duration = ref(3000)
</script>

<template>
  <OkuToast
    class="toast"
    :duration="duration"
    @on-pause="paused = true"
    @on-resume="paused = false"
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
