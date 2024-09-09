<script setup lang="ts">
import { shallowRef, watchEffect } from 'vue'
import { ToastDescription, ToastRoot, ToastViewport, useToastProvider } from '../index.ts'
import './styles.css'

const saving = shallowRef(false)
const open = shallowRef(false)

watchEffect((onCleanup) => {
  if (saving.value) {
    const timer = window.setTimeout(() => saving.value = false, 2000)
    onCleanup(() => window.clearTimeout(timer))
  }
})

useToastProvider()
</script>

<template>
  <div>
    <form
      @submit="(event) => {
        saving = true;
        open = true;
        event.preventDefault();
      }"
    >
      <button>Save</button>

      <ToastRoot
        v-model:open="open"
        class="toast_rootClass"
        :duration="saving ? Infinity : 2000"
      >
        <ToastDescription v-if="saving">
          Saving&hellip;
        </ToastDescription>
        <ToastDescription v-else>
          Saved!
        </ToastDescription>
      </ToastRoot>
    </form>

    <ToastViewport class="toast_viewportClass" />
  </div>
</template>
