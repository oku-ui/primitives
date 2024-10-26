<script setup lang="ts">
import { Label } from '../../label/index.ts'
import { CheckboxIndicator, CheckboxRoot } from '../index.ts'
import './styles.css'
</script>

<template>
  <div>
    <p>This checkbox is nested inside a label. The state is uncontrolled.</p>

    <h1>Custom label</h1>
    <Label>
      Label{{ ' ' }}
      <CheckboxRoot class="checkbox_rootClass">
        <CheckboxIndicator class="checkbox_indicatorClass" />
      </CheckboxRoot>
    </Label>

    <br>
    <br>

    <h1>Native label</h1>
    <label>
      Label{{ ' ' }}
      <CheckboxRoot class="checkbox_rootClass">
        <CheckboxIndicator class="checkbox_indicatorClass" />
      </CheckboxRoot>
    </label>

    <h1>Native label + native checkbox</h1>
    <label>
      Label <input type="checkbox">
    </label>

    <h1>Custom label + for</h1>
    <Label for="one">Label</Label>
    <CheckboxRoot id="one" class="checkbox_rootClass">
      <CheckboxIndicator class="checkbox_indicatorClass" />
    </CheckboxRoot>

    <br>
    <br>

    <h1>Native label + for</h1>
    <label for="two">Label</label>
    <CheckboxRoot id="two" class="checkbox_rootClass">
      <CheckboxIndicator class="checkbox_indicatorClass" />
    </CheckboxRoot>

    <h1>Native label + for + native checkbox</h1>
    <label for="three">Label</label>
    <input id="three" type="checkbox">
  </div>
</template>
