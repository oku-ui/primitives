<script setup lang="ts">
import { shallowRef } from 'vue'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from '../index.ts'
import './styles.css'

const open = shallowRef(false)
</script>

<template>
  <div>
    <Dialog v-model:open="open">
      <DialogTrigger class="dialog_triggerClass">
        {{ open ? 'close' : 'open' }}
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay class="dialog_overlayClass" />
        <DialogContent class="dialog_contentDefaultClass">
          <DialogTitle>Title</DialogTitle>
          <DialogDescription>Description</DialogDescription>
          <DialogClose class="dialog_closeClass">
            close
          </DialogClose>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  </div>
</template>
