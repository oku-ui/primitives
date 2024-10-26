<script setup lang="ts">
import { shallowRef } from 'vue'
import { DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogRoot, DialogTitle, DialogTrigger } from '../index.ts'
import './styles.css'

const firstNameRef = shallowRef<HTMLInputElement>()
const searchFieldRef = shallowRef<HTMLInputElement>()
</script>

<template>
  <div>
    <DialogRoot>
      <DialogTrigger>open</DialogTrigger>
      <DialogPortal>
        <DialogOverlay class="dialog_overlayClass" />
        <DialogContent
          class="dialog_contentDefaultClass"
          @open-auto-focus="(event: Event) => {
            event.preventDefault();
            firstNameRef?.focus();
          }"
          @close-auto-focus="(event: Event) => {
            event.preventDefault();
            searchFieldRef?.focus();
          }"
        >
          <DialogClose>close</DialogClose>

          <div>
            <DialogTitle>Title</DialogTitle>
            <DialogDescription>
              The first name input will receive the focus after opening the dialog
            </DialogDescription>
            <label htmlFor="firstName">First Name</label>
            <input id="firstName" ref="firstNameRef" type="text" placeholder="John">

            <label htmlFor="lastName">Last Name</label>
            <input id="lastName" type="text" placeholder="Doe">

            <button type="submit">
              Send
            </button>
          </div>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>

    <div>
      <p>The search input will receive the focus after closing the dialog</p>
      <input ref="searchFieldRef" type="text" placeholder="Search…">
    </div>
  </div>
</template>
