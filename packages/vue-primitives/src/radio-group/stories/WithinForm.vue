<script setup lang="ts">
import { shallowRef } from 'vue'
import { RadioGroup, RadioGroupIndicator, RadioGroupItem } from '../index.ts'
import './styles.css'

const data = shallowRef({ optional: '', required: '', stopprop: '' })

function setData(callback: (prevData: typeof data.value) => typeof data.value) {
  data.value = callback(data.value)
}
</script>

<template>
  <form
    @submit="(event) => event.preventDefault()"
    @change="(event) => {
      const radio = event.target as HTMLInputElement;
      setData((prevData) => ({ ...prevData, [radio.name]: radio.value }));
    }"
  >
    <fieldset>
      <legend>optional value: {{ data.optional }}</legend>
      <RadioGroup class="radioGroup_rootClass" name="optional">
        <RadioGroupItem class="radioGroup_itemClass" value="1">
          <RadioGroupIndicator class="radioGroup_indicatorClass" />
        </RadioGroupItem>
        <RadioGroupItem class="radioGroup_itemClass" value="2">
          <RadioGroupIndicator class="radioGroup_indicatorClass" />
        </RadioGroupItem>
        <RadioGroupItem class="radioGroup_itemClass" value="3">
          <RadioGroupIndicator class="radioGroup_indicatorClass" />
        </RadioGroupItem>
      </RadioGroup>
    </fieldset>

    <br>
    <br>

    <fieldset>
      <legend>required value: {{ data.required }}</legend>
      <RadioGroup class="radioGroup_rootClass" name="required" required>
        <RadioGroupItem class="radioGroup_itemClass" value="1">
          <RadioGroupIndicator class="radioGroup_indicatorClass" />
        </RadioGroupItem>
        <RadioGroupItem class="radioGroup_itemClass" value="2">
          <RadioGroupIndicator class="radioGroup_indicatorClass" />
        </RadioGroupItem>
        <RadioGroupItem class="radioGroup_itemClass" value="3">
          <RadioGroupIndicator class="radioGroup_indicatorClass" />
        </RadioGroupItem>
      </RadioGroup>
    </fieldset>

    <br>
    <br>

    <fieldset>
      <legend>stop propagation value: {{ data.stopprop }}</legend>
      <RadioGroup class="radioGroup_rootClass" name="stopprop">
        <RadioGroupItem
          class="radioGroup_itemClass"
          value="1"
          @click="(event: Event) => event.stopPropagation()"
        >
          <RadioGroupIndicator class="radioGroup_indicatorClass" />
        </RadioGroupItem>
        <RadioGroupItem
          class="radioGroup_itemClass"
          value="2"
          @click="(event: Event) => event.stopPropagation()"
        >
          <RadioGroupIndicator class="radioGroup_indicatorClass" />
        </RadioGroupItem>
        <RadioGroupItem
          class="radioGroup_itemClass"
          value="3"
          @click="(event: Event) => event.stopPropagation()"
        >
          <RadioGroupIndicator class="radioGroup_indicatorClass" />
        </RadioGroupItem>
      </RadioGroup>
    </fieldset>

    <br>
    <br>

    <button>Submit</button>
  </form>
</template>
