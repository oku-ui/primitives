<script setup lang="ts">
import { OkuDialog, OkuDialogClose, OkuDialogContent, OkuDialogDescription, OkuDialogOverlay, OkuDialogPortal, OkuDialogTitle, OkuDialogTrigger } from '@oku-ui/dialog'
import { ref } from 'vue'

const open = ref(false)
const portalContainer = ref<HTMLDivElement | null>(null)
</script>

<template>
  <div>
    <OkuDialog v-model="open">
      <OkuDialogTrigger class="dialog_triggerClass">
        open
      </OkuDialogTrigger>
      <OkuDialogPortal :container="portalContainer">
        <OkuDialogOverlay class="dialog_overlayClass" />
        <OkuDialogContent
          class="dialog_contentDefaultClass"
        >
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
    </okudialog>
    <div ref="portalContainer" data-portal-container="" />
  </div>
</template>
