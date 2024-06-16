<script setup lang="tsx">
import Styled from '../../../packages/vue-primitives/src/collapsible/stories/Styled.vue'
import Controlled from '../../../packages/vue-primitives/src/collapsible/stories/Controlled.vue'
import Animated from '../../../packages/vue-primitives/src/collapsible/stories/Animated.vue'
import AnimatedHorizontal from '../../../packages/vue-primitives/src/collapsible/stories/AnimatedHorizontal.vue'
import Chromatic from '../../../packages/vue-primitives/src/collapsible/stories/Chromatic.vue'
</script>

<template>
  <div>
    <section>
      <h1>Styled</h1>
      <Styled />
    </section>
    <section>
      <h1>Controlled</h1>
      <Controlled />
    </section>
    <section>
      <h1>Animated</h1>
      <Animated />
    </section>
    <section>
      <h1>AnimatedHorizontal</h1>
      <AnimatedHorizontal />
    </section>
    <section>
      <h1>Chromatic</h1>
      <Chromatic />
    </section>
  </div>
</template>
