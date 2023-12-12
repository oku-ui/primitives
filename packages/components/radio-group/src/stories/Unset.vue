<script setup lang="ts">
import { OkuRadioGroup, OkuRadioGroupIndicator, OkuRadioGroupItem } from '@oku-ui/radio-group'
import Label from './Label.vue'
</script>

<template>
  <Label>
    Favourite pet
    <OkuRadioGroup class="radio-group-root">
      <Label>
        <OkuRadioGroupItem class="radio-group-item" value="1">
          <OkuRadioGroupIndicator class="radio-group-indicator" />
        </OkuRadioGroupItem>
        Cat
      </Label>{{ ' ' }}
      <Label>
        <OkuRadioGroupItem class="radio-group-item" value="2" disabled>
          <OkuRadioGroupIndicator class="radio-group-indicator" />
        </OkuRadioGroupItem>
        Dog
      </Label>{{ ' ' }}
      <Label>
        <OkuRadioGroupItem class="radio-group-item" value="3">
          <OkuRadioGroupIndicator class="radio-group-indicator" />
        </OkuRadioGroupItem>
        Rabbit
      </Label>
    </OkuRadioGroup>
  </Label>
</template>
