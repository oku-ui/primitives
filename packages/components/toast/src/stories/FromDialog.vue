<script setup lang="ts">
import { ref } from 'vue'
import { OkuToast, OkuToastAction, OkuToastDescription, OkuToastProvider, OkuToastViewport } from '@oku-ui/toast'
import { OkuDialog, OkuDialogClose, OkuDialogContent, OkuDialogDescription, OkuDialogOverlay, OkuDialogTitle, OkuDialogTrigger } from '@oku-ui/dialog'

const open = ref(false)
</script>

<template>
  <OkuToastProvider>
    <OkuDialog>
      <OkuDialogTrigger>Open</OkuDialogTrigger>
      <OkuDialogOverlay />
      <OkuDialogContent :style="{ border: '1px solid', width: '300px', padding: '30px' }">
        <OkuDialogTitle :style="{ margin: '0px' }">
          Title
        </OkuDialogTitle>
        <OkuDialogDescription>Description</OkuDialogDescription>
        <button @click="open = true">
          Open toast
        </button>
        <OkuDialogClose>Close</OkuDialogClose>
      </OkuDialogContent>
    </OkuDialog>

    <OkuToast :open="open" class="toast toast-error" @open-change="open = $event">
      <OkuToastDescription>There was an error</OkuToastDescription>
      <OkuToastAction
        class="button"
        alt-text="Resubmit the form to try again."
        @click="console.log('try again')"
      >
        Try again
      </OkuToastAction>
    </OkuToast>

    <OkuToastViewport class="toast-viewport" />
  </OkuToastProvider>
</template>
