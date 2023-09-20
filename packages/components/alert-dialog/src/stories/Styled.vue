<script setup lang="ts">
import {
  OkuAlertDialog, OkuAlertDialogAction, OkuAlertDialogCancel, OkuAlertDialogContent, OkuAlertDialogDescription, OkuAlertDialogOverlay, OkuAlertDialogPortal,
  OkuAlertDialogTitle, OkuAlertDialogTrigger,
} from '@oku-ui/alert-dialog'
</script>

<template>
  <div>
    <OkuAlertDialog>
      <OkuAlertDialogTrigger class="alert-dialog-triggerClass">
        delete everything
      </OkuAlertDialogTrigger>
      <OkuAlertDialogPortal>
        <OkuAlertDialogOverlay class="alert-dialog-overlayClass" />
        <OkuAlertDialogContent class="alert-dialog-contentClass">
          <OkuAlertDialogTitle class="alert-dialog-titleClass">
            Are you sure?
          </OkuAlertDialogTitle>
          <OkuAlertDialogDescription class="alert-dialog-descriptionClass">
            This will do a very dangerous thing. Thar be dragons!
          </OkuAlertDialogDescription>
          <OkuAlertDialogAction class="alert-dialog-actionClass">
            yolo, do it
          </OkuAlertDialogAction>
          <OkuAlertDialogCancel class="alert-dialog-cancelClass">
            maybe not
          </OkuAlertDialogCancel>
        </OkuAlertDialogContent>
      </OkuAlertDialogPortal>
    </OkuAlertDialog>
  </div>
</template>
