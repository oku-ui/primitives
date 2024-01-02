<script setup lang="ts">
import { ref } from 'vue'
import { OkuToast, OkuToastAction, OkuToastClose, OkuToastDescription, OkuToastProvider, OkuToastTitle, OkuToastViewport } from '@oku-ui/toast'

const SNAPSHOT_DELAY = ref(300)
const open = ref(false)
</script>

<template>
  <h1>Order</h1>
  <OkuToastProvider :duration="Infinity">
    <OkuToast class="toast">
      <div class="toast-header">
        <OkuToastTitle class="toast-title">
          Toast 1
        </OkuToastTitle>
        <OkuToastClose class="toast-button toast-close">
          ×
        </OkuToastClose>
      </div>
      <OkuToastDescription class="toast-description">
        Description
      </OkuToastDescription>
      <OkuToastAction alt-text="alternative" class="toast-button" :style="{ marginTop: '10px' }">
        Action
      </OkuToastAction>
    </OkuToast>
    <OkuToast class="toast">
      <div class="toast-header">
        <OkuToastTitle class="toast-title">
          Toast 2
        </OkuToastTitle>
        <OkuToastClose class="toast-button toast-close">
          ×
        </OkuToastClose>
      </div>
      <OkuToastDescription class="toast-description">
        Description
      </OkuToastDescription>
      <OkuToastAction alt-text="alternative" class="toast-button" :style="{ marginTop: '10px' }">
        Action
      </OkuToastAction>
    </OkuToast>
    <OkuToastViewport class="toast-chromatic-viewport" />
  </OkuToastProvider>

  <h1>Uncontrolled</h1>

  <h2>Open</h2>
  <OkuToastProvider>
    <OkuToast :duration="Infinity" class="toast">
      <div class="toast-header">
        <OkuToastTitle class="toast-title">
          Toast
        </OkuToastTitle>
        <OkuToastClose class="toast-button toast-close">
          ×
        </OkuToastClose>
      </div>
      <OkuToastDescription class="toast-description">
        Description
      </OkuToastDescription>
      <OkuToastAction alt-text="alternative" class="toast-button" :style="{ marginTop: '10px' }">
        Action
      </OkuToastAction>
    </OkuToast>
    <OkuToastViewport class="toast-chromatic-viewport" />
  </OkuToastProvider>

  <h2>Closed</h2>
  <OkuToastProvider>
    <OkuToast :open="false" :duration="Infinity" class="toast">
      <div class="toast-header">
        <OkuToastTitle class="toast-title">
          Title
        </OkuToastTitle>
        <OkuToastClose class="toast-button toast-close">
          ×
        </OkuToastClose>
      </div>
      <OkuToastDescription class="toast-description">
        Uncontrolled foreground closed
      </OkuToastDescription>
      <OkuToastAction alt-text="alternative" class="toast-button" :style="{ marginTop: '10px' }">
        Action
      </OkuToastAction>
    </OkuToast>
    <OkuToastViewport class="toast-chromatic-viewport" />
  </OkuToastProvider>

  <h1>Controlled</h1>

  <h2>Open</h2>
  <OkuToastProvider>
    <OkuToast open :duration="Infinity" class="toast">
      <div class="toast-header">
        <OkuToastTitle class="toast-title">
          Toast
        </OkuToastTitle>
        <OkuToastClose class="toast-button toast-close">
          ×
        </OkuToastClose>
      </div>
      <OkuToastDescription class="toast-description">
        Description
      </OkuToastDescription>
      <OkuToastAction alt-text="alternative" class="toast-button" :style="{ marginTop: '10px' }">
        Action
      </OkuToastAction>
    </OkuToast>
    <OkuToastViewport class="toast-chromatic-viewport" />
  </OkuToastProvider>

  <h2>Closed</h2>
  <OkuToastProvider>
    <OkuToast :open="false" :duration="Infinity" class="toast">
      <div class="toast-header">
        <OkuToastTitle class="toast-title">
          Toast
        </OkuToastTitle>
        <OkuToastClose class="toast-button toast-close">
          ×
        </OkuToastClose>
      </div>
      <OkuToastDescription class="toast-description">
        Description
      </OkuToastDescription>
      <OkuToastAction alt-text="alternative" class="toast-button" :style="{ marginTop: '10px' }">
        Action
      </OkuToastAction>
    </OkuToast>
    <OkuToastViewport class="toast-chromatic-viewport" />
  </OkuToastProvider>

  <h1>Dismissed</h1>
  <h2>Uncontrolled</h2>
  <OkuToastProvider>
    <OkuToast :duration="SNAPSHOT_DELAY - 100" class="toast">
      <div class="toast-header">
        <OkuToastTitle class="toast-title">
          Toast
        </OkuToastTitle>
        <OkuToastClose class="toast-button toast-close">
          ×
        </OkuToastClose>
      </div>
      <OkuToastDescription class="toast-description">
        Description
      </OkuToastDescription>
      <OkuToastAction alt-text="alternative" class="toast-button" :style="{ marginTop: '10px' }">
        Action
      </OkuToastAction>
    </OkuToast>
    <OkuToastViewport class="toast-chromatic-viewport" />
  </OkuToastProvider>

  <h2>Controlled</h2>
  <OkuToastProvider>
    <OkuToast
      :duration="SNAPSHOT_DELAY - 100"
      :open="open"
      class="toast"
      @open-change="open = $event"
    >
      <div class="toast-header">
        <OkuToastTitle class="toast-title">
          Toast
        </OkuToastTitle>
        <OkuToastClose class="toast-button toast-close">
          ×
        </OkuToastClose>
      </div>
      <OkuToastDescription class="toast-description">
        Description
      </OkuToastDescription>
      <OkuToastAction alt-text="alternative" class="toast-button" :style="{ marginTop: '10px' }">
        Action
      </OkuToastAction>
    </OkuToast>
    <OkuToastViewport class="toast-chromatic-viewport" />
  </OkuToastProvider>

  <h1>Provider</h1>
  <h2>Duration</h2>
  <OkuToastProvider :duration="SNAPSHOT_DELAY - 100">
    <OkuToast class="toast">
      <div class="toast-header">
        <OkuToastTitle class="toast-title">
          Toast
        </OkuToastTitle>
        <OkuToastClose class="toast-button toast-close">
          ×
        </OkuToastClose>
      </div>
      <OkuToastDescription class="toast-description">
        Description
      </OkuToastDescription>
      <OkuToastAction alt-text="alternative" class="toast-button" :style="{ marginTop: '10px' }">
        Action
      </OkuToastAction>
    </OkuToast>
    <OkuToastViewport class="toast-chromatic-viewport" />
  </OkuToastProvider>

  <h2>Duration overidden</h2>
  <OkuToastProvider :duration="Infinity">
    <OkuToast :duration="SNAPSHOT_DELAY - 100" class="toast">
      <div class="toast-header">
        <OkuToastTitle class="toast-title">
          Toast
        </OkuToastTitle>
        <OkuToastClose class="toast-button toast-close">
          ×
        </OkuToastClose>
      </div>
      <OkuToastDescription class="toast-description">
        Description
      </OkuToastDescription>
      <OkuToastAction alt-text="alternative" class="toast-button" :style="{ marginTop: '10px' }">
        Action
      </OkuToastAction>
    </OkuToast>
    <OkuToastViewport class="toast-chromatic-viewport" />
  </OkuToastProvider>
</template>
