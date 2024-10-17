<script setup lang="ts">
import Animated from './Animated.vue'
import AsyncUpdate from './AsyncUpdate.vue'
import Basic from './Basic.vue'
import ContainTextSelection from './ContainTextSelection.vue'
import Controlled from './Controlled.vue'
import CustomDurations from './CustomDurations.vue'
import ForcedMount from './ForcedMount.vue'
import Layerable from './Layerable.vue'
import Nested from './Nested.vue'
import NonPortal from './NonPortal.vue'
import WithSlottedContent from './WithSlottedContent.vue'
import WithSlottedTrigger from './WithSlottedTrigger.vue'

export interface OkuHoverCardProps {
  template: 'Basic' | 'ContainTextSelection' |
    'AsyncUpdate' | 'CustomDurations' | 'Controlled' |
    'Layerable' | 'Animated' | 'ForcedMount' | 'Nested' |
    'NonPortal' | 'WithSlottedTrigger' | 'WithSlottedContent'
  allshow?: boolean
}

withDefaults(defineProps<OkuHoverCardProps>(), {
  template: 'Basic',
})
</script>

<template>
  <div v-if="template === 'Basic' || allshow" :class="template">
    <Basic />
  </div>
  <div v-if="template === 'ContainTextSelection' || allshow" :class="template">
    <ContainTextSelection />
  </div>
  <div v-if="template === 'AsyncUpdate' || allshow" :class="template">
    <AsyncUpdate />
  </div>
  <div v-if="template === 'CustomDurations' || allshow" :class="template">
    <CustomDurations />
  </div>
  <div v-if="template === 'Controlled' || allshow" :class="template">
    <Controlled />
  </div>
  <div v-if="template === 'Layerable' || allshow" :class="template">
    <Layerable />
  </div>
  <div v-if="template === 'Animated' || allshow" :class="template">
    <Animated />
  </div>
  <div v-if="template === 'ForcedMount' || allshow" :class="template">
    <ForcedMount />
  </div>
  <div v-if="template === 'Nested' || allshow" :class="template">
    <Nested />
  </div>
  <div v-if="template === 'NonPortal' || allshow" :class="template">
    <NonPortal />
  </div>
  <div v-if="template === 'WithSlottedTrigger' || allshow" :class="template">
    <WithSlottedTrigger />
  </div>
  <div v-if="template === 'WithSlottedContent' || allshow" :class="template">
    <WithSlottedContent />
  </div>
</template>

<style lang="postcss">
.hover-card-trigger {}

.content {
  transform-origin: var(--oku-hover-card-content-transform-origin);
  background-color: #5d9bda;
  padding: 20px;
  border-radius: 5px;
}

.hover-card-arrow {
  fill: #f9fafb;
}

@keyframes hover-card-fadeIn {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes hover-card-fadeOut {
  from {
    transform: scale(1);
    opacity: 1;
  }
  to {
    transform: scale(0.9);
    opacity: 0;
  }
}

.hover-card-animatedContent {
  transform-origin: var(--oku-hover-card-content-transform-origin);
  background-color: #f9fafb;
  padding: 20px;
  border-radius: 5px;
  &[data-state='open'] {
    animation: hover-card-fadeIn 250ms ease;
  }
  &[data-state='closed'] {
    animation: hover-card-fadeOut 250ms ease;
  }
}

.hover-card-grid {
  display: inline-grid;
  grid-template-columns: repeat(3, 50px);
  column-gap: 150px;
  row-gap: 100px;
  padding: 100px;
  border: 1px solid black;
}

.hover-card-chromaticTrigger {
  box-sizing: border-box;
  width: 30px;
  height: 30px;
  background-color: tomato;
  border: 1px solid rgba(0, 0, 0, 0.3);
}

.hover-card-chromaticContent {
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

.hover-card-chromaticArrow {
  fill: black;
}

.hover-card-styles {
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

.hover-card-triggerAttr {
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

.hover-card-contentAttr {
  box-sizing: border-box;
  display: grid;
  place-content: center;
  width: 60px;
  height: 60px;
  color: white;
  font-size: 10px;
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

.hover-card-arrowAttr {
  fill: black;
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
