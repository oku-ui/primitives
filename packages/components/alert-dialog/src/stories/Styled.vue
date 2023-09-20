<script setup lang="ts">
import {
  OkuAlertDialog, OkuAlertDialogAction, OkuAlertDialogCancel, OkuAlertDialogContent, OkuAlertDialogDescription, OkuAlertDialogOverlay, OkuAlertDialogPortal,
  OkuAlertDialogTitle, OkuAlertDialogTrigger,
} from '@oku-ui/alert-dialog'
</script>

<template>
  <div>
    <OkuAlertDialog>
      <OkuAlertDialogTrigger class="alert_dialog_triggerClass">
        delete everything
      </OkuAlertDialogTrigger>
      <OkuAlertDialogPortal>
        <OkuAlertDialogOverlay class="alert_dialog_overlayClass" />
        <OkuAlertDialogContent class="alert_dialog_contentClass">
          <OkuAlertDialogTitle class="alert_dialog_titleClass">
            Are you sure?
          </OkuAlertDialogTitle>
          <OkuAlertDialogDescription class="alert_dialog_descriptionClass">
            This will do a very dangerous thing. Thar be dragons!
          </OkuAlertDialogDescription>
          <OkuAlertDialogAction class="alert_dialog_actionClass">
            yolo, do it
          </OkuAlertDialogAction>
          <OkuAlertDialogCancel class="alert_dialog_cancelClass">
            maybe not
          </OkuAlertDialogCancel>
        </OkuAlertDialogContent>
      </OkuAlertDialogPortal>
    </OkuAlertDialog>
  </div>
</template>
