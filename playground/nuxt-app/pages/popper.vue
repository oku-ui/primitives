<script setup lang="tsx">
import Animated from '../../../packages/vue-primitives/src/popper/stories/Animated.vue'
import Styled from '../../../packages/vue-primitives/src/popper/stories/Styled.vue'
import WithCustomArrow from '../../../packages/vue-primitives/src/popper/stories/WithCustomArrow.vue'
import WithPortal from '../../../packages/vue-primitives/src/popper/stories/WithPortal.vue'
import WithUpdatePositionStrategyAlways from '../../../packages/vue-primitives/src/popper/stories/WithUpdatePositionStrategyAlways.vue'
// import Chromatic from '../../../packages/vue-primitives/src/popper/stories/Chromatic.vue'
</script>

<template>
  <DemoList>
    <Demo title="Styled">
      <Styled />
    </Demo>

    <Demo title="WithCustomArrow">
      <WithCustomArrow />
    </Demo>

    <Demo title="Animated">
      <Animated />
    </Demo>

    <Demo title="WithPortal">
      <WithPortal />
    </Demo>

    <Demo title="WithUpdatePositionStrategyAlways">
      <WithUpdatePositionStrategyAlways />
    </Demo>

    <!-- <Demo title="Chromatic">
      <Chromatic />
    </Demo> -->
  </DemoList>
</template>
