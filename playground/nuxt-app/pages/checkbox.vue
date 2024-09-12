<script setup lang="tsx">
import Animated from '../../../packages/vue-primitives/src/checkbox/stories/Animated.vue'
import Chromatic from '../../../packages/vue-primitives/src/checkbox/stories/Chromatic.vue'
import Controlled from '../../../packages/vue-primitives/src/checkbox/stories/Controlled.vue'
import Indeterminate from '../../../packages/vue-primitives/src/checkbox/stories/Indeterminate.vue'
import Styled from '../../../packages/vue-primitives/src/checkbox/stories/Styled.vue'
import WithinForm from '../../../packages/vue-primitives/src/checkbox/stories/WithinForm.vue'
</script>

<template>
  <DemoList>
    <Demo title="Styled">
      <Styled />
    </Demo>

    <Demo title="Controlled">
      <Controlled />
    </Demo>

    <Demo title="Indeterminate">
      <Indeterminate />
    </Demo>

    <Demo title="WithinForm">
      <WithinForm />
    </Demo>

    <Demo title="Animated">
      <Animated />
    </Demo>

    <Demo title="Chromatic">
      <Chromatic />
    </Demo>
  </DemoList>
</template>
