<script setup lang="ts">
import { OkuToastProvider, OkuToastViewport } from '@oku-ui/toast'
import { ref } from 'vue'
import ToastWithProgress from './ToastWithProgress.vue'

const toastCount = ref(0)
</script>

<template>
  <OkuToastProvider>
    <button type="button" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md" @click="toastCount++">
      Add toast
    </button>

    <ToastWithProgress v-for="(_, index) in toastCount" :key="index" />

    <OkuToastViewport class="toast-viewport" />
  </OkuToastProvider>
</template>
