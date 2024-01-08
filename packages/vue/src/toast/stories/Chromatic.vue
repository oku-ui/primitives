<script setup lang="ts">
import { OkuToast, OkuToastAction, OkuToastClose, OkuToastDescription, OkuToastProvider, OkuToastTitle, OkuToastViewport } from '@oku-ui/toast'
import { isClient } from '@oku-ui/use-composable'
import { ref, watchEffect } from 'vue'

const hasUpgrade = ref(false)

watchEffect((onInvalidate) => {
  if (!isClient)
    return
  if (!hasUpgrade.value) {
    const timer = window.setTimeout(() => hasUpgrade.value = true, 10000)

    onInvalidate(() => window.clearTimeout(timer))
  }
})

const open = ref(false)
const saving = ref(false)

watchEffect((onInvalidate) => {
  if (!isClient)
    return

  if (saving.value) {
    const timer = window.setTimeout(() => saving.value = false, 2000)

    onInvalidate(() => window.clearTimeout(timer))
  }
})

const SNAPSHOT_DELAY = ref(300)
</script>

<template>
  <h1>Order</h1>
  <OkuToastProvider :duration="Infinity">
    <OkuToast class="toast-toast">
      <div class="toast-header">
        <OkuToastTitle class="toast-title">
          Toast 1
        </OkuToastTitle>
        <OkuToastClose class="button close">
          ×
        </OkuToastClose>
      </div>
      <OkuToastDescription class="toast-description">
        Description
      </OkuToastDescription>
      <OkuToastAction alt-text="alternative" class="button" :style="{ marginTop: '10px' }">
        Action
      </OkuToastAction>
    </OkuToast>
    <OkuToast class="toast-toast">
      <div class="toast-header">
        <OkuToastTitle class="toast-title">
          Toast 2
        </OkuToastTitle>
        <OkuToastClose class="button close">
          ×
        </OkuToastClose>
      </div>
      <OkuToastDescription class="toast-description">
        Description
      </OkuToastDescription>
      <OkuToastAction alt-text="alternative" class="button" :style="{ marginTop: '10px' }">
        Action
      </OkuToastAction>
    </OkuToast>
    <OkuToastViewport class="toast-chromatic-toast-viewport" />
  </OkuToastProvider>

  <h1>Uncontrolled</h1>

  <h2>Open</h2>
  <OkuToastProvider>
    <OkuToast :duration="Infinity" class="toast-toast">
      <div class="toast-header">
        <OkuToastTitle class="toast-title">
          Toast
        </OkuToastTitle>
        <OkuToastClose class="button close">
          ×
        </OkuToastClose>
      </div>
      <OkuToastDescription class="toast-description">
        Description
      </OkuToastDescription>
      <OkuToastAction alt-text="alternative" class="button" :style="{ marginTop: '10px' }">
        Action
      </OkuToastAction>
    </OkuToast>
    <OkuToastViewport class="toast-chromatic-toast-viewport" />
  </OkuToastProvider>

  <h2>Closed</h2>
  <OkuToastProvider>
    <OkuToast :open="false" :duration="Infinity" class="toast-toast">
      <div class="toast-header">
        <OkuToastTitle class="toast-title">
          Title
        </OkuToastTitle>
        <OkuToastClose class="button close">
          ×
        </OkuToastClose>
      </div>
      <OkuToastDescription class="toast-description">
        Uncontrolled foreground closed
      </OkuToastDescription>
      <OkuToastAction alt-text="alternative" class="button" :style="{ marginTop: '10px' }">
        Action
      </OkuToastAction>
    </OkuToast>
    <OkuToastViewport class="toast-chromatic-toast-viewport" />
  </OkuToastProvider>

  <h1>Controlled</h1>

  <h2>Open</h2>
  <OkuToastProvider>
    <OkuToast open :duration="Infinity" class="toast-toast">
      <div class="toast-header">
        <OkuToastTitle class="toast-title">
          Toast
        </OkuToastTitle>
        <OkuToastClose class="button close">
          ×
        </OkuToastClose>
      </div>
      <OkuToastDescription class="toast-description">
        Description
      </OkuToastDescription>
      <OkuToastAction alt-text="alternative" class="button" :style="{ marginTop: '10px' }">
        Action
      </OkuToastAction>
    </OkuToast>
    <OkuToastViewport class="toast-chromatic-toast-viewport" />
  </OkuToastProvider>

  <h2>Closed</h2>
  <OkuToastProvider>
    <OkuToast :open="false" :duration="Infinity" class="toast-toast">
      <div class="toast-header">
        <OkuToastTitle class="toast-title">
          Toast
        </OkuToastTitle>
        <OkuToastClose class="button close">
          ×
        </OkuToastClose>
      </div>
      <OkuToastDescription class="toast-description">
        Description
      </OkuToastDescription>
      <OkuToastAction alt-text="alternative" class="button" :style="{ marginTop: '10px' }">
        Action
      </OkuToastAction>
    </OkuToast>
    <OkuToastViewport class="toast-chromatic-toast-viewport" />
  </OkuToastProvider>

  <h1>Dismissed</h1>
  <h2>Uncontrolled</h2>
  <OkuToastProvider>
    <OkuToast :duration="SNAPSHOT_DELAY - 100" class="toast-toast">
      <div class="toast-header">
        <OkuToastTitle class="toast-title">
          Toast
        </OkuToastTitle>
        <OkuToastClose class="button close">
          ×
        </OkuToastClose>
      </div>
      <OkuToastDescription class="toast-description">
        Description
      </OkuToastDescription>
      <OkuToastAction alt-text="alternative" class="button" :style="{ marginTop: '10px' }">
        Action
      </OkuToastAction>
    </OkuToast>
    <OkuToastViewport class="toast-chromatic-toast-viewport" />
  </OkuToastProvider>

  <h2>Controlled</h2>
  <OkuToastProvider>
    <OkuToast v-model="open" :duration="SNAPSHOT_DELAY - 100" :open="open" class="toast-toast">
      <div class="toast-header">
        <OkuToastTitle class="toast-title">
          Toast
        </OkuToastTitle>
        <OkuToastClose class="button close">
          ×
        </OkuToastClose>
      </div>
      <OkuToastDescription class="toast-description">
        Description
      </OkuToastDescription>
      <OkuToastAction alt-text="alternative" class="button" :style="{ marginTop: '10px' }">
        Action
      </OkuToastAction>
    </OkuToast>
    <OkuToastViewport class="toast-chromatic-toast-viewport" />
  </OkuToastProvider>

  <h1>Provider</h1>
  <h2>Duration</h2>
  <OkuToastProvider :duration="SNAPSHOT_DELAY - 100">
    <OkuToast class="toast-toast">
      <div class="toast-header">
        <OkuToastTitle class="toast-title">
          Toast
        </OkuToastTitle>
        <OkuToastClose class="button close">
          ×
        </OkuToastClose>
      </div>
      <OkuToastDescription class="toast-description">
        Description
      </OkuToastDescription>
      <OkuToastAction alt-text="alternative" class="button" :style="{ marginTop: '10px' }">
        Action
      </OkuToastAction>
    </OkuToast>
    <OkuToastViewport class="toast-chromatic-toast-viewport" />
  </OkuToastProvider>

  <h2>Duration overidden</h2>
  <OkuToastProvider :duration="Infinity">
    <OkuToast :duration="SNAPSHOT_DELAY - 100" class="toast-toast">
      <div class="toast-header">
        <OkuToastTitle class="toast-title">
          Toast
        </OkuToastTitle>
        <OkuToastClose class="button close">
          ×
        </OkuToastClose>
      </div>
      <OkuToastDescription class="toast-description">
        Description
      </OkuToastDescription>
      <OkuToastAction alt-text="alternative" class="button" :style="{ marginTop: '10px' }">
        Action
      </OkuToastAction>
    </OkuToast>
    <OkuToastViewport class="toast-chromatic-toast-viewport" />
  </OkuToastProvider>
</template>
