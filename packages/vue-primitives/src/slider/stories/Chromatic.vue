<script setup lang="ts">
import { Slider, SliderRange, SliderThumb, SliderTrack } from '../index.ts'
import Inversions from './Inversions.vue'
import './styles.css'
</script>

<template>
  <h1>Uncontrolled</h1>
  <h2>LTR</h2>
  <Slider class="slider_rootClass" :default-value="[20]">
    <SliderTrack class="slider_trackClass">
      <SliderRange class="slider_rangeClass" />
    </SliderTrack>
    <SliderThumb class="slider_thumbClass" />
  </Slider>
  <Slider class="slider_rootClass" :default-value="[10, 30]">
    <SliderTrack class="slider_trackClass">
      <SliderRange class="slider_rangeClass" />
    </SliderTrack>
    <SliderThumb class="slider_thumbClass" />
    <SliderThumb class="slider_thumbClass" />
  </Slider>

  <h2>RTL</h2>
  <Slider class="slider_rootClass" :default-value="[20]" dir="rtl">
    <SliderTrack class="slider_trackClass">
      <SliderRange class="slider_rangeClass" />
    </SliderTrack>
    <SliderThumb class="slider_thumbClass" />
  </Slider>
  <Slider class="slider_rootClass" :default-value="[10, 30]" dir="rtl">
    <SliderTrack class="slider_trackClass">
      <SliderRange class="slider_rangeClass" />
    </SliderTrack>
    <SliderThumb class="slider_thumbClass" />
    <SliderThumb class="slider_thumbClass" />
  </Slider>

  <h2>Multiple ranges</h2>
  <Slider class="slider_rootClass" :default-value="[10, 15, 20, 80]">
    <SliderTrack class="slider_trackClass">
      <SliderRange class="slider_rangeClass" />
    </SliderTrack>
    <SliderThumb class="slider_thumbClass" />
    <SliderThumb class="slider_thumbClass" />
    <SliderThumb class="slider_thumbClass" />
    <SliderThumb class="slider_thumbClass" />
  </Slider>

  <h1>Controlled</h1>
  <h2>LTR</h2>
  <Slider class="slider_rootClass" :value="[20]">
    <SliderTrack class="slider_trackClass">
      <SliderRange class="slider_rangeClass" />
    </SliderTrack>
    <SliderThumb class="slider_thumbClass" />
  </Slider>
  <Slider class="slider_rootClass" :value="[10, 30]">
    <SliderTrack class="slider_trackClass">
      <SliderRange class="slider_rangeClass" />
    </SliderTrack>
    <SliderThumb class="slider_thumbClass" />
    <SliderThumb class="slider_thumbClass" />
  </Slider>

  <h1>Direction</h1>
  <h2>Prop</h2>
  <Slider class="slider_rootClass" :value="[20]" dir="rtl">
    <SliderTrack class="slider_trackClass">
      <SliderRange class="slider_rangeClass" />
    </SliderTrack>
    <SliderThumb class="slider_thumbClass" />
  </Slider>
  <Slider class="slider_rootClass" :value="[10, 30]" dir="rtl">
    <SliderTrack class="slider_trackClass">
      <SliderRange class="slider_rangeClass" />
    </SliderTrack>
    <SliderThumb class="slider_thumbClass" />
    <SliderThumb class="slider_thumbClass" />
  </Slider>

  <h2>Inherited WIP: DirectionProvider</h2>
  <!-- <DirectionProvider dir="rtl"> -->
  <Slider class="slider_rootClass" :value="[20]">
    <SliderTrack class="slider_trackClass">
      <SliderRange class="slider_rangeClass" />
    </SliderTrack>
    <SliderThumb class="slider_thumbClass" />
  </Slider>
  <Slider class="slider_rootClass" :value="[10, 30]">
    <SliderTrack class="slider_trackClass">
      <SliderRange class="slider_rangeClass" />
    </SliderTrack>
    <SliderThumb class="slider_thumbClass" />
    <SliderThumb class="slider_thumbClass" />
  </Slider>
  <!-- </DirectionProvider> -->

  <h1>Scenarios</h1>
  <h2>Extremes</h2>
  <Slider class="slider_rootClass" :default-value="[0, 100]">
    <SliderTrack class="slider_trackClass">
      <SliderRange class="slider_rangeClass" />
    </SliderTrack>
    <SliderThumb class="slider_thumbClass" />
    <SliderThumb class="slider_thumbClass" />
  </Slider>

  <h2>0 case</h2>
  <Slider class="slider_rootClass" :default-value="[0]" :min="-100" :max="100">
    <SliderTrack class="slider_trackClass">
      <SliderRange class="slider_rangeClass" />
    </SliderTrack>
    <SliderThumb class="slider_thumbClass" />
  </Slider>

  <h2>Multiple ranges</h2>
  <Slider class="slider_rootClass" :value="[10, 15, 20, 80]">
    <SliderTrack class="slider_trackClass">
      <SliderRange class="slider_rangeClass" />
    </SliderTrack>
    <SliderThumb class="slider_thumbClass" />
    <SliderThumb class="slider_thumbClass" />
    <SliderThumb class="slider_thumbClass" />
    <SliderThumb class="slider_thumbClass" />
  </Slider>

  <h2>Vertical</h2>
  <div :style="{ display: 'flex' }">
    <Slider class="slider_rootClass" :default-value="[10, 30]" orientation="vertical">
      <SliderTrack class="slider_trackClass">
        <SliderRange class="slider_rangeClass" />
      </SliderTrack>
      <SliderThumb class="slider_thumbClass" />
      <SliderThumb class="slider_thumbClass" />
    </Slider>
    <Slider class="slider_rootClass" :default-value="[20]" orientation="vertical">
      <SliderTrack class="slider_trackClass">
        <SliderRange class="slider_rangeClass" />
      </SliderTrack>
      <SliderThumb class="slider_thumbClass" />
    </Slider>
  </div>

  <h2>Out of bound value (negative)</h2>
  <Slider class="slider_rootClass" :default-value="[-9000]" :min="0" :max="100">
    <SliderTrack class="slider_trackClass">
      <SliderRange class="slider_rangeClass" />
    </SliderTrack>
    <SliderThumb class="slider_thumbClass" />
  </Slider>

  <h2>Out of bound value (positive)</h2>
  <Slider class="slider_rootClass" :default-value="[9000]" :min="0" :max="100">
    <SliderTrack class="slider_trackClass">
      <SliderRange class="slider_rangeClass" />
    </SliderTrack>
    <SliderThumb class="slider_thumbClass" />
  </Slider>

  <h1>Disabled</h1>
  <Slider class="slider_rootClass" :default-value="[20]" disabled>
    <SliderTrack class="slider_trackClass">
      <SliderRange class="slider_rangeClass" />
    </SliderTrack>
    <SliderThumb class="slider_thumbClass" />
  </Slider>

  <Inversions />

  <h1>State attributes</h1>
  <h2>Default</h2>
  <Slider class="slider_rootAttrClass" :default-value="[20]">
    <SliderTrack class="slider_trackAttrClass">
      <SliderRange class="slider_rangeAttrClass" />
    </SliderTrack>
    <SliderThumb class="slider_thumbAttrClass" />
  </Slider>

  <h2>Disabled</h2>
  <Slider class="slider_rootAttrClass" :default-value="[20]" disabled>
    <SliderTrack class="slider_trackAttrClass">
      <SliderRange class="slider_rangeAttrClass" />
    </SliderTrack>
    <SliderThumb class="slider_thumbAttrClass" />
  </Slider>
</template>
