<script setup lang="tsx">
import Single from '../../../packages/vue-primitives/src/toggle-group/stories/Single.vue'
import Vertical from '../../../packages/vue-primitives/src/toggle-group/stories/Vertical.vue'
import Multiple from '../../../packages/vue-primitives/src/toggle-group/stories/Multiple.vue'
import Chromatic from '../../../packages/vue-primitives/src/toggle-group/stories/Chromatic.vue'
</script>

<template>
  <DemoList>
    <Demo title="Single">
      <Single />
    </Demo>

    <Demo title="Vertical">
      <Vertical />
    </Demo>

    <Demo title="Multiple">
      <Multiple />
    </Demo>

    <Demo title="Chromatic">
      <Chromatic />
    </Demo>
  </DemoList>
</template>
