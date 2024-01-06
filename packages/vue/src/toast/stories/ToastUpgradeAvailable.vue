<script setup lang="ts">
import { OkuToast, OkuToastAction, OkuToastClose, OkuToastDescription, OkuToastTitle } from '@oku-ui/toast'

defineProps({
  open: Boolean,
})
</script>

<template>
  <OkuToast class="toast-toast" :open="open">
    <div class="toast-header">
      <OkuToastTitle class="toast-title">
        Upgrade available
      </OkuToastTitle>
      <OkuToastClose class="button close" aria-label="Close">
        <span aria-hidden>×</span>
      </OkuToastClose>
    </div>
    <OkuToastDescription class="toast-description">
      We've just released Oku version 1.0
    </OkuToastDescription>
    <OkuToastAction alt-text="Goto account settings to upgrade" class="button" :style="{ marginTop: '10px' }">
      Upgrade
    </OkuToastAction>
  </OkuToast>
</template>
