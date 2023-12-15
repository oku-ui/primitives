<script setup lang="ts">
import { ref } from 'vue'
import { OkuToggle } from '@oku-ui/toggle'

const pressed = ref(true)
</script>

<template>
  <OkuToggle class="toggle" :pressed="pressed" @pressed-change="pressed = $event">
    {{ pressed ? 'On' : 'Off' }}
  </OkuToggle>
</template>
