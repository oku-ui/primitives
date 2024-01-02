<script setup lang="ts">
import { ref } from 'vue'
import { OkuToast, OkuToastAction, OkuToastClose, OkuToastDescription, OkuToastProvider, OkuToastTitle, OkuToastViewport } from '@oku-ui/toast'

const count = ref(0)
</script>

<template>
  <OkuToastProvider>
    <button @click="count++">
      Add toast
    </button>
    <div
      :style="{ display: 'flex', justifyContent: 'space-between', maxWidth: '700px', margin: 'auto' }"
    >
      <button>Focusable before toast-viewport</button>

      <OkuToast
        v-for="(_, index) in count"
        :key="index"
        open
        class="toast"
        :data-testid="`toast-${index + 1}`"
      >
        <OkuToastTitle class="toast-title">
          Toast {{ index + 1 }} title
        </OkuToastTitle>
        <OkuToastDescription class="toast-description">
          Toast {{ index + 1 }} description
        </OkuToastDescription>

        <OkuToastClose class="toast-button" aria-label="Close">
          Toast button {{ index + 1 }}.1
        </OkuToastClose>
        <OkuToastAction
          alt-text="Go and perform an action"
          class="toast-button"
          :style="{ marginTop: '10px' }"
        >
          Toast button {{ index + 1 }}.2
        </OkuToastAction>
      </OkuToast>
      <OkuToastViewport class="toast-viewport" />

      <button>Focusable after toast-viewport</button>
    </div>
  </OkuToastProvider>
</template>
