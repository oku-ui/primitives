<script setup lang="ts">
import DummyDialog from './DummyDialog.vue'
import DummyPopover from './DummyPopover.vue'

const SYSTEM_FONT = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'

function alert(text: string) {
  // eslint-disable-next-line no-alert
  window.alert(text)
}
</script>

<template>
  <div :style="{ height: '300vh', fontFamily: SYSTEM_FONT }">
    <h1>Popover (semi-modal) in Dialog (fully modal)</h1>
    <ul :style="{ listStyle: 'none', padding: '0px', marginBottom: '30px' }">
      <li>
        ✅ dismissing `Popover` by pressing escape should{{ ' ' }}
        <span :style="{ fontWeight: 600 }">NOT</span> dismiss `Dialog`
      </li>
      <li>✅ dismissing `Popover` by clicking outside should also dismiss `Dialog`</li>
    </ul>

    <div :style="{ display: 'flex', gap: '10px' }">
      <DummyDialog open-label="Open Dialog" close-label="Close Dialog">
        <DummyPopover open-label="Open Popover" close-label="Close Popover" />
      </DummyDialog>
      <input type="text" defaultValue="some input">
      <button type="button" @click="alert('clicked!')">
        Alert me
      </button>
    </div>
  </div>
</template>
