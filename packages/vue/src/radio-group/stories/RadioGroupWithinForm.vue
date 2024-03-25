<script setup lang="ts">
import { ref, toRaw } from 'vue'
import { OkuRadioGroup, OkuRadioGroupIndicator, OkuRadioGroupItem } from '@oku-ui/radio-group'

const data = ref({ optional: '', required: '', stopprop: '' })

function handleFormChange(event: Event) {
  const radio = event.target as HTMLInputElement
  const prevData = toRaw(data.value)
  data.value = { ...prevData, [radio.name]: radio.value }
}
</script>

<template>
  <div>
    <h1>Within form</h1>
    <form
      @submit.prevent=""
      @change="handleFormChange"
    >
      <fieldset>
        <legend>optional value: { data.optional }</legend>
        <OkuRadioGroup class="radio-group-root" name="optional">
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
      </fieldset>

      <br>
      <br>

      <fieldset>
        <legend>required value: { data.required }</legend>
        <OkuRadioGroup class="radio-group-root" name="required" required>
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
      </fieldset>

      <br>
      <br>

      <fieldset>
        <legend>stop propagation value: { data.stopprop }</legend>
        <OkuRadioGroup class="radio-group-root" name="stopprop">
          <OkuRadioGroupItem class="radio-group-item" value="1" @click="(event: Event) => event.stopPropagation()">
            <OkuRadioGroupIndicator class="radio-group-indicator" />
          </OkuRadioGroupItem>
          <OkuRadioGroupItem class="radio-group-item" value="2" @click="(event: Event) => event.stopPropagation()">
            <OkuRadioGroupIndicator class="radio-group-indicator" />
          </OkuRadioGroupItem>
          <OkuRadioGroupItem class="radio-group-item" value="3" @click="(event: Event) => event.stopPropagation()">
            <OkuRadioGroupIndicator class="radio-group-indicator" />
          </OkuRadioGroupItem>
        </OkuRadioGroup>
      </fieldset>

      <br>
      <br>

      <button>Submit</button>
    </form>
  </div>
</template>

<style>
/* Variables */
:root {
  --gray300: #ccc;
  --red: #ff0000;
  --colors-red: #ff5555;
}

/* Root  */
.radio-group-root {
  display: inline-block;
  vertical-align: middle;
  cursor: default;
}

/* Radio Group Item */
.radio-group-item {
  vertical-align: middle;
  width: 30px;
  height: 30px;
  display: inline-grid;
  padding: 0;
  place-items: center;
  border: 1px solid var(--gray300);
  border-radius: 9999px;

  &:focus {
    outline: none;
    border-color: var(--red);
    box-shadow: 0 0 0 1px var(--colors-red);
  }

  &[data-disabled] {
    opacity: 0.5;
  }
}

/* Indicator */
.radio-group-indicator {
  width: 18px;
  height: 18px;
  background-color: var(--red);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: inherit;
}

/* Styles */
.radio-group-styles {
  background-color: rgba(0, 0, 255, 0.3);
  border: 2px solid blue;
  padding: 10px;

  &[tabindex="0"] {
    box-shadow: inset 0 0 0 2px yellow;
  }

  &:disabled {
    opacity: 0.5;
  }

  &[data-disabled] {
    border-style: dashed;
  }

  &[data-state="unchecked"] {
    border-color: red;
  }

  &[data-state="checked"] {
    border-color: green;
  }
}
</style>
