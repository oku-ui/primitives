<script setup lang="ts">
import { ref } from 'vue'
import { OkuRadioGroup, OkuRadioGroupIndicator, OkuRadioGroupItem } from '@oku-ui/radio-group'

const data = ref({ optional: '', required: '', stopprop: '' })
</script>

<template>
  <form
    @submit="(event) => event.preventDefault()"
    @change="(event) => {
      const radio = event.target as HTMLInputElement
      data = { ...data, [radio.name]: radio.value }
    }"
  >
    <fieldset>
      <legend>optional value: {{ data.optional }}</legend>
      <OkuRadioGroup class="radio-group" name="optional">
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
      <legend>required value: {{ data.required }}</legend>
      <OkuRadioGroup class="radio-group" name="required" required>
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
      <legend>stop propagation value: {{ data.stopprop }}</legend>
      <OkuRadioGroup class="radio-group" name="stopprop">
        <OkuRadioGroupItem
          class="radio-group-item"
          value="1"
          @click="(event) => event.stopPropagation()"
        >
          <OkuRadioGroupIndicator class="radio-group-indicator" />
        </OkuRadioGroupItem>
        <OkuRadioGroupItem
          class="radio-group-item"
          value="2"
          @click="(event) => event.stopPropagation()"
        >
          <OkuRadioGroupIndicator class="radio-group-indicator" />
        </OkuRadioGroupItem>
        <OkuRadioGroupItem
          class="radio-group-item"
          value="3"
          @click="(event) => event.stopPropagation()"
        >
          <OkuRadioGroupIndicator class="radio-group-indicator" />
        </OkuRadioGroupItem>
      </OkuRadioGroup>
    </fieldset>

    <br>
    <br>

    <button>Submit</button>
  </form>
</template>
