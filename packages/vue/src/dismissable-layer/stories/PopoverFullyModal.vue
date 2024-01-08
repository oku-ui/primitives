<script setup lang="ts">
import DummyPopover from './DummyPopover.vue'

const SYSTEM_FONT = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'

function alert(text: string) {
  // eslint-disable-next-line no-alert
  window.alert(text)
}
</script>

<template>
  <div :style="{ height: '300vh', fontFamily: SYSTEM_FONT }">
    <h1>Popover (fully modal example)</h1>
    <ul :style="{ listStyle: 'none', padding: '0px', marginBottom: '30px' }">
      <li>✅ focus should move inside `Popover` when mounted</li>
      <li>✅ focus should be trapped inside `Popover`</li>
      <li>✅ scrolling outside `Popover` should be disabled</li>
      <li>✅ should be able to dismiss `Popover` on pressing escape</li>
      <li :style="{ marginLeft: '30px' }">
        ✅ focus should return to the open button
      </li>
      <li>
        ✅ interacting outside `Popover` should be disabled (clicking the "alert me" button
        shouldn't do anything)
      </li>
      <li>➕</li>
      <li>✅ should be able to dismiss `Popover` when interacting outside</li>
      <li :style="{ marginLeft: '30px' }">
        ✅ focus should return to the open button
      </li>
    </ul>

    <div :style="{ display: 'flex', gap: '10px' }">
      <DummyPopover
        open-label="Open Popover"
        close-label="Close Popover"
        disable-outside-pointer-events
        prevent-scroll
      />
      <input type="text" defaultValue="some input">
      <button type="button" @click="alert('clicked!')">
        Alert me
      </button>
    </div>
  </div>
</template>
