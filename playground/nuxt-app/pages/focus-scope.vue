<script setup lang="tsx">
import Basic from '../../../packages/core/src/focus-scope/stories/Basic.vue'
import Multiple from '../../../packages/core/src/focus-scope/stories/Multiple.vue'
import WithOptions from '../../../packages/core/src/focus-scope/stories/WithOptions.vue'
</script>

<template>
  <DemoList>
    <Demo title="Basic">
      <Basic />
    </Demo>
    <Demo title="Multiple">
      <Multiple />
    </Demo>
    <Demo title="WithOptions">
      <WithOptions />
    </Demo>
  </DemoList>
</template>
