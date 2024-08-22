<script setup lang="tsx">
import Styled from '../../../packages/vue-primitives/src/toolbar/stories/Styled.vue'
import Chromatic from '../../../packages/vue-primitives/src/toolbar/stories/Chromatic.vue'
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
