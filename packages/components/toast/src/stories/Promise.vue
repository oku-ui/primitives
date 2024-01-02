<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { isClient } from '@oku-ui/use-composable'
import { OkuToast, OkuToastDescription, OkuToastProvider, OkuToastViewport } from '@oku-ui/toast'

const saving = ref(false)
const open = ref(false)

watchEffect((onInvalidate) => {
  if (!isClient)
    return
  if (!saving.value) {
    const timer = window.setTimeout(() => saving.value = false, 2000)

    onInvalidate(() => window.clearTimeout(timer))
  }
})
</script>

<template>
  <OkuToastProvider>
    <form
      @submit="(event) => {
        saving = true
        open = true
        event.preventDefault()
      }"
    >
      <button>Save</button>
      <OkuToast
        class="toast"
        :duration="saving ? Infinity : 2000"
        :open="open"
        @open-change="open = $event"
      >
        <OkuToastDescription v-if="saving">
          Saving&hellip;
        </OkuToastDescription>
        <OkuToastDescription v-else>
          Saved!
        </OkuToastDescription>
      </OkuToast>
    </form>

    <OkuToastViewport class="toast-viewport" />
  </OkuToastProvider>
</template>
