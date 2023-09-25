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
  <div v-if="template === 'Single' || allshow" class="flex flex-col w-full">
    <Single />
  </div>
  <div v-if="template === 'Multiple' || allshow" class="flex flex-col w-full">
    <Multiple />
  </div>
  <div v-if="template === 'Animated' || allshow" class="flex flex-col w-full">
    <Animated />
  </div>
  <div v-if="template === 'Animated2D' || allshow" class="flex flex-col w-full">
    <Animated2D />
  </div>
  <div v-if="template === 'AnimatedControlled' || allshow" class="flex flex-col w-full">
    <AnimatedControlled />
  </div>
  <div v-if="template === 'OutsideViewport' || allshow" class="flex flex-col w-full">
    <OutsideViewport />
  </div>
  <div v-if="template === 'Horizontal' || allshow" class="flex flex-col w-full">
    <Horizontal />
  </div>
  <div v-if="template === 'Chromatic' || allshow" class="flex flex-col w-full">
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
  }

  .rootClass[data-orientation="horizontal"] {
    display: flex;
    max-width: 40em;
    height: 50vh;
  }

  .rootClass[data-orientation="vertical"] {
    max-width: 20em;
  }

  /* itemClass */
  .itemClass {
    border-right: 1px solid white;
  }

  .itemClass[data-orientation="horizontal"] {
    display: flex;
  }

  .itemClass[data-orientation="vertical"] {
    border-bottom: 1px solid white;
  }

  /* headerClass */
  .headerClass {
    margin: 0;
  }

  .headerClass[data-orientation="horizontal"] {
    height: 100%;
  }

  /* RECOMMENDED_CSS__ACCORDION__TRIGGER */
  .triggerClass {
    height: 100%;
    width: 100%;
    text-align: inherit;
  }

  .triggerClass[data-orientation="vertical"] {
    width: 100%;
  }

  .triggerClass[data-orientation="horizontal"] {
    height: 100%;
  }

  /* triggerClass */
  .triggerClass {
    box-sizing: border-box;
    appearance: none;
    border: none;
    padding: 10px;
    background-color: black;
    color: white;
    font-family: inherit;
    font-size: 1.2em;
    --shadow-color: crimson;
  }

  .triggerClass:focus {
    outline: none;
    box-shadow: inset 0 -5px 0 0 var(--shadow-color);
    color: red;
  }

  .triggerClass[data-disabled] {
    color: gray;
  }

  .triggerClass[data-state="open"] {
    background-color: red;
    color: white;
  }

  .triggerClass[data-state="open"]:focus {
    --shadow-color: #111;
    color: black;
  }

  /* contentClass */
  .contentClass {
    padding: 10px;
    line-height: 1.5;
  }

  /* animatedContentClass */
  .animatedContentClass {
    overflow: hidden;
  }

  .animatedContentClass[data-state="open"] {
    animation: slideDown 300ms ease-out;
  }

  .animatedContentClass[data-state="closed"] {
    animation: slideUp 300ms ease-out;
  }

  /* animated2DContentClass */
  .animated2DContentClass {
    overflow: hidden;
  }

  .animated2DContentClass[data-state="open"] {
    animation: open2D 1000ms ease-out;
  }

  .animated2DContentClass[data-state="closed"] {
    animation: close2D 1000ms ease-out;
  }

  /* styles */
  .styles {
    background-color: rgba(0, 0, 255, 0.3);
    border: 2px solid blue;
    padding: 10px;
  }

  .styles[data-state="closed"] {
    border-color: red;
  }

  .styles[data-state="open"] {
    border-color: green;
  }

  .styles[data-disabled] {
    border-style: dashed;
  }

  :disabled {
    opacity: 0.5;
  }
</style>
