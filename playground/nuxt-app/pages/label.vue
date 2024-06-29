<script setup lang="tsx">
import Styled from '../../../packages/vue-primitives/src/label/stories/Styled.vue'
import WithControl from '../../../packages/vue-primitives/src/label/stories/WithControl.vue'
import WithInputNumber from '../../../packages/vue-primitives/src/label/stories/WithInputNumber.vue'
</script>

<template>
  <DemoList>
    <Demo title="Styled">
      <Styled />
    </Demo>

    <Demo title="WithControl">
      <WithControl />
    </Demo>

    <Demo title="WithInputNumber">
      <WithInputNumber />
    </Demo>
  </DemoList>
</template>
