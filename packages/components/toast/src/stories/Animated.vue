<script setup lang="ts">
import { OkuToast, OkuToastClose, OkuToastDescription, OkuToastProvider, OkuToastViewport } from '@oku-ui/toast'
import type { ToastProviderProps } from '@oku-ui/toast'
import { ref } from 'vue'

type Direction = ToastProviderProps['swipeDirection']

const swipeDirection = ref<Direction>('right')
const timerRef = ref(0)
const open = ref(false)

function handelAnimatedOpen() {
  open.value = false
  window.clearTimeout(timerRef.value)
  timerRef.value = window.setTimeout(() => open.value = true, 150)
}
</script>

<template>
  <OkuToastProvider
    :swipe-direction="swipeDirection"
    :swipe-threshold="(['up', 'down'] as Direction[]).includes(swipeDirection) ? 25 : undefined"
  >
    <button
      type="button"
      class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md"
      @click="handelAnimatedOpen"
    >
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
    <OkuToast v-model="open" class="animatedRootClass">
      <OkuToastDescription>Swipe me {{ swipeDirection }}</OkuToastDescription>
      <OkuToastClose class="buttonClass">
        Dismiss
      </OkuToastClose>
    </OkuToast>
    <OkuToastViewport class="toast_viewport" />
  </OkuToastProvider>
</template>
