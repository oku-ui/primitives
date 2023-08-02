<!-- eslint-disable no-console -->
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { OkuSlot, OkuSlottable } from '@oku-ui/slot'

export interface OkuLabelProps {
  template: '#1' | '#2'
  allshow?: boolean
}

withDefaults(defineProps<OkuLabelProps>(), {
  label: 'First Name',
  template: '#1',
})

const slot = ref()
onMounted(() => {
  console.log(slot.value)
})
const alert = () => window.alert('clicked')
</script>

<template>
  <div class="cursor-default inline-block">
    <div v-if="template === '#1' || allshow" class="flex flex-col">
      <OkuSlot ref="slot" class="test">
        <b data-slot-element>hello</b>
      </OkuSlot>
    </div>
    <div v-if="template === '#2' || allshow" class="flex flex-col">
      <OkuSlot ref="slot" class="test">
        <OkuSlottable>
          <b data-slot-element @click="alert">helloa</b>
        </OkuSlottable>
        <span>world</span>
      </OkuSlot>
    </div>
  </div>
</template>
