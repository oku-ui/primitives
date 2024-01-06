<script setup lang="ts">
import { ref } from 'vue'
import { OkuFocusScope } from '@oku-ui/focus-scope'
import { OkuDismissableLayer } from '@oku-ui/dismissable-layer'

const open = ref(false)
const openButtonRef = ref<HTMLButtonElement | null>(null)

function alert(text: string) {
  // eslint-disable-next-line no-alert
  window.alert(text)
}
</script>

<template>
  <div :style="{ fontFamily: 'sans-serif', textAlign: 'center' }">
    <h1>DismissableLayer + FocusScope</h1>
    <div :style="{ marginBottom: '20px' }">
      <button ref="openButtonRef" type="button" @click="open = !open">
        {{ open ? 'Close' : 'Open' }} layer
      </button>
    </div>

    <OkuDismissableLayer
      v-if="open"
      as-child
      disable-outside-pointer-events
      @pointerdown-outside="(event) => {
        if (event.target === openButtonRef)
          event.preventDefault()
      }"
      @dismiss="open = false"
    >
      <OkuFocusScope
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
      </OkuFocusScope>
    </OkuDismissableLayer>

    <div :style="{ marginBottom: '20px' }">
      <input type="text" defaultValue="hello" :style="{ marginRight: '20px' }">
      <button type="button" @mousedown="alert('hey!')">
        hey!
      </button>
    </div>
  </div>
</template>
