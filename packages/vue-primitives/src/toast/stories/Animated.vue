<script setup lang="ts">
import './styles.css'
import { type UnwrapRef, shallowRef } from 'vue'
import type { ToastProviderProps } from '../ToastProvider'
import { ToastClose, ToastDescription, ToastRoot, ToastViewport, useToastProvider } from '../index.ts'

type Directions = UnwrapRef<Required<ToastProviderProps>['swipeDirection']>

const open = shallowRef(false)
const swipeDirection = shallowRef<Directions>('right')
let timerRef = 0

function onClick() {
  open.value = false
  window.clearTimeout(timerRef)
  timerRef = window.setTimeout(() => {
    open.value = true
  }, 150)
}

function onChange(event: Event) {
  swipeDirection.value = (event.currentTarget as any)?.value as Directions
}

useToastProvider({
  swipeDirection,
  swipeThreshold() {
    return (['up', 'down'] as Directions[]).includes(swipeDirection.value) ? 25 : 50
  },
})
</script>

<template>
  <div>
    <button @click="onClick">
      Open
    </button>
    <!-- {/* eslint-disable-next-line jsx-a11y/no-onchange */} -->
    <select
      :value="swipeDirection"
      @change="onChange"
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
    <ToastRoot v-model:open="open" class="toast_rootClass toast_animatedRootClass">
      <ToastDescription>Swipe me {{ swipeDirection }}</ToastDescription>
      <ToastClose class="toast_buttonClass">
        Dismiss
      </ToastClose>
    </ToastRoot>
    <ToastViewport class="toast_viewportClass" />
  </div>
</template>
