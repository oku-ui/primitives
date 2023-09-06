<script setup lang="ts">
import { OkuToast, OkuToastDescription, OkuToastProvider, OkuToastViewport } from '@oku-ui/toast'
import { ref } from 'vue'

const open = ref(false)
const saving = ref(false)
</script>

<template>
  <OkuToastProvider>
    <form
      @submit.prevent="() => {
        saving = true;
        open = true;
      }"
    >
      <button type="submit" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md">
        Save
      </button>
      <OkuToast v-model="open" class="toast" :duration="saving ? Infinity : 2000">
        <OkuToastDescription v-if="saving">
          Saving&hellip;
        </OkuToastDescription>
        <OkuToastDescription v-else>
          Saved!
        </OkuToastDescription>
      </OkuToast>
    </form>

    <OkuToastViewport class="viewport" />
  </OkuToastProvider>
</template>

<style lang="postcss">
@import './toast.css'
</style>
