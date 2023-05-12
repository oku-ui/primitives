<!-- eslint-disable no-console -->
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { LabelRef } from '@oku-ui/label'
import { OkuLabel } from '@oku-ui/label'

export interface OkuLabelProps {
  label: string
  template: '#1' | '#2'
  allshow?: boolean
}

withDefaults(defineProps<OkuLabelProps>(), {
  label: 'First Name',
  template: '#1',
})

const labelRef = ref<LabelRef>()
onMounted(() => {
  console.log(labelRef.value?.innerRef)
})
const alert = () => window.alert('clicked')
</script>

<template>
  <div class="cursor-default inline-block">
    <div v-if="template === '#1' || allshow" class="flex flex-col">
      <OkuLabel ref="labelRef" class="text-black text-2xl border-2 border-gray-500 mb-4" for="firstName">
        {{ label }}
      </OkuLabel>
      <input id="firstName" class="mt-4 bg-gray-200 p-2 border-2 border-gray-500" type="text" defaultValue="Pedro Duarte">
    </div>
    <div v-if="template === '#2' || allshow" class="flex flex-col">
      <div>
        <h1>Wrapping control</h1>
        <OkuLabel>
          <button class="flex-inline p-4 border bg-gray-400 hover:bg-red-500" @click="alert">
            Control
          </button>
          {{ label }}
        </OkuLabel>
      </div>

      <div>
        <h1>Referencing control</h1>
        <button id="control" class="flex-inline p-4 border bg-gray-400 hover:bg-red-500" @click="alert">
          Control
        </button>
        <OkuLabel for="control">
          {{ label }}
        </OkuLabel>
      </div>
    </div>
  </div>
</template>
