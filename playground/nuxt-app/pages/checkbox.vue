<script setup lang="tsx">
import Styled from '../../../packages/vue-primitives/src/checkbox/stories/Styled.vue'
import Controlled from '../../../packages/vue-primitives/src/checkbox/stories/Controlled.vue'
import Indeterminate from '../../../packages/vue-primitives/src/checkbox/stories/Indeterminate.vue'
import WithinForm from '../../../packages/vue-primitives/src/checkbox/stories/WithinForm.vue'
import Animated from '../../../packages/vue-primitives/src/checkbox/stories/Animated.vue'
import Chromatic from '../../../packages/vue-primitives/src/checkbox/stories/Chromatic.vue'
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
      <h1>Indeterminate</h1>
      <Indeterminate />
    </section>

    <section>
      <h1>WithinForm</h1>
      <WithinForm />
    </section>

    <section>
      <h1>Animated</h1>
      <Animated />
    </section>

    <section>
      <h1>Chromatic</h1>
      <Chromatic />
    </section>
  </div>
</template>
