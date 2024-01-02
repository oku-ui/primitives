<script setup lang="ts">
import { ref } from 'vue'
import { OkuToast, OkuToastClose, OkuToastDescription, OkuToastProvider, OkuToastViewport } from '@oku-ui/toast'
import type { ToastProviderProps } from '@oku-ui/toast'

type Direction = ToastProviderProps['swipeDirection']

const open = ref(false)
const swipeDirection = ref<Direction>('right')
const timerRef = ref(0)

function handelAnimatedOpen() {
  open.value = false
  window.clearTimeout(timerRef.value)
  timerRef.value = window.setTimeout(() => open.value = true, 150)
  // eslint-disable-next-line no-console
  console.log(open.value)
}
</script>

<template>
  <OkuToastProvider
    :swipe-direction="swipeDirection"
    :swipe-threshold="(['up', 'down'] as Direction[]).includes(swipeDirection) ? 25 : undefined"
  >
    <button @click="handelAnimatedOpen">
      Open
    </button>

    <select
      :value="swipeDirection"
      @change="(event: any) => swipeDirection = (event.currentTarget.value as Direction)"
    >
      <option value="right">
        Slide right
      </option>
      <option value="left">
        Slide left
      </option>
      <option value="up">
        Slide up
      </option>
      <option value="down">
        Slide down
      </option>
    </select>
    <!-- <OkuToast v-model="open" class="toast-animated toast"> -->
    <OkuToast :open="open" class="toast-animated toast" @open-change="open = $event">
      <OkuToastDescription>Swipe me {{ swipeDirection }}</OkuToastDescription>
      <OkuToastClose class="toast-button">
        Dismiss
      </OkuToastClose>
    </OkuToast>
    <OkuToastViewport class="toast-viewport" />
  </OkuToastProvider>
</template>
