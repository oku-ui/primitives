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
@keyframes slideDown {
  from {
    height: 0;
  }

  to {
    height: var(--oku-accordion-content-height);
  }
}

@keyframes slideUp {
  from {
    height: var(--oku-accordion-content-height);
  }

  to {
    height: 0;
  }
}

@keyframes open2D {
  from {
    width: 0;
    height: 0;
  }

  to {
    width: var(--oku-accordion-content-width);
    height: var(--oku-accordion-content-height);
  }
}

@keyframes close2D {
  from {
    width: var(--oku-accordion-content-width);
    height: var(--oku-accordion-content-height);
  }

  to {
    width: 0;
    height: 0;
  }
}

.rootClass {
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

/* itemClass */
.itemClass {

  &[data-orientation="horizontal"] {
    display: flex;
    border-right: 1px solid white;
  }

  &[data-orientation="vertical"] {
    border-bottom: 1px solid white;
  }
}

/* headerClass */
.headerClass {
  margin: 0px;

  &[data-orientation="horizontal"] {
    height: 100%;
  }
}

/* RECOMMENDED_CSS__ACCORDION__TRIGGER */
.triggerClass {
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

/* contentClass */
.contentClass {
  padding: 10px;
  line-height: 1.5;
}

/* animatedContentClass */
.animatedContentClass {
  overflow: hidden;

  &[data-state="open"] {
    animation: slideDown 300ms ease-out;
  }

  &[data-state="closed"] {
    animation: slideUp 300ms ease-out;
  }
}

/* animated2DContentClass */
.animated2DContentClass {
  overflow: hidden;

  &[data-state="open"] {
    animation: open2D 1000ms ease-out;
  }

  &[data-state="closed"] {
    animation: close2D 1000ms ease-out;
  }
}

.styles {
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

.rootAttrClass {
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

.itemAttrClass {
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

.headerAttrClass {
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

.triggerAttrClass {
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

.contentAttrClass {
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
