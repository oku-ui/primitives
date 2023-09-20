<script setup lang="ts">
import WithMountAnimation from './WithMountAnimation.vue'
import WithUnmountAnimation from './WithUnmountAnimation.vue'
import WithMultipleMountAnimations from './WithMultipleMountAnimations.vue'
import WithOpenAndCloseAnimation from './WithOpenAndCloseAnimation.vue'
import WithMultipleOpenAndCloseAnimations from './WithMultipleOpenAndCloseAnimations.vue'
import WithDeferredMountAnimation from './WithDeferredMountAnimation.vue'
import Basic from './Basic.vue'

export interface OkuPresenceProps {
  template: 'Basic'
  | 'WithMountAnimation'
  | 'WithUnmountAnimation'
  | 'WithMultipleMountAnimations'
  | 'WithOpenAndCloseAnimation'
  | 'WithMultipleOpenAndCloseAnimations'
  | 'WithDeferredMountAnimation'
  allshow?: boolean
}

withDefaults(defineProps<OkuPresenceProps>(), {
  template: 'Basic',
})
</script>

<template>
  <div>
    <div v-if="template === 'Basic' || allshow">
      <Basic />
    </div>
    <div v-if="template === 'WithMountAnimation' || allshow">
      <WithMountAnimation />
    </div>
    <div v-if="template === 'WithUnmountAnimation' || allshow">
      <WithUnmountAnimation />
    </div>
    <div v-if="template === 'WithMultipleMountAnimations' || allshow">
      <WithMultipleMountAnimations />
    </div>
    <div v-if="template === 'WithOpenAndCloseAnimation' || allshow">
      <WithOpenAndCloseAnimation />
    </div>
    <div v-if="template === 'WithMultipleOpenAndCloseAnimations' || allshow">
      <WithMultipleOpenAndCloseAnimations />
    </div>
    <div v-if="template === 'WithDeferredMountAnimation' || allshow">
      <WithDeferredMountAnimation />
    </div>
  </div>
</template>

<style>
@keyframes presence-fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes presence-fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@keyframes presence-slideUp {
  from {
    transform: translateY(30px);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes presence-slideDown {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(30px);
  }
}

.presence-mountAnimationClass {
  animation: presence-fadeIn 3s ease-out;
}

.presence-unmountAnimationClass {
  &[data-state="closed"] {
    animation: presence-fadeOut 3s ease-in;
  }
}

.presence-multipleMountAnimationsClass {
  animation: presence-fadeIn 6s cubic-bezier(0.22, 1, 0.36, 1), presence-slideUp 6s cubic-bezier(0.22, 1, 0.36, 1);
}

.presence-openAndCloseAnimationClass {
  &[data-state="open"] {
    animation: presence-fadeIn 3s ease-out;
  }
  &[data-state="closed"] {
    animation: presence-fadeOut 3s ease-in;
  }
}

.presence-multipleOpenAndCloseAnimationsClass {
  &[data-state="open"] {
    animation: presence-fadeIn 3s cubic-bezier(0.22, 1, 0.36, 1), presence-slideUp 1s cubic-bezier(0.22, 1, 0.36, 1);
  }
  &[data-state="closed"] {
    animation: presence-fadeOut 3s cubic-bezier(0.22, 1, 0.36, 1), presence-slideDown 1s cubic-bezier(0.22, 1, 0.36, 1);
  }
}
</style>
