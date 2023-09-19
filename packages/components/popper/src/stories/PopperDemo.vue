<script setup lang="ts">
import Animated from './Animated.vue'
import Styled from './Styled.vue'
import WithCustomArrow from './WithCustomArrow.vue'
import WithPortal from './WithPortal.vue'
import WithUpdatePositionStrategyAlways from './WithUpdatePositionStrategyAlways.vue'
import Chromatic from './Chromatic.vue'
import OneScroll from './OneScroll.vue'
import TransitionVue from './Transition.vue'

export interface Props {
  template?: 'Styled' | 'WithCustomArrow' | 'Animated' | 'WithPortal' | 'WithUpdatePositionStrategyAlways' | 'Chromatic' | 'OneScroll' | 'Transition'
  allshow?: boolean
}

withDefaults(defineProps<Props>(), {
  template: 'Styled',
  allshow: false,
})
</script>

<template>
  <div
    v-if="template === 'Styled' || allshow"
  >
    <Styled />
  </div>

  <div
    v-if="template === 'WithCustomArrow' || allshow"
  >
    <WithCustomArrow />
  </div>

  <div
    v-if="template === 'Animated' || allshow"
  >
    <Animated />
  </div>

  <div
    v-if="template === 'WithPortal' || allshow"
  >
    <WithPortal />
  </div>

  <div
    v-if="template === 'WithUpdatePositionStrategyAlways' || allshow"
  >
    <WithUpdatePositionStrategyAlways />
  </div>

  <div
    v-if="template === 'Chromatic' || allshow"
  >
    <Chromatic />
  </div>

  <div
    v-if="template === 'OneScroll' || allshow"
  >
    <OneScroll />
  </div>

  <div
    v-if="template === 'Transition' || allshow"
  >
    <TransitionVue />
  </div>
</template>

<style>
.contentClass {
  transform-origin: var(--oku-popper-transform-origin);
  background-color: #f9fafb;
  padding: 10px;
  border-radius: 10px;
  width: 300px;
  height: 150px;
  background-color: #f9fafb;
  padding: 10px;
  border-radius: 10px;

  &.small {
    width: 100px;
    height: 50px;
  }

  &.large {
    width: 300px;
    height: 150px;
  }

  &.default {
    width: 300px;
    height: 150px;
  }
}

.anchorClass {
  background-color: hotpink;
  width: 100px;
  height: 100px;

  &.small {
    width: 50px;
    height: 50px;
  }

  &.large {
    width: 100px;
    height: 100px;
  }

  &.default {
    width: 100px;
    height: 100px;
  }
}

.arrowClass {
  fill: #f9fafb;
}

@keyframes rotateIn {
  0% {
    transform: scale(0) rotateZ(calc(var(--direction, 0) * 45deg));
  }
  100% {
    transform: scale(1);
  }
}

.animatedContentClass {
  transform-origin: var(--oku-popper-transform-origin);
  background-color: #f9fafb;
  padding: 10px;
  border-radius: 10px;
  width: 300px;
  height: 150px;
  background-color: #f9fafb;
  padding: 10px;
  border-radius: 10px;

  &.small {
    width: 100px;
    height: 50px;
  }

  &.large {
    width: 300px;
    height: 150px;
  }

  &.default {
    width: 300px;
    height: 150px;
  }

  &[data-side='top'] {
    --direction: 1;
  }

  &[data-side='bottom'] {
    --direction: -1;
  }

  animation: rotateIn 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
</style>
