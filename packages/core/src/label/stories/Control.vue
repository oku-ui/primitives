<script setup lang="ts">
import './styles.css'

function onClick() {
  // eslint-disable-next-line no-alert
  window?.alert('clicked')
}
</script>

<template>
  <button class="label_controlClass" @click="onClick">
    Control
  </button>
</template>
