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
        Focusable before toast_viewport
      </button>

      <OkuToast
        v-for="(_, index) in count"
        :key="index"
        open
        class="toast_toastClass"
        :data-testid="`toast-${index + 1}`"
      >
        <OkuToastTitle class="toast_titleClass">
          Toast {{ index + 1 }} title
        </OkuToastTitle>
        <OkuToastDescription class="toast_descriptionClass">
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
      <OkuToastViewport class="toast_viewport" />

      <button type="button" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md">
        Focusable after toast_viewport
      </button>
    </div>
  </OkuToastProvider>
</template>
