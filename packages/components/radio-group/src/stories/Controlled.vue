<script setup lang="ts">
import { ref } from 'vue'
import { OkuRadioGroup, OkuRadioGroupIndicator, OkuRadioGroupItem } from '@oku-ui/radio-group'

const value = ref('2')
</script>

<template>
  <OkuRadioGroup class="radio-group" :value="value" @value-change="value = $event">
    <OkuRadioGroupItem class="radio-group-item" value="1">
      <OkuRadioGroupIndicator class="radio-group-indicator" />
    </OkuRadioGroupItem>
    <OkuRadioGroupItem class="radio-group-item" value="2">
      <OkuRadioGroupIndicator class="radio-group-indicator" />
    </OkuRadioGroupItem>
    <OkuRadioGroupItem class="radio-group-item" value="3">
      <OkuRadioGroupIndicator class="radio-group-indicator" />
    </OkuRadioGroupItem>
  </OkuRadioGroup>
</template>
