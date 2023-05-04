<!-- eslint-disable no-console -->
<script setup lang="ts">
import type { ComponentPublicInstance } from 'vue'
import { onMounted, ref } from 'vue'
import { OkuLabel } from '@oku-ui/label'

const labelRef = ref<Omit<InstanceType<typeof OkuLabel>, keyof ComponentPublicInstance>>()
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
