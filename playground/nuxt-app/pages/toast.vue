<script setup lang="tsx">
import Animated from '../../../packages/core/src/toast/stories/Animated.vue'
import Controlled from '../../../packages/core/src/toast/stories/Controlled.vue'
import FromDialog from '../../../packages/core/src/toast/stories/FromDialog.vue'
import KeyChange from '../../../packages/core/src/toast/stories/KeyChange.vue'
import PauseResumeProps from '../../../packages/core/src/toast/stories/PauseResumeProps.vue'
import Promise from '../../../packages/core/src/toast/stories/Promise.vue'
import Styled from '../../../packages/core/src/toast/stories/Styled.vue'
// import Chromatic from '../../../packages/core/src/toast/stories/Chromatic.vue'
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
