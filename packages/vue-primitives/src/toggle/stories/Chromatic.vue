<script setup lang="ts">
import { Toggle } from '../index.ts'
import './styles.css'
</script>

<template>
  <h1>Uncontrolled</h1>
  <h2>Off</h2>
  <Toggle class="toggle_root">
    Toggle
  </Toggle>

  <h2>On</h2>
  <Toggle class="toggle_root" default-pressed>
    Toggle
  </Toggle>

  <h1>Controlled</h1>
  <h2>Off</h2>
  <Toggle class="toggle_root" :pressed="false">
    Toggle
  </Toggle>

  <h2>On</h2>
  <Toggle class="toggle_root" pressed>
    Toggle
  </Toggle>

  <h1>Disabled</h1>
  <Toggle class="toggle_root" disabled>
    Toggle
  </Toggle>

  <h1>State attributes</h1>
  <Toggle class="toggle_rootAttr">
    Toggle
  </Toggle>
  <Toggle class="toggle_rootAttr" disabled>
    Toggle
  </Toggle>
</template>
