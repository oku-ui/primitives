<script setup lang="tsx">
import Styled from '../../../packages/vue-primitives/src/toast/stories/Styled.vue'
import Controlled from '../../../packages/vue-primitives/src/toast/stories/Controlled.vue'
import FromDialog from '../../../packages/vue-primitives/src/toast/stories/FromDialog.vue'
import Promise from '../../../packages/vue-primitives/src/toast/stories/Promise.vue'
import KeyChange from '../../../packages/vue-primitives/src/toast/stories/KeyChange.vue'
import PauseResumeProps from '../../../packages/vue-primitives/src/toast/stories/PauseResumeProps.vue'
import Animated from '../../../packages/vue-primitives/src/toast/stories/Animated.vue'
// import Chromatic from '../../../packages/vue-primitives/src/toast/stories/Chromatic.vue'
</script>

<template>
  <DemoList>
    <Demo title="Styled">
      <Styled class="toast_box" />
    </Demo>
    <Demo title="Controlled">
      <Controlled class="toast_box" />
    </Demo>
    <Demo title="FromDialog">
      <FromDialog class="toast_box" />
    </Demo>
    <Demo title="Promise">
      <Promise class="toast_box" />
    </Demo>
    <Demo title="Animated">
      <Animated class="toast_box" />
    </Demo>
    <Demo title="KeyChange">
      <KeyChange class="toast_box" />
    </Demo>
    <Demo title="PauseResumeProps">
      <PauseResumeProps class="toast_box" />
    </Demo>

    <!-- <Demo title="Chromatic">
      <Chromatic />
    </Demo> -->
  </DemoList>
</template>
