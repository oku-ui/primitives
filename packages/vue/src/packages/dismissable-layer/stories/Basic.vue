<script setup lang="ts">
import { ref } from 'vue'
import { OkuDismissableLayer } from '@oku-ui/dismissable-layer'

const open = ref(false)
const openButtonRef = ref<HTMLButtonElement | null>(null)

const dismissOnEscape = ref(false)
const dismissOnPointerdownOutside = ref(false)
const dismissOnFocusOutside = ref(false)
const disabledOutsidePointerEvents = ref(false)

function alert(text: string) {
  // eslint-disable-next-line no-alert
  window.alert(text)
}
</script>

<template>
  <div :style="{ fontFamily: 'sans-serif', textAlign: 'center' }">
    <h1>DismissableLayer</h1>

    <div :style="{ display: 'inline-block', textAlign: 'left', marginBottom: '20px' }">
      <label :style="{ display: 'block' }">
        <input
          type="checkbox"
          :checked="dismissOnEscape"
          @change="(event) => dismissOnEscape = (event.target as HTMLInputElement).checked"
        >{{ ' ' }}
        Dismiss on escape?
      </label>

      <label :style="{ display: 'block' }">
        <input
          type="checkbox"
          :checked="dismissOnPointerdownOutside"
          @change="(event) => dismissOnPointerdownOutside = (event.target as HTMLInputElement).checked"
        >{{ ' ' }}
        Dismiss on pointer down outside?
      </label>

      <label :style="{ display: 'block' }">
        <input
          type="checkbox"
          :checked="dismissOnFocusOutside"
          @change="(event) => dismissOnFocusOutside = (event.target as HTMLInputElement).checked"
        >{{ ' ' }}
        Dismiss on focus outside?
      </label>

      <hr>

      <label :style="{ display: 'block' }">
        <input
          type="checkbox"
          :checked="disabledOutsidePointerEvents"
          @change="(event) => disabledOutsidePointerEvents = (event.target as HTMLInputElement).checked"
        >{{ ' ' }}
        Disable outside pointer events?
      </label>
    </div>

    <div :style="{ marginBottom: '20px' }">
      <button ref="openButtonRef" type="button" @click="open = !open">
        {{ open ? 'Close' : 'Open' }} layer
      </button>
    </div>

    <OkuDismissableLayer
      v-if="open"
      :disable-outside-pointer-events="disabledOutsidePointerEvents"
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
      @escape-keydown="(event) => {
        if (dismissOnEscape === false)
          event.preventDefault()
      }"
      @pointerdown-outside="(event) => {
        if (dismissOnPointerdownOutside === false || event.target === openButtonRef)
          event.preventDefault()
      }"
      @focus-outside="(event) => {
        if (dismissOnFocusOutside === false)
          event.preventDefault()
      }"
      @dismiss="() => open = false"
    >
      <input type="text">
    </OkuDismissableLayer>

    <div :style="{ marginBottom: '20px' }">
      <input type="text" defaultValue="hello" :style="{ marginRight: '20px' }">
      <button ref="openButtonRef" type="button" @mousedown="alert('hey!')">
        hey!
      </button>
    </div>
  </div>
</template>
