<script setup lang="ts">
import { ref } from 'vue'
import { OkuToast, OkuToastDescription, OkuToastProvider, OkuToastViewport } from '@oku-ui/toast'

const toastOneCount = ref(0)
const toastTwoCount = ref(0)
</script>

<template>
  <OkuToastProvider>
    <button @click="toastOneCount++">
      Open toast one
    </button>
    <button @click="toastTwoCount++">
      Open toast two
    </button>

    <OkuToast v-if="toastOneCount > 0" :key="`one-${String(toastOneCount)}`" class="toast">
      <OkuToastDescription>Toast one</OkuToastDescription>
    </OkuToast>

    <OkuToast v-if="toastTwoCount > 0" :key="`two-${String(toastTwoCount)}`" class="toast">
      <OkuToastDescription>Toast two</OkuToastDescription>
    </OkuToast>

    <OkuToastViewport class="toast-viewport" />
  </OkuToastProvider>
</template>
