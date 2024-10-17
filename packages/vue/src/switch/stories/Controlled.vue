<script setup lang="ts">
import { OkuSwitch, OkuSwitchThumb } from '@oku-ui/switch'
import { ref } from 'vue'
import Label from './Label.vue'

const checked = ref<boolean>(true)
</script>

<template>
  <p>This switch is placed adjacent to its label. The state is controlled.</p>
  <Label for="randBox">This is the label</Label>{{ ' ' }}
  <OkuSwitch
    id="randBox"
    class="switch"
    :checked="checked"
    @checked-change="checked = $event"
  >
    <OkuSwitchThumb class="switch-thumb" />
  </OkuSwitch>
</template>
