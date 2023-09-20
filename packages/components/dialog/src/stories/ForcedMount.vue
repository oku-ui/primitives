<script setup lang="ts">
import { OkuDialog, OkuDialogClose, OkuDialogContent, OkuDialogDescription, OkuDialogOverlay, OkuDialogPortal, OkuDialogTitle, OkuDialogTrigger } from '@oku-ui/dialog'
</script>

<template>
  <div>
    <OkuDialog>
      <OkuDialogTrigger class="dialog-triggerClass">
        open
      </OkuDialogTrigger>
      <OkuDialogPortal :force-mount="true">
        <OkuDialogOverlay class="dialog-overlayClass" />
        <OkuDialogContent class="dialog-contentDefaultClass">
          <OkuDialogTitle>
            Title
          </OkuDialogTitle>
          <OkuDialogDescription>
            Description
          </OkuDialogDescription>
          <OkuDialogClose class="dialog-closeClass">
            close
          </OkuDialogClose>
        </OkuDialogContent>
      </OkuDialogPortal>
    </OkuDialog>
  </div>
</template>
