<script setup lang="ts">
import { shallowRef } from 'vue'
import { Toggle } from '../index.ts'
import './styles.css'

const pressed = shallowRef(false)
</script>

<template>
  <Toggle v-model:pressed="pressed" class="toggle_root">
    Toggle
  </Toggle>
</template>
