<script setup lang="ts">
import { OkuSlider, OkuSliderRange, OkuSliderThumb, OkuSliderTrack } from '@oku-ui/slider'
</script>

<template>
  <div>
    <OkuSlider class="rootSliderClass">
      <OkuSliderTrack class="trackClass">
        <OkuSliderRange class="rangeClass" />
      </OkuSliderTrack>
      <OkuSliderThumb class="thumbClassT" />
    </OkuSlider>
  </div>
</template>

<style>
.rootSliderClass {
  position: relative;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  /* ensures no selection */
  user-select: none;
  /* disable browser handling of all panning and zooming gestures on touch devices */
  touch-action: none;

  &[data-orientation="horizontal"] {
    height: 25px;
  }
  &[data-orientation="vertical"] {
    flex-direction: column;
    width: 25px;
  }
  &[data-disabled] {
    opacity: 0.5;
  }
}

.trackClass {
  position: relative;
  /* ensures full width in horizontal orientation, ignored in vertical orientation */
  flex-grow: 1;

  background: gainsboro;
  border-radius: 4px;
  &[data-orientation="horizontal"] {
    height: 4px;
  }
  &[data-orientation="vertical"] {
    width: 4px;
    height: 300px;
  }
}

.rangeClass {
  position: absolute;
  /* good default for both orientation (match track width/height respectively) */
  &[data-orientation="horizontal"] {
    height: 100%;
  }
  &[data-orientation="vertical"] {
    width: 100%;
  }

  background: black;
  border-radius: inherit;
}

.thumbClassT {
  /* ensures the thumb is sizeable */
  display: block;

  /* Add recommended target size regardless of styled size */
  &::before {
    content: "";
    position: absolute;
    z-index: -1;
    width: 44px;
    height: 44px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  border-radius: 25px;
  width: 25px;
  height: 25px;
  background-color: black;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px red;
  }

  display: inline-grid;
  place-items: center;
  &:after {
    content: attr(aria-valuenow);
    position: relative;
    font-size: 10px;
    color: white;
  }
}

.rootAttrClass {
  position: relative;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  /* ensures no selection */
  user-select: none;
  /* disable browser handling of all panning and zooming gestures on touch devices */
  touch-action: none;

  background-color: rgba(0, 0, 255, 0.3);
  border: 2px solid blue;
  padding: 10px;

  &[data-disabled] {
    border-style: dashed;
  }
}

.trackAttrClass {
  position: relative;
  /* ensures full width in horizontal orientation, ignored in vertical orientation */
  flex-grow: 1;

  background-color: rgba(0, 0, 255, 0.3);
  border: 2px solid blue;
  padding: 10px;
}

.rangeAttrClass {
  position: absolute;

  &[data-orientation="horizontal"] {
    height: 100%;
  }

  &[data-orientation="vertical"] {
    width: 100%;
  }

  background-color: rgba(0, 0, 255, 0.3);
  border: 2px solid blue;
  padding: 10px;
}

.thumbAttrClass {
  /* ensures the thumb is sizeable */
  display: block;

  /* Add recommended target size regardless of styled size */
  &::before {
    content: "";
    position: absolute;
    z-index: -1;
    width: 44px;
    height: 44px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  background-color: rgba(0, 0, 255, 0.3);
  border: 2px solid blue;
  padding: 10px;
}
</style>
