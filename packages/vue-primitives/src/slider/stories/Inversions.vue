<script setup lang="ts">
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from '../index.ts'
import './styles.css'
</script>

<template>
  <h1>Inversions</h1>
  <h2>Horizontal</h2>
  <div :style="{ display: 'flex', gap: '50px' }">
    <div :style="{ flex: 1 }">
      <h3>LTR</h3>
      <h4>default</h4>
      <SliderRoot class="slider_rootClass" :default-value="[20]">
        <SliderTrack class="slider_trackClass">
          <SliderRange class="slider_rangeClass" />
        </SliderTrack>
        <SliderThumb class="slider_thumbClass" />
      </SliderRoot>

      <h4>Inverted</h4>
      <SliderRoot class="slider_rootClass" :default-value="[20]" inverted>
        <SliderTrack class="slider_trackClass">
          <SliderRange class="slider_rangeClass" />
        </SliderTrack>
        <SliderThumb class="slider_thumbClass" />
      </SliderRoot>
    </div>

    <div :style="{ flex: 1 }">
      <h3>RTL</h3>
      <h4>Default</h4>
      <SliderRoot class="slider_rootClass" :default-value="[20]" dir="rtl">
        <SliderTrack class="slider_trackClass">
          <SliderRange class="slider_rangeClass" />
        </SliderTrack>
        <SliderThumb class="slider_thumbClass" />
      </SliderRoot>

      <h4>Inverted</h4>
      <SliderRoot class="slider_rootClass" :default-value="[20]" dir="rtl" inverted>
        <SliderTrack class="slider_trackClass">
          <SliderRange class="slider_rangeClass" />
        </SliderTrack>
        <SliderThumb class="slider_thumbClass" />
      </SliderRoot>
    </div>
  </div>

  <h2>Vertical</h2>
  <div :style="{ display: 'flex', gap: '50px' }">
    <div :style="{ flex: 1 }">
      <h3>LTR</h3>
      <div :style="{ display: 'flex', gap: '50px' }">
        <div>
          <h4>Default</h4>
          <SliderRoot class="slider_rootClass" :default-value="[20]" orientation="vertical">
            <SliderTrack class="slider_trackClass">
              <SliderRange class="slider_rangeClass" />
            </SliderTrack>
            <SliderThumb class="slider_thumbClass" />
          </SliderRoot>
        </div>

        <div>
          <h4>Inverted</h4>
          <SliderRoot
            class="slider_rootClass"
            :default-value="[20]"
            orientation="vertical"
            inverted
          >
            <SliderTrack class="slider_trackClass">
              <SliderRange class="slider_rangeClass" />
            </SliderTrack>
            <SliderThumb class="slider_thumbClass" />
          </SliderRoot>
        </div>
      </div>
    </div>

    <div :style="{ flex: 1 }">
      <h3>RTL</h3>
      <div :style="{ display: 'flex', gap: '50px' }">
        <div>
          <h4>Default</h4>
          <SliderRoot
            class="slider_rootClass"
            :default-value="[20]"
            dir="rtl"
            orientation="vertical"
          >
            <SliderTrack class="slider_trackClass">
              <SliderRange class="slider_rangeClass" />
            </SliderTrack>
            <SliderThumb class="slider_thumbClass" />
          </SliderRoot>
        </div>

        <div>
          <h4>Inverted</h4>
          <SliderRoot
            class="slider_rootClass"
            :default-value="[20]"
            dir="rtl"
            orientation="vertical"
            inverted
          >
            <SliderTrack class="slider_trackClass">
              <SliderRange class="slider_rangeClass" />
            </SliderTrack>
            <SliderThumb class="slider_thumbClass" />
          </SliderRoot>
        </div>
      </div>
    </div>
  </div>
</template>
