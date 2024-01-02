<script setup lang="ts">
import { OkuToast, OkuToastAction, OkuToastClose, OkuToastDescription, OkuToastTitle } from '@oku-ui/toast'
</script>

<template>
  <OkuToast class="toast" v-bind="$attrs">
    <div class="toast-header">
      <OkuToastTitle class="toast-title">
        Upgrade available
      </OkuToastTitle>
      <OkuToastClose class="toast-button toast-close" aria-label="Close">
        <span aria-hidden>×</span>
      </OkuToastClose>
    </div>
    <OkuToastDescription class="toast-description">
      We've just released Oku version 1.0
    </OkuToastDescription>
    <OkuToastAction
      alt-text="Goto account settings to upgrade"
      class="toast-button"
      :style="{ marginTop: '10px' }"
    >
      Upgrade
    </OkuToastAction>
  </OkuToast>
</template>
