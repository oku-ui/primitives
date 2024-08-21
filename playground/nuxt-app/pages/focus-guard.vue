<script setup lang="tsx">
import Basic from '../../../packages/vue-primitives/src/focus-guards/stories/Basic.vue'
import Multiple from '../../../packages/vue-primitives/src/focus-guards/stories/Multiple.vue'
import WithOptions from '../../../packages/vue-primitives/src/focus-guards/stories/WithOptions.vue'
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
