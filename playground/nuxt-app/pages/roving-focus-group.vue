<script setup lang="tsx">
import Basic from '../../../packages/core/src/roving-focus/stories/Basic.vue'
import EdgeCases from '../../../packages/core/src/roving-focus/stories/EdgeCases.vue'
import Nested from '../../../packages/core/src/roving-focus/stories/Nested.vue'
</script>

<template>
  <DemoList>
    <Demo title="Basic">
      <Basic />
    </Demo>

    <Demo title="Nested">
      <Nested />
    </Demo>

    <Demo title="Edge Cases">
      <EdgeCases />
    </Demo>
  </DemoList>
</template>
