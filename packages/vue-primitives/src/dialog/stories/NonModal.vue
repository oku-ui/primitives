<script setup lang="ts">
import DialogClose from '../DialogClose.vue'
import DialogDescription from '../DialogDescription.vue'
import DialogTitle from '../DialogTitle.vue'
import { Dialog, DialogContent, DialogPortal, DialogTrigger } from '../index.ts'
import './styles.css'

function preventDefault(event: Event) {
  event.preventDefault()
}
</script>

<template>
  <div>
    <Dialog :modal="false">
      <DialogTrigger class="dialog_triggerClass">
        open (non-modal)
      </DialogTrigger>
      <DialogPortal>
        <DialogContent class="dialog_contentSheetClass" @interact-outside="preventDefault">
          <DialogTitle>Booking info</DialogTitle>
          <DialogDescription>Description</DialogDescription>
          <DialogClose class="dialog_closeClass">
            close
          </DialogClose>
        </DialogContent>
      </DialogPortal>
    </Dialog>

    <div v-for="i in 5" :key="i" :style="{ marginTop: '20px' }">
      <textarea
        :style="{ width: '800px', height: '400px' }"
      >Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat nobis at ipsa, nihil tempora debitis maxime dignissimos non amet, minima expedita alias et fugit voluptate laborum placeat odio dolore ab!</textarea>
    </div>
  </div>
</template>
