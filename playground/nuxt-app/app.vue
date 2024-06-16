<script setup lang="ts">
import { provideConfigContext } from '../../packages/vue-primitives/src/config';

const useIdFunction = () => useId()

provideConfigContext({
  useId: useIdFunction,
});
</script>

<template>
  <div>
    <!-- <ConfigProvider :use-id="useIdFunction"> -->
    <Demo />
    <!-- </ConfigProvider> -->
  </div>
</template>

<style>
.accordion_rootClass {
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

.accordion_itemClass {
  &[data-orientation="horizontal"] {
    display: flex;
    border-right: 1px solid white;
  }

  &[data-orientation="vertical"] {
    border-bottom: 1px solid white;
  }
}

.accordion_headerClass {
  margin: 0;

  &[data-orientation="horizontal"] {
    height: 100%;
  }
}

.accordion_triggerClass {
  box-sizing: border-box;
  appearance: none;
  border: none;
  padding: 10px;
  background-color: black;
  color: white;
  font-family: inherit;
  font-size: 1.2em;
  --shadow-color: crimson;
  text-align: inherit;

  &:focus {
    outline: none;
    box-shadow: inset 0 -5px 0 0 var(--shadow-color);
    color: red;
  }

  &[data-disabled] {
    color: #ccc;
  }

  &[data-state="open"] {
    background-color: red;
    color: white;

    &:focus {
      --shadow-color: #111;
      color: black;
    }
  }

  &[data-orientation="horizontal"] {
    height: 100%;
  }

  &[data-orientation="vertical"] {
    width: 100%;
  }
}

.accordion_contentClass {
  padding: 10px;
  line-height: 1.5;
}

@keyframes accordion_slideDown {
  from {
    height: 0;
  }

  to {
    height: var(--radix-accordion-content-height);
  }
}

@keyframes accordion_slideUp {
  from {
    height: var(--radix-accordion-content-height);
  }

  to {
    height: 0;
  }
}

@keyframes accordion_open2D {
  from {
    width: 0;
    height: 0;
  }

  to {
    width: var(--radix-accordion-content-width);
    height: var(--radix-accordion-content-height);
  }
}

@keyframes accordion_close2D {
  from {
    width: var(--radix-accordion-content-width);
    height: var(--radix-accordion-content-height);
  }

  to {
    width: 0;
    height: 0;
  }
}

.accordion_animatedContentClass {
  overflow: hidden;

  &[data-state="open"] {
    animation: accordion_slideDown 300ms ease-out;
  }

  &[data-state="closed"] {
    animation: accordion_slideUp 300ms ease-out;
  }
}

.accordion_animated2DContentClass {
  overflow: hidden;

  &[data-state="open"] {
    animation: accordion_open2D 1000ms ease-out;
  }

  &[data-state="closed"] {
    animation: accordion_close2D 1000ms ease-out;
  }
}

.accordion_rootAttrClass,
.accordion_itemAttrClass,
.accordion_headerAttrClass,
.accordion_triggerAttrClass,
.accordion_contentAttrClass {
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

.accordion_contentAttrClass {
  display: block;
}
</style>
