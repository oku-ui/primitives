<script setup lang="ts">
import './styles.css'
import { shallowRef } from 'vue'
import { ToastClose, ToastDescription, ToastRoot, ToastViewport, useToastProvider } from '../index.ts'

const count = shallowRef(0)

useToastProvider()
</script>

<template>
  <div>
    <button @click="() => count += 1">
      Add toast
    </button>
    <div
      :style="{ display: 'flex', justifyContent: 'space-between', maxWidth: '700px', margin: 'auto' }"
    >
      <button>Focusable before viewport</button>

      <ToastRoot
        v-for="index in count"
        :key="index"
        open
        class="toast_rootClass"
        :data-testid="`toast-${index}`"
      >
        <ToastTitle class="toast_titleClass">
          Toast {{ index }} title
        </ToastTitle>
        <ToastDescription class="toast_descriptionClass">
          Toast {{ index }} description
        </ToastDescription>

        <ToastClose class="toast_buttonClass" aria-label="Close">
          Toast button {{ index }}.1
        </ToastClose>
        <ToastAction
          alt-text="Go and perform an action"
          class="toast_buttonClass"
          :style="{ marginTop: '10px' }"
        >
          Toast button {{ index }}.2
        </ToastAction>
      </ToastRoot>

      <ToastViewport class="toast_viewportClass" />

      <button>Focusable after viewport</button>
    </div>
  </div>
</template>
