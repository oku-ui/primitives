<script setup lang="ts">
import {
  OkuAlertDialog,
  OkuAlertDialogAction,
  OkuAlertDialogCancel,
  OkuAlertDialogContent,
  OkuAlertDialogDescription,
  OkuAlertDialogOverlay,
  OkuAlertDialogPortal,
  OkuAlertDialogTitle,
  OkuAlertDialogTrigger,
} from '@oku-ui/alert-dialog'
</script>

<template>
  <div>
    <OkuAlertDialog>
      <OkuAlertDialogTrigger class="alert-dialog-trigger">
        delete everything
      </OkuAlertDialogTrigger>
      <OkuAlertDialogPortal>
        <OkuAlertDialogOverlay class="alert-dialog-overlay" />
        <OkuAlertDialogContent class="alert-dialog-content">
          <OkuAlertDialogTitle class="alert-dialog-title">
            Are you sure?
          </OkuAlertDialogTitle>
          <OkuAlertDialogDescription class="alert-dialog-description">
            This will do a very dangerous thing. Thar be dragons!
          </OkuAlertDialogDescription>
          <OkuAlertDialogAction class="alert-dialog-action">
            yolo, do it
          </OkuAlertDialogAction>
          <OkuAlertDialogCancel class="alert-dialog-cancel">
            maybe not
          </OkuAlertDialogCancel>
        </OkuAlertDialogContent>
      </OkuAlertDialogPortal>
    </OkuAlertDialog>
  </div>
</template>
