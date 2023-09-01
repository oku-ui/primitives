<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Styled from './Styled.vue'

export interface OkuLabelProps {
  label: string
  template: '#1' | '#2'
  allshow?: boolean
}

withDefaults(defineProps<OkuLabelProps>(), {
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
  <div v-if="template === '#1' || allshow" class="flex flex-col w-full">
    <Styled />
  </div>
</template>
