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
    <Demo title="Basic">
      <Basic />
    </Demo>

    <Demo title="Resizable">
      <Resizable />
    </Demo>

    <Demo title="ContentChange">
      <ContentChange />
    </Demo>

    <Demo title="Animated">
      <Animated />
    </Demo>

    <Demo title="Chromatic">
      <Chromatic />
    </Demo>

    <Demo title="ChromaticDynamicContentBeforeLoaded">
      <ChromaticDynamicContentBeforeLoaded />
    </Demo>
  </DemoList>
</template>
