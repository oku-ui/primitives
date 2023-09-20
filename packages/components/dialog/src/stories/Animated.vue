<script setup lang="ts">
import { OkuDialog, OkuDialogClose, OkuDialogContent, OkuDialogDescription, OkuDialogOverlay, OkuDialogPortal, OkuDialogTitle, OkuDialogTrigger } from '@oku-ui/dialog'
import { ref } from 'vue'

// TODO: waiting fix focusScope unmounted
const open = ref(false)
</script>

<template>
  <div>
    <OkuDialog v-model="open">
      <OkuDialogTrigger class="dialog_triggerClass">
        open
      </OkuDialogTrigger>
      <OkuDialogPortal>
        <OkuDialogOverlay class="dialog_animatedOverlayClass" />
        <OkuDialogContent
          class="dialog_animatedContentClass"
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
