<script setup lang="ts">
import { OkuToast, OkuToastClose, OkuToastDescription, OkuToastTitle } from '@oku-ui/toast'

defineProps({
  open: Boolean,
})
</script>

<template>
  <OkuToast class="toast" :open="open">
    <div class="header success-header">
      <OkuToastTitle class="title">
        Success!
      </OkuToastTitle>
      <OkuToastClose class="button close" aria-label="Close">
        <span aria-hidden>×</span>
      </OkuToastClose>
    </div>
    <OkuToastDescription class="description">
      You have subscribed. We'll be in touch.
    </OkuToastDescription>
  </OkuToast>
</template>

<style scoped lang="postcss">
@import './toast.css';
.success-header {
  background: green;
}
</style>
