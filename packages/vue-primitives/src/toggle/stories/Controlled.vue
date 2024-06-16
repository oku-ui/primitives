<script setup lang="ts">
import './styles.css'
import { shallowRef } from 'vue'
import { Toggle } from '../index.ts'

const pressed = shallowRef(false)
</script>

<template>
  <Toggle v-model:pressed="pressed" class="toggle_root">
    Toggle
  </Toggle>
</template>
