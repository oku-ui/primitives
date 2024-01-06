<script setup lang="ts">
import { OkuToastProvider, OkuToastViewport } from '@oku-ui/toast'
import ToastUpgradeAvailable from './ToastUpgradeAvailable.vue'
</script>

<template>
  <OkuToastProvider>
    <ToastUpgradeAvailable open />
    <OkuToastViewport class="toast-viewport" />
  </OkuToastProvider>
</template>
