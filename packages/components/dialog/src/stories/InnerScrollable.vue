<script setup lang="ts">
import { OkuDialog, OkuDialogClose, OkuDialogContent, OkuDialogDescription, OkuDialogOverlay, OkuDialogPortal, OkuDialogTitle, OkuDialogTrigger } from '@oku-ui/dialog'
</script>

<template>
  <div>
    <OkuDialog>
      <OkuDialogTrigger class="triggerClass">
        open
      </OkuDialogTrigger>
      <OkuDialogPortal>
        <OkuDialogOverlay class="overlayClass" />
        <OkuDialogContent class="contentScrollableClass">
          <OkuDialogTitle>
            Booking info
          </OkuDialogTitle>
          <OkuDialogDescription>
            Please enter the info for your booking below.
          </OkuDialogDescription>
          <div
            style="background-color: #eee; height: 500px;"
          />
          <OkuDialogClose class="closeClass">
            close
          </OkuDialogClose>
        </OkuDialogContent>
      </OkuDialogPortal>
    </okudialog>
  </div>
</template>
