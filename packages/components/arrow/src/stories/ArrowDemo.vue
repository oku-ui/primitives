<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { ArrowRef } from '@oku-ui/arrow'
import { OkuArrow } from '@oku-ui/arrow'

export interface OkuArrowProps {
  template: '#1' | '#2' | '#3'
  allshow?: boolean
}

withDefaults(defineProps<OkuArrowProps>(), {
  template: '#1',
})

const arrowRef = ref<ArrowRef>()
onMounted(() => {
  // eslint-disable-next-line no-console
  console.log(arrowRef.value?.innerRef)
})
const alert = () => window.alert('clicked')
</script>

<template>
  <div>
    <template v-if="template === '#1'">
      <div class="grid grid-cols-4 gap-4">
        <OkuArrow ref="arrowRef" width="20" height="10" class="align-middle fill-blue-500" />
      </div>
    </template>

    <template v-if="template === '#2'">
      <div class="grid grid-cols-4 gap-4">
        <OkuArrow width="40" height="10" class="align-middle" />

        <OkuArrow width="40" height="10" class="align-middle" />

        <OkuArrow width="50" height="30" class="align-middle" />

        <OkuArrow width="20" height="100" class="align-middle" />
      </div>
    </template>

    <template v-if="template === '#3'">
      <OkuArrow as-child>
        <div
          :style="{
            width: '20px',
            height: '10px',
            borderBottomLeftRadius: '10px',
            borderBottomRightRadius: '10px',
            backgroundColor: 'tomato',
          }
          "
        />
      </OkuArrow>
    </template>
  </div>
</template>
