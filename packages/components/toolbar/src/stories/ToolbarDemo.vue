<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { OkuToolbar } from '@oku-ui/toolbar'

export interface OkuToolbarProps {
  label: string
  template: '#1' | '#2'
  allshow?: boolean
}

withDefaults(defineProps<OkuToolbarProps>(), {
  label: 'First Name',
  template: '#1',
})

const labelRef = ref()
onMounted(() => {
  console.log(labelRef.value)
})
const alert = () => console.log('alert')
</script>

<template>
  <div class="cursor-default inline-block">
    <div v-if="template === '#1' || allshow" class="flex flex-col">
      <OkuToolbar ref="labelRef" class="text-black text-2xl border-2 border-gray-500 mb-4" for="firstName">
        {{ label }}
      </OkuToolbar>
      <input id="firstName" class="mt-4 bg-gray-200 p-2 border-2 border-gray-500" type="text" defaultValue="Pedro Duarte">
    </div>
    <div v-if="template === '#2' || allshow" class="flex flex-col">
      <div>
        <h1>Wrapping control</h1>
        <OkuToolbar>
          <button class="flex-inline p-4 border bg-gray-400 hover:bg-red-500" @click="alert">
            Control
          </button>
          {{ label }}
        </OkuToolbar>
      </div>

      <div>
        <h1>Referencing control</h1>
        <button id="control" class="flex-inline p-4 border bg-gray-400 hover:bg-red-500" @click="alert">
          Control
        </button>
        <OkuToolbar for="control">
          {{ label }}
        </OkuToolbar>
      </div>
    </div>
  </div>
</template>
