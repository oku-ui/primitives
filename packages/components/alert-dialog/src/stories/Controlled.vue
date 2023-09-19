<script setup lang="ts">
import {
  OkuAlertDialog, OkuAlertDialogAction, OkuAlertDialogCancel, OkuAlertDialogContent, OkuAlertDialogDescription, OkuAlertDialogOverlay, OkuAlertDialogPortal,
  OkuAlertDialogTitle, OkuAlertDialogTrigger,
} from '@oku-ui/alert-dialog'
import { ref } from 'vue'

const open = ref(false)
const housePurchased = ref(false)
</script>

<template>
  <div>
    <div>
      <img
        src="https://images.unsplash.com/photo-1682686580224-cd46ea1a6950?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
        alt="a large white house with a red roof"
      >
    </div>
    <OkuAlertDialog :open="open" @open-change="open = $event">
      <OkuAlertDialogTrigger
        class="triggerClass"
        @click="(e) => {
          console.log('housePurchased', housePurchased)
          if (housePurchased) {
            e.preventDefault();
            housePurchased = false;
          }
        }"
      >
        {{ housePurchased ? 'You bought the house! Sell it!' : 'Buy this house' }}
      </OkuAlertDialogTrigger>
      <OkuAlertDialogPortal>
        <OkuAlertDialogOverlay class="overlayClass" />
        <OkuAlertDialogContent class="contentClass">
          <OkuAlertDialogTitle class="titleClass">
            Are you sure?
          </OkuAlertDialogTitle>
          <OkuAlertDialogDescription class="descriptionClass">
            This will do a very dangerous thing. Thar be dragons!
          </OkuAlertDialogDescription>
          <OkuAlertDialogAction class="actionClass" @click="housePurchased = true">
            yolo, do it
          </OkuAlertDialogAction>
          <OkuAlertDialogCancel class="cancelClass">
            maybe not
          </OkuAlertDialogCancel>
        </OkuAlertDialogContent>
      </OkuAlertDialogPortal>
    </OkuAlertDialog>
  </div>
</template>
