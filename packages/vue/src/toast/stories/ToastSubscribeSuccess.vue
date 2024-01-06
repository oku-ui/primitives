<script setup lang="ts">
import { OkuToast, OkuToastClose, OkuToastDescription, OkuToastTitle } from '@oku-ui/toast'

defineProps({
  open: Boolean,
})
</script>

<template>
  <OkuToast class="toast-toast" :open="open">
    <div class="header success-header">
      <OkuToastTitle class="toast-title">
        Success!
      </OkuToastTitle>
      <OkuToastClose class="button close" aria-label="Close">
        <span aria-hidden>×</span>
      </OkuToastClose>
    </div>
    <OkuToastDescription class="toast-description">
      You have subscribed. We'll be in touch.
    </OkuToastDescription>
  </OkuToast>
</template>

<style scoped lang="postcss">
.success-header {
  background: green;
}
</style>
