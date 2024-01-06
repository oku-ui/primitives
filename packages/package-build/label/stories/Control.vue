<script setup lang="ts">
function alert(text: string) {
  // eslint-disable-next-line no-alert
  window.alert(text)
}
</script>

<template>
  <button class="label-control" v-bind="$attrs" @click="alert('clicked')">
    Control
  </button>
</template>
