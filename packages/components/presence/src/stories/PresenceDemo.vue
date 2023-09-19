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
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(30px);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes slideDown {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(30px);
  }
}

.mountAnimationClass {
  animation: fadeIn 3s ease-out;
}

.unmountAnimationClass {
  &[data-state="closed"] {
    animation: fadeOut 3s ease-in;
  }
}

.multipleMountAnimationsClass {
  animation: fadeIn 6s cubic-bezier(0.22, 1, 0.36, 1), slideUp 6s cubic-bezier(0.22, 1, 0.36, 1);
}

.openAndCloseAnimationClass {
  &[data-state="open"] {
    animation: fadeIn 3s ease-out;
  }
  &[data-state="closed"] {
    animation: fadeOut 3s ease-in;
  }
}

.multipleOpenAndCloseAnimationsClass {
  &[data-state="open"] {
    animation: fadeIn 3s cubic-bezier(0.22, 1, 0.36, 1), slideUp 1s cubic-bezier(0.22, 1, 0.36, 1);
  }
  &[data-state="closed"] {
    animation: fadeOut 3s cubic-bezier(0.22, 1, 0.36, 1), slideDown 1s cubic-bezier(0.22, 1, 0.36, 1);
  }
}
</style>
