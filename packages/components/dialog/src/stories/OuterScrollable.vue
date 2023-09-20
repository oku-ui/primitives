<script setup lang="ts">
import { OkuDialog, OkuDialogClose, OkuDialogContent, OkuDialogDescription, OkuDialogOverlay, OkuDialogPortal, OkuDialogTitle, OkuDialogTrigger } from '@oku-ui/dialog'
</script>

<template>
  <div>
    <OkuDialog>
      <OkuDialogTrigger class="dialog-trigger">
        open
      </OkuDialogTrigger>
      <div
        style="background-color: #eee;width:300px; height: 1000px;"
      />
      <OkuDialogPortal>
        <OkuDialogOverlay class="dialog-scrollableOverlay" />
        <OkuDialogContent class="dialog-contentInScrollableOverlay">
          <OkuDialogTitle>
            Booking info
          </OkuDialogTitle>
          <OkuDialogDescription>
            Please enter the info for your booking below.
          </OkuDialogDescription>
          <div
            style="background-color: #eee; height: 500px;"
          />
          <OkuDialogClose class="dialog-close">
            close
          </OkuDialogClose>
        </OkuDialogContent>
      </OkuDialogPortal>
    </OkuDialog>
  </div>
</template>
