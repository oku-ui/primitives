<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { OkuToast, OkuToastAction, OkuToastDescription, OkuToastProvider, OkuToastViewport } from '@oku-ui/toast'
import { isClient } from '@oku-ui/use-composable'
import ToastUpgradeAvailable from './ToastUpgradeAvailable.vue'
import ToastSubscribeSuccess from './ToastSubscribeSuccess.vue'

const hasUpgrade = ref(false)
const isSubscribed = ref(false)
const savedCount = ref(0)
const errorCount = ref(0)

watchEffect((onInvalidate) => {
  if (!isClient)
    return
  if (!hasUpgrade.value) {
    const timer = window.setTimeout(() => hasUpgrade.value = true, 10000)

    onInvalidate(() => window.clearTimeout(timer))
  }
})
</script>

<template>
  <OkuToastProvider>
    <button @click="isSubscribed = true">
      subscribe
    </button>
    <button @click="errorCount++">
      error
    </button>
    <button @click="savedCount++">
      save
    </button>
    <ToastUpgradeAvailable :open="hasUpgrade" @open-change="hasUpgrade = $event" />
    <ToastSubscribeSuccess :open="isSubscribed" @open-change="isSubscribed = $event" />

    <OkuToast v-for="(_, index) in errorCount" :key="index" class="toast toast-error">
      <OkuToastDescription>There was an error</OkuToastDescription>
      <OkuToastAction
        class="button"
        alt-text="Resubmit the form to try again."
        @click="console.log('try again')"
      >
        Try again
      </OkuToastAction>
    </OkuToast>

    <OkuToast v-for="(_, index) in savedCount" :key="index" class="toast">
      <OkuToastDescription>Successfully saved</OkuToastDescription>
    </OkuToast>

    <OkuToastViewport class="toast-viewport" />
  </OkuToastProvider>
</template>
