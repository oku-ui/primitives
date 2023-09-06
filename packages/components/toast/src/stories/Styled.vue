<script setup lang="ts">
import { OkuToastProvider, OkuToastViewport } from '@oku-ui/toast'
import ToastUpgradeAvailable from './ToastUpgradeAvailable.vue'
</script>

<template>
  <OkuToastProvider>
    <ToastUpgradeAvailable open />
    <OkuToastViewport class="viewport" />
  </OkuToastProvider>
</template>

<style lang="postcss">
@import './toast.css'
</style>
