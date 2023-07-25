<script setup lang="ts">
import { ref } from 'vue'
import { OkuSliderTrack } from '../SliderTrack'
import { OkuSlider } from '../Slider'
import { OkuSliderRange } from '../SliderRange'
import { OkuSliderThumb } from '../SliderThumb'

const val = ref(0)
</script>

<template>
  <div>
    <div>
      <h1>Oku Default Slider</h1>
      <form>
        <OkuSlider v-model="val" :min="-30" :max="200" class="SliderRoot">
          <OkuSliderTrack class="SliderTrack">
            <OkuSliderRange class="SliderRange" />
          </OkuSliderTrack>
          <OkuSliderThumb class="SliderThumb" />
        </OkuSlider>
        {{ val }}
      </form>
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
