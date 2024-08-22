<script setup lang="ts">
import { shallowRef } from 'vue'
import { DismissableLayer } from '../index.ts'

const open = shallowRef(false)
const openButtonRef = shallowRef<HTMLElement>()

const dismissOnEscape = shallowRef(false)
const dismissOnPointerDownOutside = shallowRef(false)
const dismissOnFocusOutside = shallowRef(false)
const disabledOutsidePointerEvents = shallowRef(false)

function openAlert() {
  // eslint-disable-next-line no-alert
  window.alert('hey!')
}
</script>

<template>
  <div>
    <div :style="{ fontFamily: 'sans-serif', textAlign: 'center' }">
      <h1>DismissableLayer</h1>

      <div :style="{ display: 'inline-block', textAlign: 'left', marginBottom: 20 }">
        <label :style="{ display: 'block' }">
          <input
            type="checkbox"
            :checked="dismissOnEscape"
            @change="(event: any) => dismissOnEscape = event.target.checked"
          >
          {{ ' ' }}
          Dismiss on escape?
        </label>

        <label :style="{ display: 'block' }">
          <input
            type="checkbox"
            :checked="dismissOnPointerDownOutside"
            @change="(event: any) => dismissOnPointerDownOutside = (event.target.checked)"
          >{{ ' ' }}
          Dismiss on pointer down outside?
        </label>

        <label :style="{ display: 'block' }">
          <input
            type="checkbox"
            :checked="dismissOnFocusOutside"
            @change="(event: any) => dismissOnFocusOutside = (event.target.checked)"
          >{{ ' ' }}
          Dismiss on focus outside?
        </label>

        <hr>

        <label :style="{ display: 'block' }">
          <input
            type="checkbox"
            :checked="disabledOutsidePointerEvents"
            @change="(event: any) => disabledOutsidePointerEvents = (event.target.checked)"
          >{{ ' ' }}
          Disable outside pointer events?
        </label>
      </div>

      <div :style="{ marginBottom: 20 }">
        <button ref="openButtonRef" type="button" @click="() => open = !open">
          {{ open ? 'Close' : 'Open' }} layer
        </button>
      </div>

      <DismissableLayer
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
        @dismiss="() => open = false"
        @escape-keydown="(event) => {
          if (dismissOnEscape === false) {
            event.preventDefault();
          }
        }"
        @pointerdown-outside="(event) => {
          if (dismissOnPointerDownOutside === false || event.target === openButtonRef) {
            event.preventDefault();
          }
        }"
        @focus-outside="(event) => {
          if (dismissOnFocusOutside === false) {
            event.preventDefault();
          }
        }"
      >
        <input type="text">
      </DismissableLayer>

      <div :style="{ marginBottom: '20px' }">
        <input type="text" value="hello" :style="{ marginRight: '20px' }">
        <button
          type="button"
          @mousedown="openAlert"
        >
          hey!
        </button>
      </div>
    </div>
  </div>
</template>
