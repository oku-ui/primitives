<script setup lang="ts">
import { OkuToast, OkuToastAction, OkuToastClose, OkuToastDescription, OkuToastTitle } from '@oku-ui/toast'

defineProps({
  open: Boolean,
})
</script>

<template>
  <OkuToast class="toast" :open="open">
    <div class="header">
      <OkuToastTitle class="title">
        Upgrade available
      </OkuToastTitle>
      <OkuToastClose class="close" aria-label="Close">
        <span aria-hidden>×</span>
      </OkuToastClose>
    </div>
    <OkuToastDescription class="description">
      We've just released Oku version 1.0
    </OkuToastDescription>
    <OkuToastAction alt-text="Goto account settings to upgrade" class="button" :style="{ 'margin-top': '10px' }">
      Upgrade
    </OkuToastAction>
  </OkuToast>
</template>
