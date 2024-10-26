<script setup lang="ts">
import { DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogRoot, DialogTitle, DialogTrigger } from '../index.ts'
import './styles.css'
</script>

<template>
  <div>
    <DialogRoot>
      <DialogTrigger>open</DialogTrigger>
      <DialogPortal>
        <DialogOverlay class="dialog_overlayClass" />
        <DialogContent class="dialog_contentDefaultClass">
          <DialogClose>close</DialogClose>
          <DialogTitle>Title</DialogTitle>
          <DialogDescription>Description</DialogDescription>
          <div>
            <label htmlFor="firstName">First Name</label>
            <input id="firstName" type="text" placeholder="John">

            <label htmlFor="lastName">Last Name</label>
            <input id="lastName" type="text" placeholder="Doe">

            <button type="submit">
              Send
            </button>
          </div>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>

    <p>These elements can't be focused when the dialog is opened.</p>
    <button type="button">
      A button
    </button>
    <input type="text" placeholder="Another focusable element">
  </div>
</template>
