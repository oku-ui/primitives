<script setup lang="ts">
import { OkuToast, OkuToastDescription, OkuToastProvider, OkuToastViewport } from '@oku-ui/toast'
import { ref } from 'vue'

const toastOneCount = ref(0)
const toastTwoCount = ref(0)
</script>

<template>
  <OkuToastProvider>
    <button type="button" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md" @click="toastOneCount++">
      Open toast one
    </button>
    <button type="button" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md" @click="toastTwoCount++">
      Open toast two
    </button>

    <OkuToast v-if="toastOneCount > 0" :key="`one-${String(toastOneCount)}`" class="toast">
      <OkuToastDescription>Toast one</OkuToastDescription>
    </OkuToast>

    <OkuToast v-if="toastTwoCount > 0" :key="`two-${String(toastTwoCount)}`" class="toast">
      <OkuToastDescription>Toast two</OkuToastDescription>
    </OkuToast>

    <OkuToastViewport class="viewport" />
  </OkuToastProvider>
</template>
