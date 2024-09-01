<script setup lang="ts">
import './styles.css'
import { ToastViewport, useToastProvider } from '../index.ts'
import ToastUpgradeAvailable from './ToastUpgradeAvailable.vue'

useToastProvider()
</script>

<template>
  <div class="toast_box">
    <input type="text">

    <div>
      <ToastUpgradeAvailable />
      <ToastViewport class="toast_viewportClass" />
    </div>

    <input type="text">
  </div>
</template>
