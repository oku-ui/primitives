<script setup lang="ts">
import { reactive, ref } from 'vue'
import { OkuCheckbox, OkuCheckboxIndicator } from '@oku-ui/checkbox'

const data = reactive({ optional: false, required: false, stopprop: false })
const checked = ref<boolean | 'indeterminate'>('indeterminate')
</script>

<template>
  <form
    @submit="(event) => event.preventDefault()"
    @change="(event) => {
      console.log('hello')
      const input = event.target as HTMLInputElement
      console.log(input.name, input.checked)
      data = { ...data, [input.name]: input.checked }
    }"
  >
    <fieldset>
      <legend>optional checked: {{ String(data.optional) }}</legend>
      <label>
        <OkuCheckbox
          class="checkbox"
          name="optional"
          :checked="checked"
          @checked-change="checked = $event"
        >
          <OkuCheckboxIndicator class="checkbox-indicator" />
        </OkuCheckbox>{{ ' ' }}
        with label
      </label>
      <br>
      <br>

      <button
        type="button"
        @click="checked = checked === 'indeterminate' ? false : 'indeterminate'"
      >
        Toggle indeterminate
      </button>
    </fieldset>

    <br>
    <br>

    <fieldset>
      <legend>required checked: {{ String(data.required) }}</legend>
      <OkuCheckbox class="checkbox" name="required" required>
        <OkuCheckboxIndicator class="checkbox-indicator" />
      </OkuCheckbox>
    </fieldset>

    <br>
    <br>

    <fieldset>
      <legend>stop propagation checked: {{ String(data.stopprop) }}</legend>
      <OkuCheckbox
        class="checkbox"
        name="stopprop"
        @click="(event) => event.stopPropagation()"
      >
        <OkuCheckboxIndicator class="checkbox-indicator" />
      </OkuCheckbox>
    </fieldset>

    <br>
    <br>

    <button type="reset">
      Reset
    </button>
    <button>Submit</button>
  </form>
</template>
