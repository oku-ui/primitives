<!-- eslint-disable no-console -->
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { OkuCheckbox, OkuCheckboxIndicator } from '@oku-ui/checkbox'

const labelRef = ref<OkuLabelElement>()
onMounted(() => {
  console.log(labelRef.value?.innerRef)
})
</script>

<template>
  <form>
    <div class="flex flex-col">
      <div>
        <OkuCheckbox
          id="checkbox"
          class="w-6 h-6 flex bg-gray-300 rounded-md text-red-500 checked:text-red-600"
        >
          <OkuCheckboxIndicator class="w-6 h-6 flex items-center justify-center text-blue-500">
            <div class="i-ph-check-bold w-5 h-5" />
          </OkuCheckboxIndicator>
        </OkuCheckbox>
      </div>
    </div>
  </form>
</template>
