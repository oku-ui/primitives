<script setup lang="ts">
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogOverlay, AlertDialogPortal, AlertDialogRoot, AlertDialogTitle, AlertDialogTrigger } from '../index.ts'
import './styles.css'
</script>

<template>
  <div>
    <AlertDialogRoot>
      <AlertDialogTrigger class="alertDialog_triggerClass">
        delete everything
      </AlertDialogTrigger>
      <AlertDialogPortal>
        <AlertDialogOverlay class="alertDialog_overlayClass" />
        <AlertDialogContent class="alertDialog_contentClass">
          <AlertDialogTitle class="alertDialog_titleClass">
            Are you sure?
          </AlertDialogTitle>
          <AlertDialogDescription class="alertDialog_descriptionClass">
            This will do a very dangerous thing. Thar be dragons!
          </AlertDialogDescription>
          <AlertDialogAction class="alertDialog_actionClass">
            yolo, do it
          </AlertDialogAction>
          <AlertDialogCancel class="alertDialog_cancelClass">
            maybe not
          </AlertDialogCancel>
        </AlertDialogContent>
      </AlertDialogPortal>
    </AlertDialogRoot>
  </div>
</template>
