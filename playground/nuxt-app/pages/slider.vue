<script setup lang="tsx">
import Chromatic from '../../../packages/vue-primitives/src/slider/stories/Chromatic.vue'
import Horizontal from '../../../packages/vue-primitives/src/slider/stories/Horizontal.vue'
import Inversions from '../../../packages/vue-primitives/src/slider/stories/Inversions.vue'
import OnValueCommit from '../../../packages/vue-primitives/src/slider/stories/OnValueCommit.vue'
import RightToLeft from '../../../packages/vue-primitives/src/slider/stories/RightToLeft.vue'
import SmallSteps from '../../../packages/vue-primitives/src/slider/stories/SmallSteps.vue'
import Styled from '../../../packages/vue-primitives/src/slider/stories/Styled.vue'
import Vertical from '../../../packages/vue-primitives/src/slider/stories/Vertical.vue'
import WithinForm from '../../../packages/vue-primitives/src/slider/stories/WithinForm.vue'
import WithMinimumStepsBetweenThumbs from '../../../packages/vue-primitives/src/slider/stories/WithMinimumStepsBetweenThumbs.vue'
import WithMultipleRanges from '../../../packages/vue-primitives/src/slider/stories/WithMultipleRanges.vue'
</script>

<template>
  <DemoList>
    <Demo title="Styled">
      <Styled />
    </Demo>
    <Demo title="OnValueCommit">
      <OnValueCommit />
    </Demo>
    <Demo title="RightToLeft">
      <RightToLeft />
    </Demo>
    <Demo title="Horizontal">
      <Horizontal />
    </Demo>
    <Demo title="Vertical">
      <Vertical />
    </Demo>
    <Demo title="Inversions">
      <Inversions />
    </Demo>
    <Demo title="WithMinimumStepsBetweenThumbs">
      <WithMinimumStepsBetweenThumbs />
    </Demo>
    <Demo title="WithMultipleRanges">
      <WithMultipleRanges />
    </Demo>
    <Demo title="SmallSteps">
      <SmallSteps />
    </Demo>
    <Demo title="WithinForm">
      <WithinForm />
    </Demo>
    <Demo title="Chromatic">
      <Chromatic />
    </Demo>
  </DemoList>
</template>
