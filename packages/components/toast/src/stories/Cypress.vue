<script setup lang="ts">
import { OkuToast, OkuToastAction, OkuToastClose, OkuToastDescription, OkuToastProvider, OkuToastTitle, OkuToastViewport } from '@oku-ui/toast'
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <OkuToastProvider>
    <button type="button" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md" @click="count++">
      Add toast
    </button>
    <div
      :style="{ display: 'flex', justifyContent: 'space-between', maxWidth: '700px', margin: 'auto' }"
    >
      <button type="button" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md">
        Focusable before viewport
      </button>

      <OkuToast
        v-for="(_, index) in count"
        :key="index"
        open
        class="toast"
        :data-testid="`toast-${index + 1}`"
      >
        <OkuToastTitle class="title">
          Toast {{ index + 1 }} title
        </OkuToastTitle>
        <OkuToastDescription class="description">
          Toast {{ index + 1 }} description
        </OkuToastDescription>

        <OkuToastClose class="button" aria-label="Close">
          Toast button {{ index + 1 }}.1
        </OkuToastClose>
        <OkuToastAction
          alt-text="Go and perform an action"
          class="button"
          :style="{ marginTop: '10px' }"
        >
          Toast button {{ index + 1 }}.2
        </OkuToastAction>
      </OkuToast>
      <OkuToastViewport class="viewport" />

      <button type="button" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md">
        Focusable after viewport
      </button>
    </div>
  </OkuToastProvider>
</template>

<style lang="postcss">
@import './toast.css'
</style>
