<script setup lang="ts">
import './styles.css'
import { shallowRef } from 'vue'
import { ToastDescription, ToastRoot, ToastViewport, useToastProvider } from '../index.ts'

const toastOneCount = shallowRef(0)
const toastTwoCount = shallowRef(0)

useToastProvider()
</script>

<template>
  <div>
    <button @click="() => toastOneCount += 1">
      Open toast one
    </button>
    <button @click="() => toastTwoCount += 1">
      Open toast two
    </button>

    <ToastRoot v-if="toastOneCount > 0" :key="`one-${String(toastOneCount)}`" class="toast_rootClass">
      <ToastDescription>Toast one</ToastDescription>
    </ToastRoot>

    <ToastRoot v-if="toastTwoCount > 0" :key="`two-${String(toastTwoCount)}`" class="toast_rootClass">
      <ToastDescription>Toast two</ToastDescription>
    </ToastRoot>

    <ToastViewport class="toast_viewportClass" />
  </div>
</template>
