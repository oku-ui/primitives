<script setup lang="tsx">
import Styled from '../../../packages/vue-primitives/src/toggle/stories/Styled.vue'
import Controlled from '../../../packages/vue-primitives/src/toggle/stories/Controlled.vue'
import Chromatic from '../../../packages/vue-primitives/src/toggle/stories/Chromatic.vue'
</script>

<template>
  <div>
    <section>
      <h1>Styled</h1>
      <Styled />
    </section>

    <section>
      <h1>Controlled</h1>
      <Controlled />
    </section>

    <section>
      <h1>Edge Cases</h1>
      <Chromatic />
    </section>
  </div>
</template>
