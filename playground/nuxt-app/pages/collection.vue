<script setup lang="tsx">
import Basic from '../../../packages/core/src/collection/stories/Basic.vue'
import DynamicInsertion from '../../../packages/core/src/collection/stories/DynamicInsertion.vue'
import Nested from '../../../packages/core/src/collection/stories/Nested.vue'
import WithChangingItem from '../../../packages/core/src/collection/stories/WithChangingItem.vue'
import WithElementInBetween from '../../../packages/core/src/collection/stories/WithElementInBetween.vue'
import WithFragment from '../../../packages/core/src/collection/stories/WithFragment.vue'
import WithWrappedItem from '../../../packages/core/src/collection/stories/WithWrappedItem.vue'
</script>

<template>
  <DemoList>
    <Demo title="Basic">
      <Basic />
    </Demo>
    <Demo title="WithElementInBetween">
      <WithElementInBetween />
    </Demo>
    <Demo title="WithWrappedItem">
      <WithWrappedItem />
    </Demo>
    <Demo title="WithFragment">
      <WithFragment />
    </Demo>
    <Demo title="DynamicInsertion">
      <DynamicInsertion />
    </Demo>
    <Demo title="WithChangingItem">
      <WithChangingItem />
    </Demo>
    <Demo title="Nested">
      <Nested />
    </Demo>
  </DemoList>
</template>
