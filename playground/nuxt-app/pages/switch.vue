<script setup lang="tsx">
import Styled from '../../../packages/vue-primitives/src/switch/stories/Styled.vue'
import Controlled from '../../../packages/vue-primitives/src/switch/stories/Controlled.vue'
import WithinForm from '../../../packages/vue-primitives/src/switch/stories/WithinForm.vue'
import Chromatic from '../../../packages/vue-primitives/src/switch/stories/Chromatic.vue'
</script>

<template>
  <DemoList>
    <Demo title="Styled">
      <Styled />
    </Demo>

    <Demo title="Controlled">
      <Controlled />
    </Demo>

    <Demo title="WithinForm">
      <WithinForm />
    </Demo>

    <Demo title="Chromatic">
      <Chromatic />
    </Demo>
  </DemoList>
</template>
