<script setup lang="tsx">
import Styled from '../../../packages/core/src/label/stories/Styled.vue'
import WithControl from '../../../packages/core/src/label/stories/WithControl.vue'
import WithInputNumber from '../../../packages/core/src/label/stories/WithInputNumber.vue'
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
