<script setup lang="ts">
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from '../index.ts'
import './styles.css'
</script>

<template>
  <div>
    <Dialog>
      <DialogTrigger class="dialog_triggerClass">
        open
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay class="dialog_overlayClass" />
        <DialogContent class="dialog_contentDefaultClass">
          <DialogTitle>Booking info</DialogTitle>
          <DialogDescription>Please enter the info for your booking below.</DialogDescription>
          <DialogClose class="dialog_closeClass">
            close
          </DialogClose>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  </div>
</template>
