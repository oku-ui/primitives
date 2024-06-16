<script setup lang="tsx">
import Basic from '../../../packages/vue-primitives/src/roving-focus/stories/Basic.vue'
import Nested from '../../../packages/vue-primitives/src/roving-focus/stories/Nested.vue'
import EdgeCases from '../../../packages/vue-primitives/src/roving-focus/stories/EdgeCases.vue'
</script>

<template>
  <div>
    <section>
      <h1>Basic</h1>
      <Basic />
    </section>

    <section>
      <h1>Nested</h1>
      <Nested />
    </section>

    <section>
      <h1>Edge Cases</h1>
      <EdgeCases />
    </section>
  </div>
</template>
