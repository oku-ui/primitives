<script setup lang="ts">
import { shallowRef } from 'vue'
import { DismissableLayer } from '../index.ts'

const open = shallowRef(false)
const openButtonRef = shallowRef<HTMLElement | null>(null)

function toggleOpen() {
  open.value = !open.value
}

function handlePointerDownOutside(event: PointerEvent) {
  if (event.target === openButtonRef.value) {
    event.preventDefault()
  }
}

function handleFocusOutside(event: FocusEvent) {
  event.preventDefault()
}

function handleDismiss() {
  open.value = false
}
</script>

<template>
  <DismissableLayer
    :style="{
      display: 'inline-block',
      verticalAlign: 'middle',
      padding: '20px',
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      borderRadius: '10px',
      marginTop: '20px',
    }"
  >
    <div>
      <button ref="openButtonRef" type="button" @click="toggleOpen">
        {{ open ? 'Close' : 'Open' }} new layer
      </button>
    </div>

    <DismissableBox
      v-if="open"
      @pointerdown-outside="handlePointerDownOutside"
      @focus-outside="handleFocusOutside"
      @dismiss="handleDismiss"
    />
  </DismissableLayer>
</template>
