<script setup lang="ts">
import { OkuCheckbox, OkuCheckboxIndicator } from '@oku-ui/checkbox'
import Label from './Label.vue'
</script>

<template>
  <p>This checkbox is nested inside a label. The state is uncontrolled.</p>

  <h1>Custom label</h1>
  <Label>
    Label{{ ' ' }}
    <OkuCheckbox class="checkbox">
      <OkuCheckboxIndicator class="checkbox-indicator" />
    </OkuCheckbox>
  </Label>

  <br>
  <br>

  <h1>Native label</h1>
  <label>
    Label{{ ' ' }}
    <OkuCheckbox class="checkbox">
      <OkuCheckboxIndicator class="checkbox-indicator" />
    </OkuCheckbox>
  </label>

  <h1>Native label + native checkbox</h1>
  <label>
    Label <input type="checkbox">
  </label>

  <h1>Custom label + htmlFor</h1>
  <Label for="one">Label</Label>
  <OkuCheckbox id="one" class="checkbox">
    <OkuCheckboxIndicator class="checkbox-indicator" />
  </OkuCheckbox>

  <br>
  <br>

  <h1>Native label + htmlFor</h1>
  <label for="two">Label</label>
  <OkuCheckbox id="two" class="checkbox">
    <OkuCheckboxIndicator class="checkbox-indicator" />
  </OkuCheckbox>

  <h1>Native label + native checkbox</h1>
  <label for="three">Label</label>
  <input id="three" type="checkbox">
</template>
