<script setup lang="ts">
import {
  OkuToast, OkuToastAction,
  OkuToastDescription, OkuToastProvider, OkuToastViewport,
} from '@oku-ui/toast'
import { ref, watchEffect } from 'vue'
import { isClient } from '@oku-ui/use-composable'
import ToastUpgradeAvailable from './ToastUpgradeAvailable.vue'
import ToastSubscribeSuccess from './ToastSubscribeSuccess.vue'

const isSubscribed = ref(false)
const savedCount = ref(0)
const errorCount = ref(0)

const hasUpgrade = ref(false)

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
    <button type="button" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md" @click="isSubscribed = true">
      subscribe
    </button>
    <button type="button" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md" @click="errorCount++">
      error
    </button>
    <button type="button" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md" @click="savedCount++">
      save
    </button>
    <ToastUpgradeAvailable v-model="hasUpgrade" />
    <ToastSubscribeSuccess v-model="isSubscribed" />

    <OkuToast v-for="(_, index) in errorCount" :key="index" class="toast error-toast">
      <OkuToastDescription>There was an error</OkuToastDescription>
      <OkuToastAction
        class="button" alt-text="Resubmit the form to try again."
        @click="console.log('try again')"
      >
        Try again
      </OkuToastAction>
    </OkuToast>

    <OkuToast v-for="(_, index) in savedCount" :key="index" class="toast">
      <OkuToastDescription>Successfully saved</OkuToastDescription>
    </OkuToast>

    <OkuToastViewport class="viewport" />
  </OkuToastProvider>
</template>
