<script setup lang="ts">
import { shallowRef } from 'vue'
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from '../index.ts'
import './styles.css'
import serialize from './form-serialize.js'

const initData = {
  single: [0],
  multiple: [10, 15, 20, 80],
  price: {
    min: 30,
    max: 70,
  },
}

const data = shallowRef(initData)
</script>

<template>
  <form
    @submit="(event: Event) => {
      event.preventDefault();
      console.log(serialize(event.currentTarget, { hash: true }));
    }"
    @change="(event) => {
      const formData: any = serialize(event.currentTarget, { hash: true });
      data = formData
    }"
  >
    <fieldset>
      <legend>Single value: {{ String(data.single) }}</legend>
      <SliderRoot name="single" :default-value="initData.single" class="slider_rootClass">
        <SliderTrack class="slider_trackClass">
          <SliderRange class="slider_rangeClass" />
        </SliderTrack>
        <SliderThumb class="slider_thumbClass" />
      </SliderRoot>
    </fieldset>

    <br>
    <br>

    <fieldset>
      <legend>Multiple value: {{ String(data.multiple) }}</legend>
      <SliderRoot name="multiple" :default-value="initData.multiple" class="slider_rootClass">
        <SliderTrack class="slider_trackClass">
          <SliderRange class="slider_rangeClass" />
        </SliderTrack>
        <SliderThumb class="slider_thumbClass" />
        <SliderThumb class="slider_thumbClass" />
        <SliderThumb class="slider_thumbClass" />
        <SliderThumb class="slider_thumbClass" />
      </SliderRoot>
    </fieldset>

    <br>
    <br>

    <fieldset>
      <legend>Multiple values (with named thumbs): {{ JSON.stringify(data.price) }}</legend>
      <SliderRoot :default-value="[initData.price.min, initData.price.max]" class="slider_rootClass">
        <SliderTrack class="slider_trackClass">
          <SliderRange class="slider_rangeClass" />
        </SliderTrack>
        <SliderThumb class="slider_thumbClass" name="price[min]" />
        <SliderThumb class="slider_thumbClass" name="price[max]" />
      </SliderRoot>
    </fieldset>

    <button type="submit">
      Submit
    </button>
  </form>
</template>
