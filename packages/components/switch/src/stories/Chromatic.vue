<script setup lang="ts">
import { OkuSwitch, OkuSwitchThumb } from '@oku-ui/switch'
</script>

<template>
  <h1>Uncontrolled</h1>
  <h2>Off</h2>
  <OkuSwitch class="switch">
    <OkuSwitchThumb class="switch-thumb" />
  </OkuSwitch>

  <h2>On</h2>
  <OkuSwitch class="switch" default-checked>
    <OkuSwitchThumb class="switch-thumb" />
  </OkuSwitch>

  <h1>Controlled</h1>
  <h2>Off</h2>
  <OkuSwitch class="switch" :checked="false">
    <OkuSwitchThumb class="switch-thumb" />
  </OkuSwitch>

  <h2>On</h2>
  <OkuSwitch class="switch" checked>
    <OkuSwitchThumb class="switch-thumb" />
  </OkuSwitch>

  <h1>Disabled</h1>
  <OkuSwitch class="switch" disabled>
    <OkuSwitchThumb class="switch-thumb" />
  </OkuSwitch>

  <h1>State attributes</h1>
  <h2>Unchecked</h2>
  <OkuSwitch class="switch-attr-styles">
    <OkuSwitchThumb class="switch-attr-styles" />
  </OkuSwitch>

  <h2>Checked</h2>
  <OkuSwitch class="switch-attr-styles" default-checked>
    <OkuSwitchThumb class="switch-attr-styles" />
  </OkuSwitch>

  <h2>Disabled</h2>
  <OkuSwitch class="switch-attr-styles" default-checked disabled>
    <OkuSwitchThumb class="switch-attr-styles" />
  </OkuSwitch>
</template>
