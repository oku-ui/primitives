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
          <template #default="scope">
            <RadioGroupBubbleInput v-if="scope.isFormControl" v-bind="scope.input" />
            <RadioGroupIndicator class="radioGroup_indicatorClass" />
          </template>
        </RadioGroupItem>
        <RadioGroupItem class="radioGroup_itemClass" value="2">
          <template #default="scope">
            <RadioGroupBubbleInput v-if="scope.isFormControl" v-bind="scope.input" />
            <RadioGroupIndicator class="radioGroup_indicatorClass" />
          </template>
        </RadioGroupItem>
        <RadioGroupItem class="radioGroup_itemClass" value="3">
          <template #default="scope">
            <RadioGroupBubbleInput v-if="scope.isFormControl" v-bind="scope.input" />
            <RadioGroupIndicator class="radioGroup_indicatorClass" />
          </template>
        </RadioGroupItem>
      </RadioGroupRoot>
    </fieldset>

    <br>
    <br>

    <fieldset>
      <legend>required value: {{ data.required }}</legend>
      <RadioGroupRoot class="radioGroup_rootClass" name="required" required>
        <RadioGroupItem class="radioGroup_itemClass" value="1">
          <template #default="scope">
            <RadioGroupBubbleInput v-if="scope.isFormControl" v-bind="scope.input" />
            <RadioGroupIndicator class="radioGroup_indicatorClass" />
          </template>
        </RadioGroupItem>
        <RadioGroupItem class="radioGroup_itemClass" value="2">
          <template #default="scope">
            <RadioGroupBubbleInput v-if="scope.isFormControl" v-bind="scope.input" />
            <RadioGroupIndicator class="radioGroup_indicatorClass" />
          </template>
        </RadioGroupItem>
        <RadioGroupItem class="radioGroup_itemClass" value="3">
          <template #default="scope">
            <RadioGroupBubbleInput v-if="scope.isFormControl" v-bind="scope.input" />
            <RadioGroupIndicator class="radioGroup_indicatorClass" />
          </template>
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
          <template #default="scope">
            <RadioGroupBubbleInput v-if="scope.isFormControl" v-bind="scope.input" />
            <RadioGroupIndicator class="radioGroup_indicatorClass" />
          </template>
        </RadioGroupItem>
        <RadioGroupItem
          class="radioGroup_itemClass"
          value="2"
          @click="(event: Event) => event.stopPropagation()"
        >
          <template #default="scope">
            <RadioGroupBubbleInput v-if="scope.isFormControl" v-bind="scope.input" />
            <RadioGroupIndicator class="radioGroup_indicatorClass" />
          </template>
        </RadioGroupItem>
        <RadioGroupItem
          class="radioGroup_itemClass"
          value="3"
          @click="(event: Event) => event.stopPropagation()"
        >
          <template #default="scope">
            <RadioGroupBubbleInput v-if="scope.isFormControl" v-bind="scope.input" />
            <RadioGroupIndicator class="radioGroup_indicatorClass" />
          </template>
        </RadioGroupItem>
      </RadioGroupRoot>
    </fieldset>

    <br>
    <br>

    <button>Submit</button>
  </form>
</template>
