<script setup lang="ts">
import { shallowRef } from 'vue'
import DialogClose from '../DialogClose.vue'
import DialogDescription from '../DialogDescription.vue'
import DialogTitle from '../DialogTitle.vue'
import { Dialog, DialogContent, DialogOverlay, DialogPortal, DialogTrigger } from '../index.ts'
import './styles.css'

const portalContainer = shallowRef<HTMLElement>()
</script>

<template>
  <div>
    <Dialog>
      <DialogTrigger class="dialog_triggerClass">
        open
      </DialogTrigger>
      <DialogPortal :to="portalContainer">
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

    <div ref="portalContainer" data-portal-container="" />
  </div>
</template>
