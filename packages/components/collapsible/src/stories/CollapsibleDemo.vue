<script setup lang="ts">
import Styled from './Styled.vue'
import Controlled from './Controlled.vue'
import Animated from './Animated.vue'
import AnimatedHorizontal from './AnimatedHorizontal.vue'
import Chromatic from './Chromatic.vue'

withDefaults(defineProps<ICollapsibleProps>(), {})

export interface ICollapsibleProps {
  template?: 'Styled' | 'Controlled' | 'Animated' | 'AnimatedHorizontal' | 'Chromatic'
  allshow?: boolean
}
</script>

<template>
  <div>
    <template v-if="template === 'Styled' || allshow">
      <Styled />
    </template>

    <template v-if="template === 'Controlled' || allshow">
      <Controlled />
    </template>

    <template v-if="template === 'Animated' || allshow">
      <Animated />
    </template>

    <template v-if="template === 'AnimatedHorizontal' || allshow">
      <AnimatedHorizontal />
    </template>

    <template v-if="template === 'Chromatic' || allshow">
      <Chromatic />
    </template>
  </div>
</template>

<style>
.collapsible {
  max-width: 20em;
  font-family: sans-serif;
}

.collapsible-trigger {
  /* RECOMMENDED_CSS_COLLAPSIBLE_TRIGGER */
  /* because it's a button, we want to stretch it */
  width: 100%;
  /* and remove center text alignment in favour of inheriting */
  text-align: inherit;

  box-sizing: border-box;
  appearance: none;
  border: none;
  padding: 10px;
  background-color: #111;
  color: #fff;
  font-family: inherit;
  font-size: 1.2em;

  --shadow-color: crimson;

  &:focus {
    outline: none;
    box-shadow: inset 0 -5px 0 0 var(--shadow-color);
    color: crimson;
  }

  &[data-disabled] {
    color:#aaa;
  }

  &[data-state="open"] {
    background-color: crimson;
    color: #fff;

    &:focus {
      --shadow-color: #111;
      color: #111;
    }
  }
}

.collapsible-content {
  padding: 10px;
  line-height: 1.5px;
}

@keyframes collapsible-slide-down {
  from { height: 0; }
  to { height: var(--oku-collapsible-content-height); }
}

@keyframes collapsible-slide-up {
  from { height: var(--oku-collapsible-content-height); }
  to { height: 0; }
}

@keyframes collapsible-open-right {
  from { width: 0; }
  to { width: var(--oku-collapsible-content-width); }
}

@keyframes collapsible-close-right {
  from { width: var(--oku-collapsible-content-width); }
  to { width: 0; }
}

.collapsible-animated-content {
  overflow: hidden;
  &[data-state="open"] {
    animation: collapsible-slide-down 300ms ease-out;
  }
  &[data-state="closed"] {
    animation: collapsible-slide-up 300ms ease-in;
  }
}

.collapsible-animated-width-content {
  overflow: hidden;
  &[data-state="open"] {
    animation: collapsible-open-right 300ms ease-out;
  }
  &[data-state="closed"] {
    animation: collapsible-close-right 300ms ease-in;
  }
}

.collapsible-attr-styles {
  background-color: rgba(0, 0, 255, 0.3);
  border: 2px solid blue;
  padding: 10px;

  &[data-state="closed"] { border-color: red }
  &[data-state="open"] { border-color: green }
  &[data-disabled] { border-style: dashed }
  &:disabled { opacity: 0.5 }
}

/* ensure we can see the content (because it has `hidden` attribute) */
/* .collapsible-content-attr-styles {
  display: block;

  background-color: rgba(0, 0, 255, 0.3);
  border: 2px solid blue;
  padding: 10px;

  &[data-state="closed"] { border-color: red }
  &[data-state="open"] { border-color: green }
  &[data-disabled] { border-style: dashed }
  &:disabled { opacity: 0.5 }
} */
</style>
