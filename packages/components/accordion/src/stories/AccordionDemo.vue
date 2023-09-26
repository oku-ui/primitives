<script setup lang="ts">
import Single from './Single.vue'
import Multiple from './Multiple.vue'
import Animated from './Animated.vue'
import Animated2D from './Animated2D.vue'
import AnimatedControlled from './AnimatedControlled.vue'
import OutsideViewport from './OutsideViewport.vue'
import Horizontal from './Horizontal.vue'
import Chromatic from './Chromatic.vue'

export interface OkuAccordionProps {
  template: 'Single' | 'Multiple' | 'Animated' | 'Animated2D' | 'AnimatedControlled' | 'OutsideViewport' | 'Horizontal' | 'Chromatic'
  allshow?: boolean
}

withDefaults(defineProps<OkuAccordionProps>(), {
  template: 'Single',
})
</script>

<template>
  <div v-if="template === 'Single' || allshow">
    <Single />
  </div>
  <div v-if="template === 'Multiple' || allshow">
    <Multiple />
  </div>
  <div v-if="template === 'Animated' || allshow">
    <Animated />
  </div>
  <div v-if="template === 'Animated2D' || allshow">
    <Animated2D />
  </div>
  <div v-if="template === 'AnimatedControlled' || allshow">
    <AnimatedControlled />
  </div>
  <div v-if="template === 'OutsideViewport' || allshow">
    <OutsideViewport />
  </div>
  <div v-if="template === 'Horizontal' || allshow">
    <Horizontal />
  </div>
  <div v-if="template === 'Chromatic' || allshow">
    <Chromatic />
  </div>
</template>

<style>
@keyframes accordion-slide-down {
  from {
    height: 0;
  }

  to {
    height: var(--oku-accordion-content-height);
  }
}

@keyframes accordion-slide-up {
  from {
    height: var(--oku-accordion-content-height);
  }

  to {
    height: 0;
  }
}

@keyframes accordion-open-2D {
  from {
    width: 0;
    height: 0;
  }

  to {
    width: var(--oku-accordion-content-width);
    height: var(--oku-accordion-content-height);
  }
}

@keyframes accordion-close-2D {
  from {
    width: var(--oku-accordion-content-width);
    height: var(--oku-accordion-content-height);
  }

  to {
    width: 0;
    height: 0;
  }
}

.accordion-root {
  font-family: sans-serif;

  &[data-orientation="horizontal"] {
    display: flex;
    max-width: 40em;
    height: 50vh;
  }

  &[data-orientation="vertical"] {
    max-width: 20em;
  }
}

/* accordion-item */
.accordion-item {

  &[data-orientation="horizontal"] {
    display: flex;
    border-right: 1px solid white;
  }

  &[data-orientation="vertical"] {
    border-bottom: 1px solid white;
  }
}

/* accordion-header */
.accordion-header {
  margin: 0px;

  &[data-orientation="horizontal"] {
    height: 100%;
  }
}

/* RECOMMENDED_CSS__ACCORDION__TRIGGER */
.accordion-trigger {
  &[data-orientation="horizontal"] {
    height: 100%;
  }
  &[data-orientation="vertical"] {
    width: 100%;
  }
  text-align: inherit;

  box-sizing: border-box;
  appearance: none;
  border: none;
  padding: 10px;
  background-color: black;
  color: white;
  font-family: inherit;
  font-size: 1.2em;
  --shadow-color: crimson;

  &:focus {
    outline: none;
    box-shadow: inset 0 -5px 0 0 var(--shadow-color);
    color: red;
  }

  &[data-disabled] {
    color: gray;
  }

  &[data-state="open"] {
    background-color: red;
    color: white;

    &:focus {
      --shadow-color: #111;
      color: black;
    }
  }
}

/* accordion-content */
.accordion-content {
  padding: 10px;
  line-height: 1.5;
}

/* animatedContentClass */
.animatedContentClass {
  overflow: hidden;

  &[data-state="open"] {
    animation: accordion-slide-down 300ms ease-out;
  }

  &[data-state="closed"] {
    animation: accordion-slide-up 300ms ease-out;
  }
}

/* accordion-animated-2D-content */
.accordion-animated-2D-content {
  overflow: hidden;

  &[data-state="open"] {
    animation: accordion-open-2D 1000ms ease-out;
  }

  &[data-state="closed"] {
    animation: accordion-close-2D 1000ms ease-out;
  }
}

.accordion-styles {
  background-color: rgba(0, 0, 255, 0.3);
  border: 2px solid blue;
  padding: 10px;

  &[data-state="closed"] {
    border-color: red;
  }

  &[data-state="open"] {
    border-color: green;
  }

  &[data-disabled] {
    border-style: dashed;
  }

  &:disabled {
    opacity: 0.5;
  }
}

.accordion-root-attr {
  background-color: rgba(0, 0, 255, 0.3);
  border: 2px solid blue;
  padding: 10px;

  &[data-state="closed"] {
    border-color: red;
  }

  &[data-state="open"] {
    border-color: green;
  }

  &[data-disabled] {
    border-style: dashed;
  }

  &:disabled {
    opacity: 0.5;
  }
}

.accordion-item-attr {
  background-color: rgba(0, 0, 255, 0.3);
  border: 2px solid blue;
  padding: 10px;

  &[data-state="closed"] {
    border-color: red;
  }

  &[data-state="open"] {
    border-color: green;
  }

  &[data-disabled] {
    border-style: dashed;
  }

  &:disabled {
    opacity: 0.5;
  }
}

.accordion-header-attr {
  background-color: rgba(0, 0, 255, 0.3);
  border: 2px solid blue;
  padding: 10px;

  &[data-state="closed"] {
    border-color: red;
  }

  &[data-state="open"] {
    border-color: green;
  }

  &[data-disabled] {
    border-style: dashed;
  }

  &:disabled {
    opacity: 0.5;
  }
}

.accordion-trigger-attr {
  background-color: rgba(0, 0, 255, 0.3);
  border: 2px solid blue;
  padding: 10px;

  &[data-state="closed"] {
    border-color: red;
  }

  &[data-state="open"] {
    border-color: green;
  }

  &[data-disabled] {
    border-style: dashed;
  }

  &:disabled {
    opacity: 0.5;
  }
}

.accordion-content-attr {
  /* ensure we can see the content (because it has `hidden` attribute) */
  display: block;

  background-color: rgba(0, 0, 255, 0.3);
  border: 2px solid blue;
  padding: 10px;

  &[data-state="closed"] {
    border-color: red;
  }

  &[data-state="open"] {
    border-color: green;
  }

  &[data-disabled] {
    border-style: dashed;
  }

  &:disabled {
    opacity: 0.5;
  }
}
</style>
