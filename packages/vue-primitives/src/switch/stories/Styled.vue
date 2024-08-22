<script setup lang="ts">
import { Label } from '../../label/index.ts'
import { Switch, SwitchThumb } from '../index.ts'
import './styles.css'
</script>

<template>
  <div>
    <p>This switch is nested inside a label. The state is uncontrolled.</p>
    <Label>
      This is the label{{ ' ' }}
      <Switch class="switch_rootClass">
        <SwitchThumb class="switch_thumbClass" />
      </Switch>
    </Label>
  </div>
</template>
