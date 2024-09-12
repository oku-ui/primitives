<script setup lang="tsx">
import Chromatic from '../../../packages/vue-primitives/src/aspect-ratio/stories/Chromatic.vue'
import CustomRatios from '../../../packages/vue-primitives/src/aspect-ratio/stories/CustomRatios.vue'
import Styled from '../../../packages/vue-primitives/src/aspect-ratio/stories/Styled.vue'
</script>

<template>
  <DemoList>
    <Demo title="Styled">
      <Styled />
    </Demo>
    <Demo title="CustomRatios">
      <CustomRatios />
    </Demo>
    <Demo title="Chromatic">
      <Chromatic />
    </Demo>
  </DemoList>
</template>
