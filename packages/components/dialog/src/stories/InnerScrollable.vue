<script setup lang="ts">
import { OkuDialog, OkuDialogClose, OkuDialogContent, OkuDialogDescription, OkuDialogOverlay, OkuDialogPortal, OkuDialogTitle, OkuDialogTrigger } from '@oku-ui/dialog'
</script>

<template>
  <div>
    <OkuDialog>
      <OkuDialogTrigger class="dialog_triggerClass">
        open
      </OkuDialogTrigger>
      <OkuDialogPortal>
        <OkuDialogOverlay class="dialog_overlayClass" />
        <OkuDialogContent class="dialog_contentScrollableClass">
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
    </okudialog>
  </div>
</template>
