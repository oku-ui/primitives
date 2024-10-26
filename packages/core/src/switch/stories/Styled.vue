<script setup lang="ts">
import { Label } from '../../label/index.ts'
import { SwitchRoot, SwitchThumb } from '../index.ts'
import './styles.css'
</script>

<template>
  <div>
    <p>This switch is nested inside a label. The state is uncontrolled.</p>
    <Label>
      This is the label{{ ' ' }}
      <SwitchRoot class="switch_rootClass">
        <SwitchThumb class="switch_thumbClass" />
      </SwitchRoot>
    </Label>
  </div>
</template>
