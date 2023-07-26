<script setup lang="ts">
import type { SliderProps } from '@oku-ui/slider'
import {
  OkuSliderRange,
  OkuSliderRoot,
  OkuSliderThumb,
  OkuSliderTrack,
} from '@oku-ui/slider'
import { ref } from 'vue'

export interface ISliderProps extends SliderProps {
  template?: '#1' | '#2' | '#3' | '#4'
  allshow?: boolean
}

defineProps<ISliderProps>()

const defaultUsage = ref(0)
const outofRange = ref(-10)

// float step
const floatStep = 0.3
const floatVal = ref(0)

const data = ref()

function setData(event: any) {
  const input = event.target as HTMLInputElement
  data.value = {
    ...data.value,
    [input.name]: input.value,
  }
  // eslint-disable-next-line no-console
  console.log(data.value)
}
function sendForm(event: any) {
  // eslint-disable-next-line no-console
  console.log(event, 'sendForm')
  data.value = {
    ...data.value,
    [event.target.name]: event.target.value,
  }
  // eslint-disable-next-line no-console
  console.log(data.value)
}
</script>

<template>
  <div>
    <div>
      <h1>Oku Default Slider</h1>
      <div v-if="template === '#1' || allshow">
        <div class="gap-5 flex flex-col">
          <OkuSliderRoot
            id="slider"
            v-model="defaultUsage"
            class="SliderRoot"
          >
            <OkuSliderTrack class="SliderTrack">
              <OkuSliderRange class="SliderRange" />
            </OkuSliderTrack>
            <OkuSliderThumb class="SliderThumb" />
          </OkuSliderRoot>
          <OkuSliderRoot
            id="slider"
            v-model="defaultUsage"
            class="relative flex items-center select-none touch-none w-64 h-4"
          >
            <OkuSliderTrack class="bg-green-400 relative flex-grow rounded-full h-2">
              <OkuSliderRange class="absolute bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full" />
            </OkuSliderTrack>
            <OkuSliderThumb class="w-3 h-6 bg-gray-400 rounded-xl focus:outline-none hover:shadow-lg hover:shadow-gray-600" />
          </OkuSliderRoot>
        </div>
        {{ defaultUsage }}
      </div>
      <div v-if="template === '#2' || allshow">
        <h1>Oku Slider with float step</h1>
        <OkuSliderRoot
          id="slider"
          v-model="floatVal"
          :step="floatStep"
          class="SliderRoot"
        >
          <OkuSliderTrack class="SliderTrack">
            <OkuSliderRange class="SliderRange" />
          </OkuSliderTrack>
          <OkuSliderThumb class="SliderThumb" />
        </OkuSliderRoot>
        {{ floatVal }}
      </div>
      <div v-if="template === '#3' || allshow">
        <h2>Slider in Form</h2>
        <form
          @submit.prevent="sendForm"
          @change="setData"
        >
          <h3>disabled slider</h3>
          <OkuSliderRoot
            id="slider"
            :step="floatStep"
            :value="50"
            class="SliderRoot"
            disabled
          >
            <OkuSliderTrack class="SliderTrack">
              <OkuSliderRange class="SliderRange" />
            </OkuSliderTrack>
            <OkuSliderThumb class="SliderThumb" />
          </OkuSliderRoot>
          <label>
            <h3>required slider</h3>
            <OkuSliderRoot
              v-model="outofRange"
              name="volume"
              :step="floatStep"
              :min="0"
              :max="50"
              class="SliderRoot"
              required
            >
              <OkuSliderTrack class="SliderTrack">
                <OkuSliderRange class="SliderRange" />
              </OkuSliderTrack>
              <OkuSliderThumb class="SliderThumb" />
            </OkuSliderRoot>
          </label>
          <div>
            current value: {{ outofRange }}
          </div>
          <button type="submit">
            Submit
          </button>
        </form>
      </div>
      <div v-if="template === '#4' || allshow">
        <h1 class="text-3xl">
          Uncontrolled
        </h1>
        <OkuSliderRoot
          v-model="defaultUsage"
          class="SliderRoot"
        >
          <OkuSliderTrack class="SliderTrack">
            <OkuSliderRange class="SliderRange" />
          </OkuSliderTrack>
          <OkuSliderThumb class="SliderThumb" />
        </OkuSliderRoot>
        <h2>disabled</h2>
        <OkuSliderRoot
          v-model="defaultUsage"
          class="SliderRoot"
          disabled
        >
          <OkuSliderTrack class="SliderTrack">
            <OkuSliderRange class="SliderRange" />
          </OkuSliderTrack>
          <OkuSliderThumb class="SliderThumb" />
        </OkuSliderRoot>
        <h1 class="text-3xl">
          Controlled
        </h1>
        <OkuSliderRoot
          :value="50"
          class="SliderRoot"
        >
          <OkuSliderTrack class="SliderTrack">
            <OkuSliderRange class="SliderRange" />
          </OkuSliderTrack>
          <OkuSliderThumb class="SliderThumb" />
        </OkuSliderRoot>
        <h2>disabled</h2>
        <OkuSliderRoot
          :value="50"
          class="SliderRoot"
          disabled
        >
          <OkuSliderTrack class="SliderTrack">
            <OkuSliderRange class="SliderRange" />
          </OkuSliderTrack>
          <OkuSliderThumb class="SliderThumb" />
        </OkuSliderRoot>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.SliderRoot {
  position: relative;
  display: flex;
  align-items: center;
  user-select: none;
  touch-action: none;
  width: 200px;
  height: 20px;
  &[data-disabled] {
    opacity: 0.5;
    cursor: disabled
  }
}

.SliderTrack {
  background-color: #F2F2F2;
  position: relative;
  flex-grow: 1;
  border-radius: 9999px;
  height: 3px;
}

.SliderRange {
  position: absolute;
  background-color: #528bff;
  border-radius: 9999px;
  height: 100%;
}

.SliderThumb {
  display: block;
  width: 20px;
  height: 20px;
  background-color: white;
  box-shadow: 0 2px 10px gray;
  border-radius: 10px;
  cursor: grab;
  transition: box-shadow 0.2s ease-in-out;
}
.SliderThumb:hover {
  box-shadow: 0 2px 10px rgb(89, 89, 89);
}
.SliderThumb:focus {
  border: 2px solid #528bff;
  outline: none;
}
</style>
