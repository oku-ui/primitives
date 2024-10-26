<script setup lang="tsx">
import Animated from '../../../packages/core/src/tabs/stories/Animated.vue'
import Chromatic from '../../../packages/core/src/tabs/stories/Chromatic.vue'
import Styled from '../../../packages/core/src/tabs/stories/Styled.vue'
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
