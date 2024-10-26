<script setup lang="ts">
import { shallowRef } from 'vue'
import { ToastDescription, ToastRoot } from '../index.ts'

const paused = shallowRef(false)
const duration = 3000

function onPause() {
  paused.value = true
}

function onResume() {
  paused.value = false
}
</script>

<template>
  <ToastRoot class="toast_rootClass" :duration="duration" @pause="onPause" @resume="onResume">
    <ToastDescription class="toast_descriptionClass">
      Successfully saved
    </ToastDescription>
    <div class="toast_progressBarClass">
      <div
        class="toast_progressBarInnerClass"
        :style="{
          animationDuration: `${duration - 100}ms`,
          animationPlayState: paused ? 'paused' : 'running',
        }"
      />
    </div>
  </ToastRoot>
</template>
