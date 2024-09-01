<script setup lang="ts">
import { ToastAction, ToastClose, ToastDescription, ToastRoot, ToastTitle } from '../index.ts'
</script>

<template>
  <ToastRoot class="toast_rootClass">
    <div class="toast_headerClass">
      <ToastTitle class="toast_titleClass">
        Upgrade available
      </ToastTitle>
      <ToastClose class="toast_closeClass" aria-label="Close">
        <span aria-hidden>×</span>
      </ToastClose>
    </div>
    <ToastDescription class="toast_descriptionClass">
      We've just released Radix version 3.0
    </ToastDescription>
    <ToastAction
      alt-text="Goto account settings to upgrade"
      class="toast_buttonClass"
      :style="{ marginTop: '10px' }"
    >
      Upgrade
    </ToastAction>
  </ToastRoot>
</template>
