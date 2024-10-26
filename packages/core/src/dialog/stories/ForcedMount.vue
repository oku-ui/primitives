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
      <DialogPortal>
        <DialogOverlay class="dialog_overlayClass" force-mount />
        <DialogContent class="dialog_contentDefaultClass" force-mount>
          <DialogTitle>Title</DialogTitle>
          <DialogDescription>Description</DialogDescription>
          <DialogClose class="dialog_closeClass">
            close
          </DialogClose>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  </div>
</template>
