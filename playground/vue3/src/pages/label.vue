<!-- eslint-disable no-console -->
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { OkuLabelElement } from '@oku-ui/label'
import { OkuLabel } from '@oku-ui/label'

const labelRef = ref<OkuLabelElement>()
onMounted(() => {
  console.log(labelRef.value?.innerRef)
})
</script>

<template>
  <div>
    <div class="flex flex-col">
      <OkuLabel ref="labelRef" class="text-black text-2xl" for="firstName">
        Label
      </OkuLabel>
      <input id="firstName" class="mt-4" type="text" defaultValue="Pedro Duarte">
    </div>
  </div>
</template>
