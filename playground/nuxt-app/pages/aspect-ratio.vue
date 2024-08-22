<script setup lang="tsx">
import Styled from '../../../packages/vue-primitives/src/aspect-ratio/stories/Styled.vue'
import CustomRatios from '../../../packages/vue-primitives/src/aspect-ratio/stories/CustomRatios.vue'
import Chromatic from '../../../packages/vue-primitives/src/aspect-ratio/stories/Chromatic.vue'
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
