<script setup lang="ts">
import { shallowRef } from 'vue'
import { Label } from '../../label/index.ts'
import { SwitchRoot, SwitchThumb } from '../index.ts'
import './styles.css'

const checked = shallowRef(true)
</script>

<template>
  <div>
    <p>This This switch is placed adjacent to its label. The state is controlled.</p>
    <Label for="randBox">
      This is the label
    </Label>
    {{ ' ' }}
    <SwitchRoot id="randBox" v-model:checked="checked" class="switch_rootClass">
      <SwitchThumb class="switch_thumbClass" />
    </SwitchRoot>
  </div>
</template>
