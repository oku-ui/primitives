<!-- eslint-disable no-console -->
<script setup lang="ts">
import type { LabelElement } from '@oku-ui/label'

const labelRef = ref<LabelElement>()
onMounted(() => {
  console.log(labelRef.value)
})
</script>

<template>
  <div>
    <LabelDemo />
  </div>
</template>
