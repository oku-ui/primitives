<script setup lang="ts">
import { OkuRadioGroup, OkuRadioGroupIndicator, OkuRadioGroupItem } from '@oku-ui/radio-group'
import Label from './Label.vue'
</script>

<template>
  <Label>
    Favourite pet
    <OkuRadioGroup class="radio-group-root" default-value="1">
      <Label>
        <OkuRadioGroupItem class="radio-group-item" value="1">
          <OkuRadioGroupIndicator class="radio-group-animated-indicator radio-group-indicator" />
        </OkuRadioGroupItem>
        Cat
      </Label>{{ ' ' }}
      <Label>
        <OkuRadioGroupItem class="radio-group-item" value="2">
          <OkuRadioGroupIndicator class="radio-group-animated-indicator radio-group-indicator" />
        </OkuRadioGroupItem>
        Dog
      </Label>{{ ' ' }}
      <Label>
        <OkuRadioGroupItem class="radio-group-item" value="3">
          <OkuRadioGroupIndicator class="radio-group-animated-indicator radio-group-indicator" />
        </OkuRadioGroupItem>
        Rabbit
      </Label>
    </OkuRadioGroup>
  </Label>
</template>
