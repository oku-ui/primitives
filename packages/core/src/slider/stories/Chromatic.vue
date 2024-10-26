<script setup lang="ts">
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from '../index.ts'
import Inversions from './Inversions.vue'
import './styles.css'
</script>

<template>
  <h1>Uncontrolled</h1>
  <h2>LTR</h2>
  <SliderRoot class="slider_rootClass" :default-value="[20]">
    <SliderTrack class="slider_trackClass">
      <SliderRange class="slider_rangeClass" />
    </SliderTrack>
    <SliderThumb class="slider_thumbClass" />
  </SliderRoot>
  <SliderRoot class="slider_rootClass" :default-value="[10, 30]">
    <SliderTrack class="slider_trackClass">
      <SliderRange class="slider_rangeClass" />
    </SliderTrack>
    <SliderThumb class="slider_thumbClass" />
    <SliderThumb class="slider_thumbClass" />
  </SliderRoot>

  <h2>RTL</h2>
  <SliderRoot class="slider_rootClass" :default-value="[20]" dir="rtl">
    <SliderTrack class="slider_trackClass">
      <SliderRange class="slider_rangeClass" />
    </SliderTrack>
    <SliderThumb class="slider_thumbClass" />
  </SliderRoot>
  <SliderRoot class="slider_rootClass" :default-value="[10, 30]" dir="rtl">
    <SliderTrack class="slider_trackClass">
      <SliderRange class="slider_rangeClass" />
    </SliderTrack>
    <SliderThumb class="slider_thumbClass" />
    <SliderThumb class="slider_thumbClass" />
  </SliderRoot>

  <h2>Multiple ranges</h2>
  <SliderRoot class="slider_rootClass" :default-value="[10, 15, 20, 80]">
    <SliderTrack class="slider_trackClass">
      <SliderRange class="slider_rangeClass" />
    </SliderTrack>
    <SliderThumb class="slider_thumbClass" />
    <SliderThumb class="slider_thumbClass" />
    <SliderThumb class="slider_thumbClass" />
    <SliderThumb class="slider_thumbClass" />
  </SliderRoot>

  <h1>Controlled</h1>
  <h2>LTR</h2>
  <SliderRoot class="slider_rootClass" :value="[20]">
    <SliderTrack class="slider_trackClass">
      <SliderRange class="slider_rangeClass" />
    </SliderTrack>
    <SliderThumb class="slider_thumbClass" />
  </SliderRoot>
  <SliderRoot class="slider_rootClass" :value="[10, 30]">
    <SliderTrack class="slider_trackClass">
      <SliderRange class="slider_rangeClass" />
    </SliderTrack>
    <SliderThumb class="slider_thumbClass" />
    <SliderThumb class="slider_thumbClass" />
  </SliderRoot>

  <h1>Direction</h1>
  <h2>Prop</h2>
  <SliderRoot class="slider_rootClass" :value="[20]" dir="rtl">
    <SliderTrack class="slider_trackClass">
      <SliderRange class="slider_rangeClass" />
    </SliderTrack>
    <SliderThumb class="slider_thumbClass" />
  </SliderRoot>
  <SliderRoot class="slider_rootClass" :value="[10, 30]" dir="rtl">
    <SliderTrack class="slider_trackClass">
      <SliderRange class="slider_rangeClass" />
    </SliderTrack>
    <SliderThumb class="slider_thumbClass" />
    <SliderThumb class="slider_thumbClass" />
  </SliderRoot>

  <h2>Inherited WIP: DirectionProvider</h2>
  <!-- <DirectionProvider dir="rtl"> -->
  <SliderRoot class="slider_rootClass" :value="[20]">
    <SliderTrack class="slider_trackClass">
      <SliderRange class="slider_rangeClass" />
    </SliderTrack>
    <SliderThumb class="slider_thumbClass" />
  </SliderRoot>
  <SliderRoot class="slider_rootClass" :value="[10, 30]">
    <SliderTrack class="slider_trackClass">
      <SliderRange class="slider_rangeClass" />
    </SliderTrack>
    <SliderThumb class="slider_thumbClass" />
    <SliderThumb class="slider_thumbClass" />
  </SliderRoot>
  <!-- </DirectionProvider> -->

  <h1>Scenarios</h1>
  <h2>Extremes</h2>
  <SliderRoot class="slider_rootClass" :default-value="[0, 100]">
    <SliderTrack class="slider_trackClass">
      <SliderRange class="slider_rangeClass" />
    </SliderTrack>
    <SliderThumb class="slider_thumbClass" />
    <SliderThumb class="slider_thumbClass" />
  </SliderRoot>

  <h2>0 case</h2>
  <SliderRoot class="slider_rootClass" :default-value="[0]" :min="-100" :max="100">
    <SliderTrack class="slider_trackClass">
      <SliderRange class="slider_rangeClass" />
    </SliderTrack>
    <SliderThumb class="slider_thumbClass" />
  </SliderRoot>

  <h2>Multiple ranges</h2>
  <SliderRoot class="slider_rootClass" :value="[10, 15, 20, 80]">
    <SliderTrack class="slider_trackClass">
      <SliderRange class="slider_rangeClass" />
    </SliderTrack>
    <SliderThumb class="slider_thumbClass" />
    <SliderThumb class="slider_thumbClass" />
    <SliderThumb class="slider_thumbClass" />
    <SliderThumb class="slider_thumbClass" />
  </SliderRoot>

  <h2>Vertical</h2>
  <div :style="{ display: 'flex' }">
    <SliderRoot class="slider_rootClass" :default-value="[10, 30]" orientation="vertical">
      <SliderTrack class="slider_trackClass">
        <SliderRange class="slider_rangeClass" />
      </SliderTrack>
      <SliderThumb class="slider_thumbClass" />
      <SliderThumb class="slider_thumbClass" />
    </SliderRoot>
    <SliderRoot class="slider_rootClass" :default-value="[20]" orientation="vertical">
      <SliderTrack class="slider_trackClass">
        <SliderRange class="slider_rangeClass" />
      </SliderTrack>
      <SliderThumb class="slider_thumbClass" />
    </SliderRoot>
  </div>

  <h2>Out of bound value (negative)</h2>
  <SliderRoot class="slider_rootClass" :default-value="[-9000]" :min="0" :max="100">
    <SliderTrack class="slider_trackClass">
      <SliderRange class="slider_rangeClass" />
    </SliderTrack>
    <SliderThumb class="slider_thumbClass" />
  </SliderRoot>

  <h2>Out of bound value (positive)</h2>
  <SliderRoot class="slider_rootClass" :default-value="[9000]" :min="0" :max="100">
    <SliderTrack class="slider_trackClass">
      <SliderRange class="slider_rangeClass" />
    </SliderTrack>
    <SliderThumb class="slider_thumbClass" />
  </SliderRoot>

  <h1>Disabled</h1>
  <SliderRoot class="slider_rootClass" :default-value="[20]" disabled>
    <SliderTrack class="slider_trackClass">
      <SliderRange class="slider_rangeClass" />
    </SliderTrack>
    <SliderThumb class="slider_thumbClass" />
  </SliderRoot>

  <Inversions />

  <h1>State attributes</h1>
  <h2>Default</h2>
  <SliderRoot class="slider_rootAttrClass" :default-value="[20]">
    <SliderTrack class="slider_trackAttrClass">
      <SliderRange class="slider_rangeAttrClass" />
    </SliderTrack>
    <SliderThumb class="slider_thumbAttrClass" />
  </SliderRoot>

  <h2>Disabled</h2>
  <SliderRoot class="slider_rootAttrClass" :default-value="[20]" disabled>
    <SliderTrack class="slider_trackAttrClass">
      <SliderRange class="slider_rangeAttrClass" />
    </SliderTrack>
    <SliderThumb class="slider_thumbAttrClass" />
  </SliderRoot>
</template>
