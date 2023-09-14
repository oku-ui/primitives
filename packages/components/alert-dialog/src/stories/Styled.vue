<script setup lang="ts">
import {
  OkuAlertDialog, OkuAlertDialogAction, OkuAlertDialogCancel, OkuAlertDialogContent, OkuAlertDialogDescription, OkuAlertDialogOverlay, OkuAlertDialogPortal,
  OkuAlertDialogTitle, OkuAlertDialogTrigger,
} from '@oku-ui/alert-dialog'
</script>

<template>
  <div>
    <OkuAlertDialog>
      <OkuAlertDialogTrigger class="triggerClass">
        delete everything
      </OkuAlertDialogTrigger>
      <OkuAlertDialogPortal>
        <OkuAlertDialogOverlay class="overlayClass" />
        <OkuAlertDialogContent class="contentClass">
          <OkuAlertDialogTitle class="titleClass">
            Are you sure?
          </OkuAlertDialogTitle>
          <OkuAlertDialogDescription class="descriptionClass">
            This will do a very dangerous thing. Thar be dragons!
          </OkuAlertDialogDescription>
          <OkuAlertDialogAction class="actionClass">
            yolo, do it
          </OkuAlertDialogAction>
          <OkuAlertDialogCancel class="cancelClass">
            maybe not
          </OkuAlertDialogCancel>
        </OkuAlertDialogContent>
      </OkuAlertDialogPortal>
    </OkuAlertDialog>
  </div>
</template>
