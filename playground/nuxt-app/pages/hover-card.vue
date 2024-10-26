<script setup lang="tsx">
import Animated from '../../../packages/core/src/hover-card/stories/Animated.vue'
import AsyncUpdate from '../../../packages/core/src/hover-card/stories/AsyncUpdate.vue'
import Basic from '../../../packages/core/src/hover-card/stories/Basic.vue'
import ContainTextSelection from '../../../packages/core/src/hover-card/stories/ContainTextSelection.vue'
import Controlled from '../../../packages/core/src/hover-card/stories/Controlled.vue'
import CustomDurations from '../../../packages/core/src/hover-card/stories/CustomDurations.vue'
import Layerable from '../../../packages/core/src/hover-card/stories/Layerable.vue'
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
