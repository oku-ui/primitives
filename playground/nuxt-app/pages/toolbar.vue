<script setup lang="tsx">
import Chromatic from '../../../packages/vue-primitives/src/toolbar/stories/Chromatic.vue'
import Styled from '../../../packages/vue-primitives/src/toolbar/stories/Styled.vue'
</script>

<template>
  <DemoList>
    <Demo title="Styled">
      <Styled />
    </Demo>

    <Demo title="Edge Cases">
      <Chromatic />
    </Demo>
  </DemoList>
</template>
