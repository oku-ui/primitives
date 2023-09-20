<script setup lang="ts">
import { OkuToast, OkuToastAction, OkuToastClose, OkuToastDescription, OkuToastTitle } from '@oku-ui/toast'

defineProps({
  open: Boolean,
})
</script>

<template>
  <OkuToast class="toast_toastClass" :open="open">
    <div class="toast_headerClass">
      <OkuToastTitle class="toast_titleClass">
        Upgrade available
      </OkuToastTitle>
      <OkuToastClose class="button close" aria-label="Close">
        <span aria-hidden>×</span>
      </OkuToastClose>
    </div>
    <OkuToastDescription class="toast_descriptionClass">
      We've just released Oku version 1.0
    </OkuToastDescription>
    <OkuToastAction alt-text="Goto account settings to upgrade" class="buttonClass" :style="{ marginTop: '10px' }">
      Upgrade
    </OkuToastAction>
  </OkuToast>
</template>
