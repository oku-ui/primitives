<script setup lang="ts">
import { OkuPresence } from '@oku-ui/presence'
import { ref } from 'vue'

const open = ref(true)

function toggle() {
  open.value = !open.value
}
</script>

<template>
  <button @click="toggle">
    toggle
  </button>
  <OkuPresence :present="open">
    <div>
      Content
    </div>
  </OkuPresence>
</template>
