<script setup lang="ts">
import { OkuCheckbox, OkuCheckboxIndicator } from '@oku-ui/checkbox'
</script>

<template>
  <h1>Uncontrolled</h1>
  <h2>Unchecked</h2>
  <OkuCheckbox class="checkbox">
    <OkuCheckboxIndicator class="checkbox-indicator" />
  </OkuCheckbox>

  <h2>Checked</h2>
  <OkuCheckbox class="checkbox" default-checked>
    <OkuCheckboxIndicator class="checkbox-indicator" />
  </OkuCheckbox>

  <h1>Controlled</h1>
  <h2>Unchecked</h2>
  <OkuCheckbox class="checkbox" :checked="false">
    <OkuCheckboxIndicator class="checkbox-indicator" />
  </OkuCheckbox>

  <h2>Checked</h2>
  <OkuCheckbox class="checkbox" checked>
    <OkuCheckboxIndicator class="checkbox-indicator" />
  </OkuCheckbox>

  <h1>Indeterminate</h1>
  <OkuCheckbox class="checkbox" checked="indeterminate">
    <OkuCheckboxIndicator class="checkbox-indicator" />
  </OkuCheckbox>

  <h1>Disabled</h1>
  <OkuCheckbox class="checkbox" default-checked disabled>
    <OkuCheckboxIndicator class="checkbox-indicator" />
  </OkuCheckbox>

  <h1>Force mounted indicator</h1>
  <OkuCheckbox class="checkbox">
    <OkuCheckboxIndicator class="checkbox-indicator" force-mount :style="{ height: '20px' }" />
  </OkuCheckbox>

  <h1>State attributes</h1>
  <h2>Unchecked</h2>
  <OkuCheckbox class="checkbox-attr-styles">
    <OkuCheckboxIndicator class="checkbox-indicator-attr-styles" />
  </OkuCheckbox>

  <h2>Checked</h2>
  <OkuCheckbox class="checkbox-attr-styles" default-checked>
    <OkuCheckboxIndicator class="checkbox-indicator-attr-styles" />
  </OkuCheckbox>

  <h2>Indeterminate</h2>
  <OkuCheckbox class="checkbox-attr-styles" checked="indeterminate">
    <OkuCheckboxIndicator class="checkbox-indicator-attr-styles" />
  </OkuCheckbox>

  <h2>Disabled</h2>
  <OkuCheckbox class="checkbox-attr-styles" default-checked disabled>
    <OkuCheckboxIndicator class="checkbox-indicator-attr-styles" />
  </OkuCheckbox>

  <h2>Force mounted indicator</h2>
  <OkuCheckbox class="checkbox-attr-styles">
    <OkuCheckboxIndicator class="checkbox-indicator-attr-styles" force-mount :style="{ height: '20px' }" />
  </OkuCheckbox>
</template>
