<script setup lang="tsx">
import Basic from '../../../packages/vue-primitives/src/presence/stories/Basic.vue'
import WithDeferredMountAnimation from '../../../packages/vue-primitives/src/presence/stories/WithDeferredMountAnimation.vue'
import WithMountAnimation from '../../../packages/vue-primitives/src/presence/stories/WithMountAnimation.vue'
import WithMultipleMountAnimations from '../../../packages/vue-primitives/src/presence/stories/WithMultipleMountAnimations.vue'
import WithMultipleOpenAndCloseAnimations from '../../../packages/vue-primitives/src/presence/stories/WithMultipleOpenAndCloseAnimations.vue'
import WithOpenAndCloseAnimation from '../../../packages/vue-primitives/src/presence/stories/WithOpenAndCloseAnimation.vue'
import WithUnmountAnimation from '../../../packages/vue-primitives/src/presence/stories/WithUnmountAnimation.vue'
</script>

<template>
  <DemoList>
    <Demo title="Basic">
      <Basic />
    </Demo>
    <Demo title="WithMountAnimation">
      <WithMountAnimation />
    </Demo>
    <Demo title="WithUnmountAnimation">
      <WithUnmountAnimation />
    </Demo>
    <Demo title="WithMultipleMountAnimations">
      <WithMultipleMountAnimations />
    </Demo>
    <Demo title="WithOpenAndCloseAnimation">
      <WithOpenAndCloseAnimation />
    </Demo>
    <Demo title="WithMultipleOpenAndCloseAnimations">
      <WithMultipleOpenAndCloseAnimations />
    </Demo>
    <Demo title="WithDeferredMountAnimation">
      <WithDeferredMountAnimation />
    </Demo>
  </DemoList>
</template>
