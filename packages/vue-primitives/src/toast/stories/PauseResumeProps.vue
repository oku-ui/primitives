<script setup lang="ts">
import './styles.css'
import { shallowRef } from 'vue'
import { ToastViewport, useToastProvider } from '../index.ts'
import ToastWithProgress from './ToastWithProgress.vue'

const toastCount = shallowRef(0)

useToastProvider()
</script>

<template>
  <div>
    <button @click="() => toastCount += 1">
      Add toast
    </button>

    <ToastWithProgress v-for="n in toastCount" :key="n" />

    <ToastViewport class="toast_viewportClass" />
  </div>
</template>
