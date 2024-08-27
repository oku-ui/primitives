<script setup lang="ts">
import { DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogRoot, DialogTitle, DialogTrigger } from '../index.ts'
import './styles.css'
</script>

<template>
  <div>
    <DialogRoot>
      <DialogTrigger class="dialog_triggerClass">
        open
      </DialogTrigger>
      <div :style="{ backgroundColor: '#eee', width: '300px', height: '1000px' }" />
      <DialogPortal>
        <DialogOverlay class="dialog_scrollableOverlayClass">
          <DialogContent class="dialog_contentInScrollableOverlayClass">
            <DialogTitle>Booking info</DialogTitle>
            <DialogDescription>Please enter the info for your booking below.</DialogDescription>
            <div :style="{ backgroundColor: '#eee', height: '500px' }" />
            <DialogClose class="dialog_closeClass">
              close
            </DialogClose>
          </DialogContent>
        </DialogOverlay>
      </DialogPortal>
    </DialogRoot>
  </div>
</template>
