<script setup lang="tsx">
import Basic from '../../../packages/vue-primitives/src/hover-card/stories/Basic.vue'
import ContainTextSelection from '../../../packages/vue-primitives/src/hover-card/stories/ContainTextSelection.vue'
import AsyncUpdate from '../../../packages/vue-primitives/src/hover-card/stories/AsyncUpdate.vue'
import CustomDurations from '../../../packages/vue-primitives/src/hover-card/stories/CustomDurations.vue'
import Controlled from '../../../packages/vue-primitives/src/hover-card/stories/Controlled.vue'
import Layerable from '../../../packages/vue-primitives/src/hover-card/stories/Layerable.vue'
import Animated from '../../../packages/vue-primitives/src/hover-card/stories/Animated.vue'
</script>

<template>
  <DemoList>
    <Demo title="Basic">
      <Basic />
    </Demo>
    <Demo title="ContainTextSelection">
      <ContainTextSelection />
    </Demo>
    <Demo title="AsyncUpdate">
      <AsyncUpdate />
    </Demo>
    <Demo title="CustomDurations">
      <CustomDurations />
    </Demo>
    <Demo title="Controlled">
      <Controlled />
    </Demo>
    <Demo title="Layerable">
      <Layerable />
    </Demo>
    <Demo title="Animated">
      <Animated />
    </Demo>


  </DemoList>
</template>
