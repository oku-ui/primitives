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
    <h1>Popover (non modal example)</h1>
    <ul :style="{ listStyle: 'none', padding: '0px', marginBottom: '30px' }">
      <li>✅ focus should move inside `Popover` when mounted</li>
      <li>
        ✅ focus should <span :style="{ fontWeight: 600 }">NOT</span> be trapped inside `Popover`
      </li>
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
      <li>✅ should be able to dismiss `Popover` when clicking outside</li>
      <li :style="{ marginLeft: '30px' }">
        ✅ focus should <span :style="{ fontWeight: 600 }">NOT</span> return to the open button when
        unmounted, natural focus should occur
      </li>
      <li>✅ should be able to dismiss `Popover` when focus leaves it</li>
      <li :style="{ marginLeft: '30px' }">
        ❓ focus should move to next tabbable element after open button
        <div :style="{ fontWeight: 600 }">
          <span :style="{ marginLeft: '20px' }">notes:</span>
          <ul>
            <li>
              I have left this one out for now as I am still unsure in which case it should do this
            </li>
            <li>
              for the moment, focus will be returned to the open button when `FocusScope` unmounts
            </li>
            <li>Need to do some more thinking, in the meantime, I think this behavior is ok</li>
          </ul>
        </div>
      </li>
    </ul>

    <div :style="{ display: 'flex', gap: '10px' }">
      <DummyPopover open-label="Open Popover" close-label="Close Popover" :trapped="false" />
      <input type="text" defaultValue="some input">
      <button type="button" @click="alert('clicked!')">
        Alert me
      </button>
    </div>
  </div>
</template>
