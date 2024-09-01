<script setup lang="ts">
import './styles.css'
import { shallowRef, watchEffect } from 'vue'
import { isClient } from '@vueuse/core'
import { ToastAction, ToastDescription, ToastRoot, ToastViewport, useToastProvider } from '../index.ts'
import ToastUpgradeAvailable from './ToastUpgradeAvailable.vue'
import ToastSubscribeSuccess from './ToastSubscribeSuccess.vue'

const hasUpgrade = shallowRef(false)
const isSubscribed = shallowRef(false)
const savedCount = shallowRef(0)
const errorCount = shallowRef(0)

if (isClient) {
  watchEffect((onCleanup) => {
    if (!hasUpgrade.value) {
      const timer = window.setTimeout(() => hasUpgrade.value = true, 10000)
      onCleanup(() => window.clearTimeout(timer))
    }
  })
}

useToastProvider()
</script>

<template>
  <div>
    <input>
    <div>
      <button @click="() => isSubscribed = true">
        subscribe
      </button>
      <button @click="() => errorCount += 1">
        error
      </button>
      <button @click="() => savedCount += 1">
        save
      </button>

      <ToastUpgradeAvailable v-model:open="hasUpgrade" />
      <ToastSubscribeSuccess v-model:open="isSubscribed" />

      <ToastRoot v-for="n in errorCount" :key="n" class="toast_errorRootClass">
        <ToastDescription>There was an error</ToastDescription>
        <ToastAction
          class="toast_buttonClass"
          alt-text="Resubmit the form to try again."
          @click="() => console.log('try again')"
        >
          Try again
        </ToastAction>
      </ToastRoot>

      <ToastRoot v-for="n in savedCount" :key="n" class="toast_rootClass">
        <ToastDescription>Successfully saved</ToastDescription>
      </ToastRoot>

      <div>
        <ToastViewport class="toast_viewportClass" />
      </div>
    </div>
    <input>
  </div>
</template>
