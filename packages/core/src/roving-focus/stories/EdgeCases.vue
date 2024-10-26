<script setup lang="ts">
import { shallowRef } from 'vue'
import Button from './Button.vue'
import ButtonGroup from './ButtonGroup.vue'

const extra = shallowRef(false)
const disabled = shallowRef(false)
const hidden = shallowRef(false)
const disabled3To5 = shallowRef(false)

function setExtra() {
  extra.value = !extra.value
}

function setDisabled() {
  disabled.value = !disabled.value
}

function setHidden() {
  hidden.value = !hidden.value
}

function setDisabled3To5() {
  disabled3To5.value = !disabled3To5.value
}
</script>

<template>
  <button @click="setExtra">
    Add/remove extra
  </button>
  <button @click="setDisabled">
    Disable/Enable "One"
  </button>
  <button @click="setHidden">
    Hide/show "One"
  </button>
  <button @click="setDisabled3To5">
    Disable/Enable "Three" to "Five"
  </button>
  <hr>

  <ButtonGroup>
    <Button v-if="extra" value="extra">
      Extra
    </Button>
    <Button value="one" :disabled="disabled" :style="{ display: hidden ? 'none' : undefined }">
      One
    </Button>
    <Button value="two" disabled>
      Two
    </Button>
    <Button value="three" :disabled="disabled3To5">
      Three
    </Button>
    <Button value="four" :disabled="disabled3To5" :style="{ display: 'none' }">
      Four
    </Button>
    <Button value="five" :disabled="disabled3To5">
      Five
    </Button>
  </ButtonGroup>

  <hr>
  <button type="button">
    Focusable outside of group
  </button>
</template>
