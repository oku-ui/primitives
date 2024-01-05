<script setup lang="ts">
import { OkuToggle } from '@oku-ui/toggle'
</script>

<template>
  <h1>Uncontrolled</h1>
  <h2>Off</h2>
  <OkuToggle class="toggle">
    Toggle
  </OkuToggle>

  <h2>On</h2>
  <OkuToggle class="toggle" default-pressed>
    Toggle
  </OkuToggle>

  <h1>Controlled</h1>
  <h2>Off</h2>
  <OkuToggle class="toggle" :pressed="false">
    Toggle
  </OkuToggle>

  <h2>On</h2>
  <OkuToggle class="toggle" pressed>
    Toggle
  </OkuToggle>

  <h1>Disabled</h1>
  <OkuToggle class="toggle" disabled>
    Toggle
  </OkuToggle>

  <h1>State attributes</h1>
  <OkuToggle class="toggle-attr-styles">
    Toggle
  </OkuToggle>
  <OkuToggle class="toggle-attr-styles" disabled>
    Toggle
  </OkuToggle>
</template>
