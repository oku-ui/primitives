<script setup lang="ts">
import { ref } from 'vue'
import {
  OkuToast, OkuToastAction,
  OkuToastDescription, OkuToastProvider, OkuToastViewport,
} from '@oku-ui/toast'
import {
  OkuDialog, OkuDialogClose, OkuDialogContent, OkuDialogDescription, OkuDialogOverlay, OkuDialogTitle, OkuDialogTrigger,
} from '@oku-ui/dialog'

const open = ref(false)
</script>

<template>
  <OkuToastProvider>
    <OkuDialog>
      <OkuDialogTrigger>Open</OkuDialogTrigger>
      <OkuDialogOverlay />
      <OkuDialogContent :style="{ border: '1px solid', width: '300px', padding: '30px' }">
        <OkuDialogTitle :style="{ margin: 0 }">
          Title
        </OkuDialogTitle>
        <OkuDialogDescription>Description</OkuDialogDescription>
        <button type="button" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md" @click="open = true">
          Open toast
        </button>
        <OkuDialogClose>Close</OkuDialogClose>
      </OkuDialogContent>
    </OkuDialog>

    <OkuToast v-model="open" class="toast error-toast">
      <OkuToastDescription>There was an error</OkuToastDescription>
      <OkuToastAction
        class="button" alt-text="Resubmit the form to try again."
        @click="console.log('try again')"
      >
        Try again
      </OkuToastAction>
    </OkuToast>

    <OkuToastViewport class="viewport" />
  </OkuToastProvider>
</template>
