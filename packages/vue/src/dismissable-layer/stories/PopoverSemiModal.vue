<script setup lang="ts">
import { ref } from 'vue'
import DummyPopover from './DummyPopover.vue'

const SYSTEM_FONT = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'

const color = ref('royalblue')
const changeColorButtonRef = ref(null)

function alert(text: string) {
  // eslint-disable-next-line no-alert
  window.alert(text)
}
</script>

<template>
  <div :style="{ height: '300vh', fontFamily: SYSTEM_FONT }">
    <h1>Popover (semi-modal example)</h1>
    <ul :style="{ listStyle: 'none', padding: '0px', marginBottom: '30px' }">
      <li>✅ focus should move inside `Popover` when mounted</li>
      <li>✅ focus should be trapped inside `Popover`</li>
      <li>✅ scrolling outside `Popover` should be allowed</li>
      <li>✅ should be able to dismiss `Popover` on pressing escape</li>
      <li :style="{ marginLeft: '30px' }">
        ✅ focus should return to the open button
      </li>
      <li>
        ✅ interacting outside `Popover` should be allowed (clicking the "alert me" button should
        trigger)
      </li>
      <li>➕</li>
      <li>
        ✅ should be able to dismiss `Popover` when interacting outside{{ ' ' }}
        <span :style="{ fontWeight: 600 }">unless specified (ie. change color button)</span>
      </li>
      <li :style="{ marginLeft: '30px' }">
        ✅ focus should <span :style="{ fontWeight: 600 }">NOT</span> return to the open button
        when unmounted, natural focus should occur
      </li>
    </ul>

    <div :style="{ display: 'flex', gap: '10px' }">
      <DummyPopover
        :color="color"
        open-label="Open Popover"
        close-label="Close Popover"
        @pointerdown-outside="(event) => {
          if (event.target === changeColorButtonRef)
            event.preventDefault()
        }"
      />
      <input type="text" defaultValue="some input">
      <button type="button" @click="alert('clicked!')">
        Alert me
      </button>
      <button
        ref="changeColorButtonRef"
        type="button"
        @click="color = color === 'royalblue' ? 'tomato' : 'royalblue'"
      >
        Change color
      </button>
    </div>
  </div>
</template>
