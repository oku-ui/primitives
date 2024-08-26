<script setup lang="ts">
import DialogClose from '../DialogClose.vue'
import DialogDescription from '../DialogDescription.vue'
import DialogTitle from '../DialogTitle.vue'
import { Dialog, DialogContent, DialogOverlay, DialogPortal, DialogTrigger } from '../index.ts'
import './styles.css'
</script>

<template>
  <div>
    <Dialog>
      <DialogTrigger class="dialog_triggerClass">
        open
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay class="dialog_overlayClass dialog_animatedOverlayClass" />
        <DialogContent class="dialog_contentDefaultClass dialog_animatedContentClass">
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
