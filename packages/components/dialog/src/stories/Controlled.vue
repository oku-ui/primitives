<script setup lang="ts">
import { OkuDialog, OkuDialogClose, OkuDialogContent, OkuDialogDescription, OkuDialogOverlay, OkuDialogPortal, OkuDialogTitle, OkuDialogTrigger } from '@oku-ui/dialog'
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <OkuDialog v-model="open">
    <OkuDialogTrigger class="dialog_triggerClass">
      {{ open ? 'close' : 'open' }}
    </OkuDialogTrigger>
    <OkuDialogPortal>
      <OkuDialogOverlay class="dialog_overlayClass" />
      <OkuDialogContent class="dialog_contentDefaultClass">
        <OkuDialogTitle>
          Title
        </OkuDialogTitle>
        <OkuDialogDescription>
          Description
        </OkuDialogDescription>
        <OkuDialogClose>
          close
        </OkuDialogClose>
      </OkuDialogContent>
    </OkuDialogPortal>
  </OkuDialog>
</template>
