<script setup lang="tsx">
import Animated from '../../../packages/vue-primitives/src/collapsible/stories/Animated.vue'
import AnimatedHorizontal from '../../../packages/vue-primitives/src/collapsible/stories/AnimatedHorizontal.vue'
import Chromatic from '../../../packages/vue-primitives/src/collapsible/stories/Chromatic.vue'
import Controlled from '../../../packages/vue-primitives/src/collapsible/stories/Controlled.vue'
import Styled from '../../../packages/vue-primitives/src/collapsible/stories/Styled.vue'
</script>

<template>
  <DemoList>
    <Demo title="Styled">
      <Styled />
    </Demo>
    <Demo title="Controlled">
      <Controlled />
    </Demo>
    <Demo title="Animated">
      <Animated />
    </Demo>
    <Demo title="AnimatedHorizontal">
      <AnimatedHorizontal />
    </Demo>
    <Demo title="Chromatic">
      <Chromatic />
    </Demo>
  </DemoList>
</template>
