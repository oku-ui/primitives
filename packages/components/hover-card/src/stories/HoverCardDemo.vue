<script setup lang="ts">
import Basic from './Basic.vue'
import ContainTextSelection from './ContainTextSelection.vue'
import AsyncUpdate from './AsyncUpdate.vue'
import CustomDurations from './CustomDurations.vue'
import Controlled from './Controlled.vue'
import Layerable from './Layerable.vue'
import Animated from './Animated.vue'
import ForcedMount from './ForcedMount.vue'
import Nested from './Nested.vue'
import NonPortal from './NonPortal.vue'
import WithSlottedTrigger from './WithSlottedTrigger.vue'
import WithSlottedContent from './WithSlottedContent.vue'

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
  <div>
    <Basic v-if="template === 'Basic' || allshow" />
  </div>
  <div v-if="template === 'ContainTextSelection' || allshow">
    <ContainTextSelection />
  </div>
  <div v-if="template === 'AsyncUpdate' || allshow">
    <AsyncUpdate />
  </div>
  <div v-if="template === 'CustomDurations' || allshow">
    <CustomDurations />
  </div>
  <div v-if="template === 'Controlled' || allshow">
    <Controlled />
  </div>
  <div v-if="template === 'Layerable' || allshow">
    <Layerable />
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
  <div v-if="template === 'NonPortal' || allshow">
    <NonPortal />
  </div>
  <div v-if="template === 'WithSlottedTrigger' || allshow">
    <WithSlottedTrigger />
  </div>
  <div v-if="template === 'WithSlottedContent' || allshow">
    <WithSlottedContent />
  </div>
</template>

<style>
.hover_card_triggerClass {}

.hover_card_contentClass {
  transform-origin: var(--oku-hover-card-content-transform-origin);
  background-color: #5d9bda;
  padding: 20px;
  border-radius: 5px;
}

.hover_card_arrowClass {
  fill: #f9fafb;
}

@keyframes fadeIn {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    transform: scale(1);
    opacity: 1;
  }
  to {
    transform: scale(0.9);
    opacity: 0;
  }
}

.hover_card_animatedContentClass {
  transform-origin: var(--oku-hover-card-content-transform-origin);
  background-color: #5d9bda;
  padding: 20px;
  border-radius: 5px;
  &[data-state='open'] {
    animation: fadeIn 250ms ease;
  }
  &[data-state='closed'] {
    animation: fadeOut 250ms ease;
  }
}

.hover_card_gridClass {
  display: inline-grid;
  grid-template-columns: repeat(3, 50px);
  column-gap: 150px;
  row-gap: 100px;
  padding: 100px;
  border: 1px solid black;
}

.hover_card_chromaticTriggerClass {
  box-sizing: border-box;
  width: 30px;
  height: 30px;
  background-color: tomato;
  border: 1px solid rgba(0, 0, 0, 0.3);
}

.hover_card_chromaticContentClass {
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

.hover_card_chromaticArrowClass {
  fill: black;
}

.hover_card_styles {
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

.hover_card_triggerAttrClass {
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

.hover_card_contentAttrClass {
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

.hover_card_arrowAttrClass {
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
