<!-- eslint-disable no-console -->
<script setup lang="ts">
import type { OkuLabelElement } from '@oku-ui/label'

const labelRef = ref<OkuLabelElement>()
onMounted(() => {
  console.log(labelRef.value?.innerRef)
})
</script>

<template>
  <div>
    <LabelDemo />
  </div>
</template>
