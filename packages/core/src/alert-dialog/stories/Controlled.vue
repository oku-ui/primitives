<script setup lang="ts">
import { shallowRef } from 'vue'
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogOverlay, AlertDialogPortal, AlertDialogRoot, AlertDialogTitle, AlertDialogTrigger } from '../index.ts'
import './styles.css'

const open = shallowRef(false)
const housePurchased = shallowRef(false)

function onCliclTrigger(event: Event) {
  if (housePurchased.value) {
    event.preventDefault()
    housePurchased.value = false
  }
}

function onAction() {
  housePurchased.value = true
}
</script>

<template>
  <div>
    <div>
      <img src="https://i.ibb.co/K54hsKt/house.jpg" alt="a large white house with a red roof">
    </div>
    <AlertDialogRoot v-model:open="open">
      <AlertDialogTrigger class="alertDialog_triggerClass" @click="onCliclTrigger">
        {{ housePurchased ? 'You bought the house! Sell it!' : 'Buy this house' }}
      </AlertDialogTrigger>
      <AlertDialogPortal>
        <AlertDialogOverlay class="alertDialog_overlayClass" />
        <AlertDialogContent class="alertDialog_contentClass">
          <AlertDialogTitle class="alertDialog_titleClass">
            Are you sure?
          </AlertDialogTitle>
          <AlertDialogDescription class="alertDialog_descriptionClass">
            Houses are very expensive and it looks like you only have €20 in the bank. Maybe
            consult with a financial advisor?
          </AlertDialogDescription>
          <AlertDialogAction class="alertDialog_actionClass" @click="onAction">
            buy it anyway
          </AlertDialogAction>
          <AlertDialogCancel class="alertDialog_cancelClass">
            good point, I'll reconsider
          </AlertDialogCancel>
        </AlertDialogContent>
      </AlertDialogPortal>
    </AlertDialogRoot>
  </div>
</template>
