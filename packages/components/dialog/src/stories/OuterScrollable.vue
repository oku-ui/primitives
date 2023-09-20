<script setup lang="ts">
import { OkuDialog, OkuDialogClose, OkuDialogContent, OkuDialogDescription, OkuDialogOverlay, OkuDialogPortal, OkuDialogTitle, OkuDialogTrigger } from '@oku-ui/dialog'
</script>

<template>
  <div>
    <OkuDialog>
      <OkuDialogTrigger class="dialog_triggerClass">
        open
      </OkuDialogTrigger>
      <div
        style="background-color: #eee;width:300px; height: 1000px;"
      />
      <OkuDialogPortal>
        <OkuDialogOverlay class="dialog_scrollableOverlayClass" />
        <OkuDialogContent class="dialog_contentInScrollableOverlayClass">
          <OkuDialogTitle>
            Booking info
          </OkuDialogTitle>
          <OkuDialogDescription>
            Please enter the info for your booking below.
          </OkuDialogDescription>
          <div
            style="background-color: #eee; height: 500px;"
          />
          <OkuDialogClose class="dialog_closeClass">
            close
          </OkuDialogClose>
        </OkuDialogContent>
      </OkuDialogPortal>
    </OkuDialog>
  </div>
</template>
