<script setup lang="ts">
import { shallowRef } from 'vue'
import { CheckboxIndicator, CheckboxRoot } from '../index.ts'
import './styles.css'

const data = shallowRef({
  optional: false,
  required: false,
  stopprop: false,
})

const checked = shallowRef<boolean | 'indeterminate'>('indeterminate')

function onChange(event: Event) {
  const input = event.target as HTMLInputElement
  data.value = { ...data.value, [input.name]: input.checked }
}
</script>

<template>
  <form @change="onChange" @submit.prevent="() => { }">
    <fieldset>
      <legend>optional checked: {{ String(data.optional) }}</legend>
      <label>
        <CheckboxRoot v-model:checked="checked" class="checkbox_rootClass" name="optional">
          <CheckboxIndicator class="checkbox_indicatorClass" />
        </CheckboxRoot>{{ ' ' }}
        with label
      </label>
      <br>
      <br>

      <button
        type="button"
        @click="() => {
          checked = checked === 'indeterminate' ? false : 'indeterminate'
        }"
      >
        Toggle indeterminate
      </button>
    </fieldset>

    <br>
    <br>

    <fieldset>
      <legend>required checked: {{ String(data.required) }}</legend>
      <CheckboxRoot class="checkbox_rootClass" name="required" required>
        <CheckboxIndicator class="checkbox_indicatorClass" />
      </CheckboxRoot>
    </fieldset>

    <br>
    <br>

    <fieldset>
      <legend>stop propagation checked: {{ String(data.stopprop) }}</legend>
      <CheckboxRoot class="checkbox_rootClass" name="stopprop" @click="(event: Event) => event.stopPropagation()">
        <CheckboxIndicator class="checkbox_indicatorClass" />
      </CheckboxRoot>
    </fieldset>

    <br>
    <br>

    <button type="reset">
      Reset
    </button>
    <button>Submit</button>
  </form>
</template>
