<script setup lang="tsx">
import Single from '../../../packages/vue-primitives/src/toggle-group/stories/Single.vue'
import Vertical from '../../../packages/vue-primitives/src/toggle-group/stories/Vertical.vue'
import Multiple from '../../../packages/vue-primitives/src/toggle-group/stories/Multiple.vue'
import Chromatic from '../../../packages/vue-primitives/src/toggle-group/stories/Chromatic.vue'
</script>

<template>
  <div>
    <section>
      <h1>Single</h1>
      <Single />
    </section>

    <section>
      <h1>Vertical</h1>
      <Vertical />
    </section>

    <section>
      <h1>Multiple</h1>
      <Multiple />
    </section>

    <section>
      <h1>Chromatic</h1>
      <Chromatic />
    </section>
  </div>
</template>
