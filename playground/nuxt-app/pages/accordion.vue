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
  <div>
    <section>
      <h1>Single</h1>
      <Single />
    </section>
    <section>
      <h1>Multiple</h1>
      <Multiple />
    </section>
    <section>
      <h1>Animated</h1>
      <Animated />
    </section>
    <section>
      <h1>Animated2D</h1>
      <Animated2D />
    </section>
    <section>
      <h1>AnimatedControlled</h1>
      <AnimatedControlled />
    </section>
    <section>
      <h1>OutsideViewport</h1>
      <OutsideViewport />
    </section>
    <section>
      <h1>Horizontal</h1>
      <Horizontal />
    </section>
    <section>
      <h1>Chromatic</h1>
      <Chromatic />
    </section>
  </div>
</template>
