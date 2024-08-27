<script setup lang="ts">
import { DialogClose, DialogContent, DialogDescription, DialogPortal, DialogRoot, DialogTitle, DialogTrigger } from '../index.ts'
import './styles.css'

function preventDefault(event: Event) {
  event.preventDefault()
}
</script>

<template>
  <div>
    <DialogRoot :modal="false">
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
    </DialogRoot>

    <div v-for="i in 5" :key="i" :style="{ marginTop: '20px' }">
      <textarea
        :style="{ width: '800px', height: '400px' }"
      >Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat nobis at ipsa, nihil tempora debitis maxime dignissimos non amet, minima expedita alias et fugit voluptate laborum placeat odio dolore ab!</textarea>
    </div>
  </div>
</template>
