<script setup lang="ts">
import { shallowRef } from 'vue'
import { FocusScope } from '../../focus-scope/index.ts'
import { DismissableLayer, type PointerdownOutsideEvent } from '../index.ts'

const open = shallowRef(false)
const openButtonRef = shallowRef<HTMLElement | null>(null)

function toggleOpen() {
  open.value = !open.value
}

function handlePointerDownOutside(event: PointerdownOutsideEvent) {
  if (event.target === openButtonRef.value) {
    event.preventDefault()
  }
}

function handleDismiss() {
  open.value = false
}

function openAlert() {
  // eslint-disable-next-line no-alert
  window.alert('hey!')
}
</script>

<template>
  <div :style="{ fontFamily: 'sans-serif', textAlign: 'center' }">
    <h1>DismissableLayer + FocusScope</h1>
    <div :style="{ marginBottom: '20px' }">
      <button ref="openButtonRef" type="button" @click="toggleOpen">
        {{ open ? 'Close' : 'Open' }} layer
      </button>
    </div>

    <DismissableLayer
      v-if="open"
      as="template"
      disable-outside-pointer-events
      @pointerdown-outside="handlePointerDownOutside"
      @dismiss="handleDismiss"
    >
      <FocusScope
        trapped
        :style="{
          display: 'inline-flex',
          justifyContent: 'center',
          alignItems: 'center',
          verticalAlign: 'middle',
          width: '400px',
          height: '300px',
          backgroundColor: 'black',
          borderRadius: '10px',
          marginBottom: '20px',
        }"
      >
        <input type="text">
      </FocusScope>
    </DismissableLayer>

    <div :style="{ marginBottom: '20px' }">
      <input type="text" defaultValue="hello" :style="{ marginRight: '20px' }">
      <button type="button" @mousedown="openAlert">
        hey!
      </button>
    </div>
  </div>
</template>
