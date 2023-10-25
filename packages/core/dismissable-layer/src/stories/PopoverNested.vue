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
    <h1>Popover (nested example)</h1>
    <ul :style="{ listStyle: 'none', padding: '0px', marginBottom: '30px' }">
      <li>
        ✅ dismissing a `Popover` by pressing escape should only dismiss that given `Popover`, not
        its parents
      </li>
      <li>
        ✅ interacting outside the blue `Popover` should only dismiss itself and not its parents
      </li>
      <li>✅ interacting outside the red `Popover` should dismiss itself and the black one</li>
      <li>✅ unless the click wasn't outside the black one</li>
      <li>
        ✅ when the blue `Popover` is open, there should be{{ ' ' }}
        <span :style="{ fontWeight: 600 }">NO</span> text cursor above the red or black inputs
      </li>
      <li>
        ✅ when the red `Popover` is open, there should be a text cursor above the black input but
        not the one on the page behind
      </li>
    </ul>

    <div :style="{ display: 'flex', gap: '10px' }">
      <DummyPopover
        :disable-outside-pointer-events="true"
        @interact-outside="console.log('interact outside black')"
      >
        <DummyPopover
          color="tomato"
          open-label="Open red"
          close-label="Close red"
          @interact-outside="console.log('interact outside red')"
        >
          <DummyPopover
            color="royalblue"
            open-label="Open blue"
            close-label="Close blue"
            :disable-outside-pointer-events="true"
            @interact-outside="console.log('interact outside blue')"
          />
        </DummyPopover>
      </DummyPopover>
      <input type="text" defaultValue="some input">
      <button type="button" @click="alert('clicked!')">
        Alert me
      </button>
    </div>
  </div>
</template>
