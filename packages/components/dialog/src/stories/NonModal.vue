<script setup lang="ts">
import { OkuDialog, OkuDialogClose, OkuDialogContent, OkuDialogDescription, OkuDialogOverlay, OkuDialogPortal, OkuDialogTitle, OkuDialogTrigger } from '@oku-ui/dialog'
</script>

<template>
  <div>
    <OkuDialog :modal="false">
      <OkuDialogTrigger class="dialog-triggerClass">
        open (non-modal)
      </OkuDialogTrigger>
      <OkuDialogPortal>
        <OkuDialogOverlay class="dialog-overlayClass" />
        <OkuDialogContent class="dialog-contentSheetClass" :on-interact-outside="(event) => event.preventDefault()">
          <OkuDialogTitle>
            Booking info
          </OkuDialogTitle>
          <OkuDialogDescription>
            Please enter the info for your booking below.
          </OkuDialogDescription>
          <OkuDialogClose class="dialog-closeClass">
            close
          </OkuDialogClose>
        </OkuDialogContent>
      </OkuDialogPortal>
    </OkuDialog>
    <div v-for="i in 5" :key="i" style="margin-top:20px">
      <textarea
        style="width: 800px; height: 400px;border: solid 1px;"
        defaultValue="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat nobis at ipsa, nihil tempora debitis maxime dignissimos non amet, minima expedita alias et fugit voluptate laborum placeat odio dolore ab!"
      />
    </div>
  </div>
</template>
