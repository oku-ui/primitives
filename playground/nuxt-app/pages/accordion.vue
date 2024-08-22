<script setup lang="tsx">
import Single from '../../../packages/vue-primitives/src/accordion/stories/Single.vue'
import Multiple from '../../../packages/vue-primitives/src/accordion/stories/Multiple.vue'
import Animated from '../../../packages/vue-primitives/src/accordion/stories/Animated.vue'
import Animated2D from '../../../packages/vue-primitives/src/accordion/stories/Animated2D.vue'
import AnimatedControlled from '../../../packages/vue-primitives/src/accordion/stories/AnimatedControlled.vue'
import OutsideViewport from '../../../packages/vue-primitives/src/accordion/stories/OutsideViewport.vue'
import Horizontal from '../../../packages/vue-primitives/src/accordion/stories/Horizontal.vue'
import Chromatic from '../../../packages/vue-primitives/src/accordion/stories/Chromatic.vue'
</script>

<template>
  <DemoList>
    <Demo title="Single">
      <Single />
    </Demo>
    <Demo title="Multiple">
      <Multiple />
    </Demo>
    <Demo title="Animated">
      <Animated />
    </Demo>
    <Demo title="Animated2D">
      <Animated2D />
    </Demo>
    <Demo title="AnimatedControlled">
      <AnimatedControlled />
    </Demo>
    <Demo title="OutsideViewport">
      <OutsideViewport />
    </Demo>
    <Demo title="Horizontal">
      <Horizontal />
    </Demo>
    <Demo title="Chromatic">
      <Chromatic />
    </Demo>
  </DemoList>
</template>
