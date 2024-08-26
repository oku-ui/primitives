<script setup lang="ts">
import { shallowRef } from 'vue'
import DialogClose from '../DialogClose.vue'
import DialogDescription from '../DialogDescription.vue'
import DialogTitle from '../DialogTitle.vue'
import { Dialog, DialogContent, DialogOverlay, DialogPortal, DialogTrigger } from '../index.ts'
import './styles.css'

const modal = shallowRef(true)
const animated = shallowRef(false)
const count = shallowRef(0)
const hasDestroyButton = shallowRef(true)

function destroy() {
  hasDestroyButton.value = false
}

function add() {
  count.value += count.value
}
</script>

<template>
  <div>
    <Dialog :key="modal ? 1 : 0" :modal="modal">
      <DialogTrigger class="dialog_triggerClass">
        open
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay class="dialog_overlayClass" />
        <DialogContent :class=" animated ? 'dialog_animatedContentClass' : 'dialog_contentDefaultClass'">
          <DialogTitle>description</DialogTitle>
          <DialogDescription>description</DialogDescription>
          <DialogClose class="dialog_closeClass">
            close
          </DialogClose>
          <div v-if="hasDestroyButton">
            <button type="button" @click="destroy">
              destroy me
            </button>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>

    <br>
    <br>

    <label>
      <input
        v-model="modal"
        type="checkbox"
      >{{ ' ' }}
      modal
    </label>

    <br>

    <label>
      <input
        v-model="animated"
        type="checkbox"
      >{{ ' ' }}
      animated
    </label>

    <br>

    <label>
      count up{{ ' ' }}
      <button type="button" @click="add">
        {{ count }}
      </button>
    </label>

    <br>

    <label>
      name: <input type="text" placeholder="name">
    </label>
  </div>
</template>
