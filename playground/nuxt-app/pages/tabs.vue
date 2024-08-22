<script setup lang="tsx">
import Styled from '../../../packages/vue-primitives/src/tabs/stories/Styled.vue'
import Animated from '../../../packages/vue-primitives/src/tabs/stories/Animated.vue'
import Chromatic from '../../../packages/vue-primitives/src/tabs/stories/Chromatic.vue'
</script>

<template>
  <DemoList>
    <Demo title="Styled">
      <Styled />
    </Demo>
    <Demo title="Animated">
      <Animated />
    </Demo>
    <Demo title="Chromatic">
      <Chromatic />
    </Demo>
  </DemoList>
</template>
