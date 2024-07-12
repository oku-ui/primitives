<script setup lang="tsx">
import Basic from '../../../packages/vue-primitives/src/scroll-area/stories/Basic.vue'
import Resizable from '../../../packages/vue-primitives/src/scroll-area/stories/Resizable.vue'
import ContentChange from '../../../packages/vue-primitives/src/scroll-area/stories/ContentChange.vue'
import Animated from '../../../packages/vue-primitives/src/scroll-area/stories/Animated.vue'
import Chromatic from '../../../packages/vue-primitives/src/scroll-area/stories/Chromatic.vue'
import ChromaticDynamicContentBeforeLoaded from '../../../packages/vue-primitives/src/scroll-area/stories/ChromaticDynamicContentBeforeLoaded.vue'
</script>

<template>
  <DemoList>
    <Demo title="Styled">
      <Basic />
    </Demo>

    <Demo title="Controlled">
      <Resizable />
    </Demo>

    <Demo title="Indeterminate">
      <ContentChange />
    </Demo>

    <Demo title="WithinForm">
      <Animated />
    </Demo>

    <Demo title="Animated">
      <Chromatic />
    </Demo>

    <Demo title="Chromatic">
      <ChromaticDynamicContentBeforeLoaded />
    </Demo>
  </DemoList>
</template>
