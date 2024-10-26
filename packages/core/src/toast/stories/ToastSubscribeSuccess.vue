<script setup lang="ts">
import { ToastClose, ToastDescription, ToastRoot, ToastTitle } from '../index.ts'
</script>

<template>
  <ToastRoot class="toast_rootClass">
    <div class="toast_successHeaderClass">
      <ToastTitle class="toast_titleClass">
        Success!
      </ToastTitle>
      <ToastClose class="toast_closeClass" aria-label="Close">
        <span aria-hidden="true">×</span>
      </ToastClose>
    </div>
    <ToastDescription class="toast_descriptionClass">
      You have subscribed. We'll be in touch.
    </ToastDescription>
  </ToastRoot>
</template>
