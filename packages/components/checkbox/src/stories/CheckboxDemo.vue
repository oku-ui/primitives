<!-- eslint-disable no-console -->
<script setup lang="ts">
import type { CheckboxProps, CheckboxRef } from '@oku-ui/checkbox'
import { OkuCheckbox, OkuCheckboxIndicator } from '@oku-ui/checkbox'
import { OkuLabel } from '@oku-ui/label'
import { onMounted, ref } from 'vue'

export interface ICheckBoxProps extends CheckboxProps {
  template?: '#1' | '#2' | '#3'
  allshow?: boolean
}

withDefaults(defineProps<ICheckBoxProps>(), {

})

const refdd = ref<CheckboxRef>()

onMounted(() => {
  console.log(refdd.value?.innerRef, 'tt')
})
</script>

<template>
  <div>
    <div v-if="template === '#1' || allshow" class="w-[300px] rounded-sm overflow-hidden">
      <div>
        <p>This checkbox is nested inside a label. The state is uncontrolled.</p>
        <h1 class="text-lg font-bold">
          Custom label
        </h1>
        <OkuCheckbox
          id="checkbox"
          ref="refdd"
          class="w-6 h-6 flex bg-gray-300 rounded-md text-red-500 checked:text-red-600"
        >
          <OkuCheckboxIndicator class="w-6 h-6 flex items-center justify-center text-blue-500">
            <div class="i-ph-check-bold w-5 h-5" />
          </OkuCheckboxIndicator>
        </OkuCheckbox>
      </div>
    </div>

    <div>
      <h1 class="text-lg font-bold mb-4">
        Native label
      </h1>
      <OkuLabel>
        Label
        <OkuCheckbox
          id="checkbox"
          class="w-6 h-6 flex bg-gray-300 rounded-md text-red-500 checked:text-red-600"
        >
          <OkuCheckboxIndicator class="w-6 h-6 flex items-center justify-center text-blue-500">
            <div class="i-ph-check-bold w-5 h-5" />
          </OkuCheckboxIndicator>
        </OkuCheckbox>
      </OkuLabel>
    </div>

    <div>
      <h1 class="text-lg font-bold mb-4">
        Native label + native checkbox
      </h1>
      <OkuLabel>
        Label
        Label <input type="checkbox">
      </OkuLabel>
    </div>

    <div>
      <h1 class="text-lg font-bold mb-4">
        Native label
      </h1>
      <OkuLabel>
        Label
        <OkuCheckbox
          id="checkboxx"
          class="w-6 h-6 flex bg-gray-300 rounded-md text-red-500 checked:text-red-600"
        >
          <OkuCheckboxIndicator class="w-6 h-6 flex items-center justify-center text-blue-500">
            <div class="i-ph-check-bold w-5 h-5" />
          </OkuCheckboxIndicator>
        </OkuCheckbox>
      </OkuLabel>
    </div>
  </div>
</template>
