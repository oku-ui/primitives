<script setup lang="ts">
import Animated from '../../../packages/vue-primitives/src/tooltip/stories/Animated.vue'
import AriaLabel from '../../../packages/vue-primitives/src/tooltip/stories/AriaLabel.vue'
import Controlled from '../../../packages/vue-primitives/src/tooltip/stories/Controlled.vue'
import CustomDurations from '../../../packages/vue-primitives/src/tooltip/stories/CustomDurations.vue'
import KeepOpenOnActivation from '../../../packages/vue-primitives/src/tooltip/stories/KeepOpenOnActivation.vue'
import Positions from '../../../packages/vue-primitives/src/tooltip/stories/Positions.vue'
import Styled from '../../../packages/vue-primitives/src/tooltip/stories/Styled.vue'
</script>

<template>
  <DemoList>
    <Demo title="Styled">
      <Styled />
    </Demo>
    <Demo title="Controlled">
      <Controlled />
    </Demo>
    <Demo title="CustomDurations">
      <CustomDurations />
    </Demo>
    <Demo title="Positions">
      <Positions />
    </Demo>
    <Demo title="Animated">
      <Animated />
    </Demo>
    <Demo title="KeepOpenOnActivation">
      <KeepOpenOnActivation />
    </Demo>
    <Demo title="AriaLabel">
      <AriaLabel />
    </Demo>
  </DemoList>
</template>
