<script setup lang="ts">
import { Label } from '../../label/index.ts'
import { Checkbox, CheckboxIndicator } from '../index.ts'
import './styles.css'
</script>

<template>
  <div>
    <p>This checkbox is nested inside a label. The state is uncontrolled.</p>

    <h1>Custom label</h1>
    <Label>
      Label{{ ' ' }}
      <Checkbox class="checkbox_rootClass">
        <CheckboxIndicator class="checkbox_indicatorClass" />
      </Checkbox>
    </Label>

    <br>
    <br>

    <h1>Native label</h1>
    <label>
      Label{{ ' ' }}
      <Checkbox class="checkbox_rootClass">
        <CheckboxIndicator class="checkbox_indicatorClass" />
      </Checkbox>
    </label>

    <h1>Native label + native checkbox</h1>
    <label>
      Label <input type="checkbox">
    </label>

    <h1>Custom label + for</h1>
    <Label for="one">Label</Label>
    <Checkbox id="one" class="checkbox_rootClass">
      <CheckboxIndicator class="checkbox_indicatorClass" />
    </Checkbox>

    <br>
    <br>

    <h1>Native label + for</h1>
    <label for="two">Label</label>
    <Checkbox id="two" class="checkbox_rootClass">
      <CheckboxIndicator class="checkbox_indicatorClass" />
    </Checkbox>

    <h1>Native label + for + native checkbox</h1>
    <label for="three">Label</label>
    <input id="three" type="checkbox">
  </div>
</template>
