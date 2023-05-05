<!-- eslint-disable no-console -->
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { OkuCheckbox, OkuCheckboxIndicator } from '@oku-ui/checkbox'
import type { OkuLabelElement } from '@oku-ui/label'
import { OkuLabel } from '@oku-ui/label'

const labelRef = ref<OkuLabelElement>()
onMounted(() => {
  console.log(labelRef.value?.innerRef)
})
</script>

<template>
  <form>
    <div class="flex flex-col">
      <div>
        <p>This checkbox is nested inside a label. The state is uncontrolled.</p>
        <h1 class="text-lg font-bold">
          Custom label
        </h1>
        <OkuCheckbox
          id="checkbox"
          class="w-6 h-6 flex bg-gray-300 rounded-md text-red-500 checked:text-red-600"
        >
          <OkuCheckboxIndicator class="w-6 h-6 flex items-center justify-center text-blue-500">
            <div class="i-ph-check-bold w-5 h-5" />
          </OkuCheckboxIndicator>
        </OkuCheckbox>
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
            id="checkbox"
            class="w-6 h-6 flex bg-gray-300 rounded-md text-red-500 checked:text-red-600"
          >
            <OkuCheckboxIndicator class="w-6 h-6 flex items-center justify-center text-blue-500">
              <div class="i-ph-check-bold w-5 h-5" />
            </OkuCheckboxIndicator>
          </OkuCheckbox>
        </OkuLabel>
      </div>
    </div>
  </form>
</template>
