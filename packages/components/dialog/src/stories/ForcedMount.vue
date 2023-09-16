<script setup lang="ts">
import { OkuDialog, OkuDialogClose, OkuDialogContent, OkuDialogDescription, OkuDialogOverlay, OkuDialogPortal, OkuDialogTitle, OkuDialogTrigger } from '@oku-ui/dialog'
</script>

<template>
  <div>
    <OkuDialog>
      <OkuDialogTrigger class="triggerClass">
        open
      </OkuDialogTrigger>
      <OkuDialogPortal :force-mount="true">
        <OkuDialogOverlay class="overlayClass" />
        <OkuDialogContent class="contentDefaultClass">
          <OkuDialogTitle>
            Title
          </OkuDialogTitle>
          <OkuDialogDescription>
            Description
          </OkuDialogDescription>
          <OkuDialogClose class="closeClass">
            close
          </OkuDialogClose>
        </OkuDialogContent>
      </OkuDialogPortal>
    </OkuDialog>
  </div>
</template>
