<script setup lang="ts">
import { OkuSwitch, OkuSwitchThumb } from '@oku-ui/switch'
import Label from './Label.vue'
</script>

<template>
  <p>This switch is nested inside a label. The state is uncontrolled.</p>
  <Label>
    This is the label{{ ' ' }}
    <OkuSwitch class="switch">
      <OkuSwitchThumb class="switch-thumb" />
    </OkuSwitch>
  </Label>
</template>
