<script setup lang="ts">
import { OkuDialog, OkuDialogClose, OkuDialogContent, OkuDialogDescription, OkuDialogOverlay, OkuDialogPortal, OkuDialogTitle, OkuDialogTrigger } from '@oku-ui/dialog'
import { ref } from 'vue'

const open = ref(false)

function pointerDown(event: any) {
  event.preventDefault()
}
</script>

<template>
  <div>
    <OkuDialog v-model="open">
      <OkuDialogTrigger class="dialog_triggerClass">
        open
      </OkuDialogTrigger>
      <OkuDialogPortal>
        <OkuDialogOverlay class="dialog_overlayClass" />
        <OkuDialogContent
          class="dialog_contentDefaultClass"
          @pointerdown-outside="pointerDown"
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
  </div>
</template>
