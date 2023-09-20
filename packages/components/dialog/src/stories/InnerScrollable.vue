<script setup lang="ts">
import { OkuDialog, OkuDialogClose, OkuDialogContent, OkuDialogDescription, OkuDialogOverlay, OkuDialogPortal, OkuDialogTitle, OkuDialogTrigger } from '@oku-ui/dialog'
</script>

<template>
  <div>
    <OkuDialog>
      <OkuDialogTrigger class="dialog-trigger">
        open
      </OkuDialogTrigger>
      <OkuDialogPortal>
        <OkuDialogOverlay class="dialog-overlay" />
        <OkuDialogContent class="dialog-contentScrollable">
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
    </okudialog>
  </div>
</template>
