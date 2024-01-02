<script setup lang="ts">
import { ref } from 'vue'
import { OkuToastProvider, OkuToastViewport } from '@oku-ui/toast'
import ToastWithProgress from './ToastWithProgress.vue'

const toastCount = ref(0)
</script>

<template>
  <OkuToastProvider>
    <button @click="toastCount++">
      Add toast
    </button>

    <ToastWithProgress v-for="(_, index) in toastCount" :key="index" />

    <OkuToastViewport class="toast-viewport" />
  </OkuToastProvider>
</template>
