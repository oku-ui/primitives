<script setup lang="ts">
import { OkuToast, OkuToastAction, OkuToastClose, OkuToastDescription, OkuToastProvider, OkuToastTitle, OkuToastViewport } from '@oku-ui/toast'
import { ref, watchEffect } from 'vue'

const hasUpgrade = ref(false)

watchEffect((onInvalidate) => {
  if (!hasUpgrade.value) {
    const timer = window.setTimeout(() => hasUpgrade.value = true, 10000)

    onInvalidate(() => window.clearTimeout(timer))
  }
})

const open = ref(false)
const saving = ref(false)

watchEffect((onInvalidate) => {
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
    <OkuToast class="toast">
      <div class="header">
        <OkuToastTitle class="title">
          Toast 1
        </OkuToastTitle>
        <OkuToastClose class="button close">
          ×
        </OkuToastClose>
      </div>
      <OkuToastDescription class="description">
        Description
      </OkuToastDescription>
      <OkuToastAction alt-text="alternative" class="button" :style="{ marginTop: '10px' }">
        Action
      </OkuToastAction>
    </OkuToast>
    <OkuToast class="toast">
      <div class="header">
        <OkuToastTitle class="title">
          Toast 2
        </OkuToastTitle>
        <OkuToastClose class="button close">
          ×
        </OkuToastClose>
      </div>
      <OkuToastDescription class="description">
        Description
      </OkuToastDescription>
      <OkuToastAction alt-text="alternative" class="button" :style="{ marginTop: '10px' }">
        Action
      </OkuToastAction>
    </OkuToast>
    <OkuToastViewport class="chromatic-viewport" />
  </OkuToastProvider>

  <h1>Uncontrolled</h1>

  <h2>Open</h2>
  <OkuToastProvider>
    <OkuToast :duration="Infinity" class="toast">
      <div class="header">
        <OkuToastTitle class="title">
          Toast
        </OkuToastTitle>
        <OkuToastClose class="button close">
          ×
        </OkuToastClose>
      </div>
      <OkuToastDescription class="description">
        Description
      </OkuToastDescription>
      <OkuToastAction alt-text="alternative" class="button" :style="{ marginTop: '10px' }">
        Action
      </OkuToastAction>
    </OkuToast>
    <OkuToastViewport class="chromatic-viewport" />
  </OkuToastProvider>

  <h2>Closed</h2>
  <OkuToastProvider>
    <OkuToast :open="false" :duration="Infinity" class="toast">
      <div class="header">
        <OkuToastTitle class="title">
          Title
        </OkuToastTitle>
        <OkuToastClose class="button close">
          ×
        </OkuToastClose>
      </div>
      <OkuToastDescription class="description">
        Uncontrolled foreground closed
      </OkuToastDescription>
      <OkuToastAction alt-text="alternative" class="button" :style="{ marginTop: '10px' }">
        Action
      </OkuToastAction>
    </OkuToast>
    <OkuToastViewport class="chromatic-viewport" />
  </OkuToastProvider>

  <h1>Controlled</h1>

  <h2>Open</h2>
  <OkuToastProvider>
    <OkuToast open :duration="Infinity" class="toast">
      <div class="header">
        <OkuToastTitle class="title">
          Toast
        </OkuToastTitle>
        <OkuToastClose class="button close">
          ×
        </OkuToastClose>
      </div>
      <OkuToastDescription class="description">
        Description
      </OkuToastDescription>
      <OkuToastAction alt-text="alternative" class="button" :style="{ marginTop: '10px' }">
        Action
      </OkuToastAction>
    </OkuToast>
    <OkuToastViewport class="chromatic-viewport" />
  </OkuToastProvider>

  <h2>Closed</h2>
  <OkuToastProvider>
    <OkuToast :open="false" :duration="Infinity" class="toast">
      <div class="header">
        <OkuToastTitle class="title">
          Toast
        </OkuToastTitle>
        <OkuToastClose class="button close">
          ×
        </OkuToastClose>
      </div>
      <OkuToastDescription class="description">
        Description
      </OkuToastDescription>
      <OkuToastAction alt-text="alternative" class="button" :style="{ marginTop: '10px' }">
        Action
      </OkuToastAction>
    </OkuToast>
    <OkuToastViewport class="chromatic-viewport" />
  </OkuToastProvider>

  <h1>Dismissed</h1>
  <h2>Uncontrolled</h2>
  <OkuToastProvider>
    <OkuToast :duration="SNAPSHOT_DELAY - 100" class="toast">
      <div class="header">
        <OkuToastTitle class="title">
          Toast
        </OkuToastTitle>
        <OkuToastClose class="button close">
          ×
        </OkuToastClose>
      </div>
      <OkuToastDescription class="description">
        Description
      </OkuToastDescription>
      <OkuToastAction alt-text="alternative" class="button" :style="{ marginTop: '10px' }">
        Action
      </OkuToastAction>
    </OkuToast>
    <OkuToastViewport class="chromatic-viewport" />
  </OkuToastProvider>

  <h2>Controlled</h2>
  <OkuToastProvider>
    <OkuToast v-model="open" :duration="SNAPSHOT_DELAY - 100" :open="open" class="toast">
      <div class="header">
        <OkuToastTitle class="title">
          Toast
        </OkuToastTitle>
        <OkuToastClose class="button close">
          ×
        </OkuToastClose>
      </div>
      <OkuToastDescription class="description">
        Description
      </OkuToastDescription>
      <OkuToastAction alt-text="alternative" class="button" :style="{ marginTop: '10px' }">
        Action
      </OkuToastAction>
    </OkuToast>
    <OkuToastViewport class="chromatic-viewport" />
  </OkuToastProvider>

  <h1>Provider</h1>
  <h2>Duration</h2>
  <OkuToastProvider :duration="SNAPSHOT_DELAY - 100">
    <OkuToast class="toast">
      <div class="header">
        <OkuToastTitle class="title">
          Toast
        </OkuToastTitle>
        <OkuToastClose class="button close">
          ×
        </OkuToastClose>
      </div>
      <OkuToastDescription class="description">
        Description
      </OkuToastDescription>
      <OkuToastAction alt-text="alternative" class="button" :style="{ marginTop: '10px' }">
        Action
      </OkuToastAction>
    </OkuToast>
    <OkuToastViewport class="chromatic-viewport" />
  </OkuToastProvider>

  <h2>Duration overidden</h2>
  <OkuToastProvider :duration="Infinity">
    <OkuToast :duration="SNAPSHOT_DELAY - 100" class="toast">
      <div class="header">
        <OkuToastTitle class="title">
          Toast
        </OkuToastTitle>
        <OkuToastClose class="button close">
          ×
        </OkuToastClose>
      </div>
      <OkuToastDescription class="description">
        Description
      </OkuToastDescription>
      <OkuToastAction alt-text="alternative" class="button" :style="{ marginTop: '10px' }">
        Action
      </OkuToastAction>
    </OkuToast>
    <OkuToastViewport class="chromatic-viewport" />
  </OkuToastProvider>
</template>

<style lang="postcss">
@import './toast.css'
</style>
