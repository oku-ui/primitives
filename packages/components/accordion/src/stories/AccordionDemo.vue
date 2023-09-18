<script setup lang="ts">
import Single from './Single.vue'

export interface OkuAccordionProps {
  template: 'Single'
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
</template>

<style lang="postcss">
/* rootClass */
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
  background-color: $black;
  color: white;
  font-family: inherit;
  font-size: 1.2em;
  --shadow-color: crimson;
}

.triggerClass:focus {
  outline: none;
  box-shadow: inset 0 -5px 0 0 var(--shadow-color);
  color: $red;
}

.triggerClass[data-disabled] {
  color: $gray300;
}

.triggerClass[data-state="open"] {
  background-color: $red;
  color: $white;
}

.triggerClass[data-state="open"]:focus {
  --shadow-color: #111;
  color: $black;
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
