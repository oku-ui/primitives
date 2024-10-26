<script setup lang="ts">
import { shallowRef } from 'vue'
import { RadioGroupBubbleInput, RadioGroupIndicator, RadioGroupItem, RadioGroupRoot } from '../index.ts'
import './styles.css'

const data = shallowRef({ optional: '', required: '', stopprop: '' })

function setData(callback: (prevData: typeof data.value) => typeof data.value) {
  data.value = callback(data.value)
}
</script>

<template>
  <div>
    <h1>TODO: Within Form</h1>
    <form
      @submit="(event) => event.preventDefault()"
      @change="(event) => {
        const radio = event.target as HTMLInputElement;
        console.log('change', radio.name, radio.value)
        setData((prevData) => ({ ...prevData, [radio.name]: radio.value }));
      }"
    >
      <fieldset>
        <legend>optional value: {{ data.optional }}</legend>
        <RadioGroupRoot class="radioGroup_rootClass" name="optional">
          <RadioGroupItem class="radioGroup_itemClass" value="1">
            <RadioGroupBubbleInput />
            <RadioGroupIndicator class="radioGroup_indicatorClass" />
          </RadioGroupItem>
          <RadioGroupItem class="radioGroup_itemClass" value="2">
            <RadioGroupBubbleInput />
            <RadioGroupIndicator class="radioGroup_indicatorClass" />
          </RadioGroupItem>
          <RadioGroupItem class="radioGroup_itemClass" value="3">
            <RadioGroupBubbleInput />
            <RadioGroupIndicator class="radioGroup_indicatorClass" />
          </RadioGroupItem>
        </RadioGroupRoot>
      </fieldset>

      <br>
      <br>

      <fieldset>
        <legend>required value: {{ data.required }}</legend>
        <RadioGroupRoot class="radioGroup_rootClass" name="required" required>
          <RadioGroupItem class="radioGroup_itemClass" value="1">
            <RadioGroupBubbleInput />
            <RadioGroupIndicator class="radioGroup_indicatorClass" />
          </RadioGroupItem>
          <RadioGroupItem class="radioGroup_itemClass" value="2">
            <RadioGroupBubbleInput />
            <RadioGroupIndicator class="radioGroup_indicatorClass" />
          </RadioGroupItem>
          <RadioGroupItem class="radioGroup_itemClass" value="3">
            <RadioGroupBubbleInput />
            <RadioGroupIndicator class="radioGroup_indicatorClass" />
          </RadioGroupItem>
        </RadioGroupRoot>
      </fieldset>

      <br>
      <br>

      <fieldset>
        <legend>stop propagation value: {{ data.stopprop }}</legend>
        <RadioGroupRoot class="radioGroup_rootClass" name="stopprop">
          <RadioGroupItem
            class="radioGroup_itemClass"
            value="1"
            @click="(event: Event) => event.stopPropagation()"
          >
            <RadioGroupBubbleInput />
            <RadioGroupIndicator class="radioGroup_indicatorClass" />
          </RadioGroupItem>
          <RadioGroupItem
            class="radioGroup_itemClass"
            value="2"
            @click="(event: Event) => event.stopPropagation()"
          >
            <RadioGroupBubbleInput />
            <RadioGroupIndicator class="radioGroup_indicatorClass" />
          </RadioGroupItem>
          <RadioGroupItem
            class="radioGroup_itemClass"
            value="3"
            @click="(event: Event) => event.stopPropagation()"
          >
            <RadioGroupBubbleInput />
            <RadioGroupIndicator class="radioGroup_indicatorClass" />
          </RadioGroupItem>
        </RadioGroupRoot>
      </fieldset>

      <br>
      <br>

      <button>Submit</button>
    </form>
  </div>
</template>
