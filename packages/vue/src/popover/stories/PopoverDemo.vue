<script setup lang="ts">
import Boundary from './Boundary.vue'
import Styled from './Styled.vue'
import Modality from './Modality.vue'
import Controlled from './Controlled.vue'
import VControlled from './VControlled.vue'
import Animated from './Animated.vue'
import ForcedMount from './ForcedMount.vue'
import Nested from './Nested.vue'
import CustomAnchor from './CustomAnchor.vue'
import WithSlottedTrigger from './WithSlottedTrigger.vue'
import Chromatic from './Chromatic.vue'

export interface OkuPopoverProps {
  template: 'Styled'
    | 'Boundary'
    | 'Modality'
    | 'Controlled'
    | 'VControlled'
    | 'Animated'
    | 'ForcedMount'
    | 'Nested'
    | 'CustomAnchor'
    | 'WithSlottedTrigger'
    | 'Chromatic'
  allshow?: boolean
}

withDefaults(defineProps<OkuPopoverProps>(), {
  template: 'Styled',
  allshow: false,
})
</script>

<template>
  <div v-if="template === 'Styled' || allshow">
    <Styled />
  </div>
  <div v-if="template === 'Boundary' || allshow">
    <Boundary />
  </div>
  <div v-if="template === 'Modality' || allshow">
    <Modality />
  </div>
  <div v-if="template === 'Controlled' || allshow">
    <Controlled />
  </div>
  <div v-if="template === 'VControlled' || allshow">
    <VControlled />
  </div>
  <div v-if="template === 'Animated' || allshow">
    <Animated />
  </div>
  <div v-if="template === 'ForcedMount' || allshow">
    <ForcedMount />
  </div>
  <div v-if="template === 'Nested' || allshow">
    <Nested />
  </div>
  <div v-if="template === 'CustomAnchor' || allshow">
    <CustomAnchor />
  </div>
  <div v-if="template === 'WithSlottedTrigger' || allshow">
    <WithSlottedTrigger />
  </div>
  <div v-if="template === 'Chromatic' || allshow">
    <Chromatic />
  </div>
</template>

<style>
.popover-trigger {

}

.popover-content {
  transform-origin: var(--oku-popover-content-transform-origin);
  background-color: #e5e7eb;
  padding: 20px;
  border-radius: 5px;
}
.popover-close {
}

.popover-arrow {
  fill: #e5e7eb;
}

@keyframes popover-fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes popover-fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.popover-animatedContent {
  transform-origin: var(--oku-popover-content-transform-origin);
  background-color: #e5e7eb;
  padding: 20px;
  border-radius: 5px;

  &[data-state='open'] {
    animation: popover-fadeIn 300ms ease-out;
  }
  &[data-state='closed'] {
    animation: popover-fadeOut 300ms ease-in;
  }
}

.popover-grid {
  display: inline-grid;
  grid-template-columns: repeat(3, 50px);
  column-gap: 150px;
  row-gap: 100px;
  padding: 100px;
  border: 1px solid black;
}

.popover-chromatic-trigger {
  box-sizing: border-box;
  width: 30px;
  height: 30px;
  background-color: tomato;
  border: 1px solid rgba(0, 0, 0, 0.3);
}

.popover-chromatic-content {
  box-sizing: border-box;
  display: grid;
  place-content: center;
  width: 60px;
  height: 60px;
  background-color: royalblue;
  color: white;
  font-size: 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
}

.popover-chromatic-arrow {
  fill: black;
}

.popover-trigger-attr {
  background-color: rgba(0, 0, 255, 0.3);
  border: 2px solid blue;
  padding: 10px;

  &[data-state='closed'] {
    border-color: red;
  }
  &[data-state='open'] {
    border-color: green;
  }
}

.popover-content-attr {
  transform-origin: var(--oku-popover-content-transform-origin);
  background-color: #e5e7eb;
  padding: 20px;
  border-radius: 5px;
  background-color: rgba(0, 0, 255, 0.3);
  border: 2px solid blue;
  padding: 10px;

  &[data-state='closed'] {
    border-color: red;
  }
  &[data-state='open'] {
    border-color: green;
  }
}

.popover-arrow-attr {
  fill: #e5e7eb;
  background-color: rgba(0, 0, 255, 0.3);
  border: 2px solid blue;
  padding: 10px;

  &[data-state='closed'] {
    border-color: red;
  }
  &[data-state='open'] {
    border-color: green;
  }
}

.popover-close-attr {
  background-color: rgba(0, 0, 255, 0.3);
  border: 2px solid blue;
  padding: 10px;

  &[data-state='closed'] {
    border-color: red;
  }
  &[data-state='open'] {
    border-color: green;
  }
}
</style>
