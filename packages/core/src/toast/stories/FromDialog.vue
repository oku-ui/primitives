<script setup lang="ts">
import { shallowRef } from 'vue'
import { DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogRoot, DialogTitle, DialogTrigger } from '../../dialog/index.ts'
import { ToastAction, ToastDescription, ToastRoot, ToastViewport, useToastProvider } from '../index.ts'
import './styles.css'

const open = shallowRef(false)

useToastProvider()
</script>

<template>
  <div>
    <DialogRoot>
      <DialogTrigger>Open</DialogTrigger>
      <DialogOverlay />
      <DialogContent :style="{ border: '1px solid', width: '300px', padding: '30px' }">
        <DialogTitle :style="{ margin: 0 }">
          Title
        </DialogTitle>
        <DialogDescription>Description</DialogDescription>
        <button @click="() => open = true">
          Open toast
        </button>
        <DialogClose>Close</DialogClose>
      </DialogContent>
    </DialogRoot>

    <ToastRoot v-model:open="open" class="toast_errorRootClass">
      <ToastDescription>There was an error</ToastDescription>
      <ToastAction
        class="toast_buttonClass"
        alt-text="Resubmit the form to try again."
        @click="() => console.log('try again')"
      >
        Try again
      </ToastAction>
    </ToastRoot>

    <ToastViewport class="toast_viewportClass" />
  </div>
</template>
