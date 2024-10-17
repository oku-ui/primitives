<script setup lang="ts">
import { OkuToggle } from '@oku-ui/toggle'
import { ref } from 'vue'

const pressed = ref(true)
</script>

<template>
  <OkuToggle class="toggle" :pressed="pressed" @pressed-change="pressed = $event">
    {{ pressed ? 'On' : 'Off' }}
  </OkuToggle>
</template>
