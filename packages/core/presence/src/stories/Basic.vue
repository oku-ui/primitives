<script setup lang="ts">
import { ref } from 'vue'
import { OkuPresence } from '@oku-ui/presence'

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
