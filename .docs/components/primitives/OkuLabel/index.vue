<script setup lang="ts">
import type { LabelRef } from '@oku-ui/label'
import { OkuLabel } from '@oku-ui/label'

const labelRef = ref<LabelRef>()
</script>

<template>
  <div class="flex items-center justify-center my-10">
    <div class="flex items-center gap-4">
      <OkuLabel ref="labelRef" class="text-base font-medium text-blackOA-900 dark:text-white" for="firstName">
        First name
      </OkuLabel>
      <input
        id="firstName" class=" text-blackOA-900 border bg-transparent border-grayOA-200 rounded dark:border-codGray-900 focus:outline focus:outline-blackOA-950 dark:focus:outline-grayOA-300 p-2 transition duration-300 dark:text-white" type="text"
        value="Emir Uluçay"
      >
    </div>
  </div>
</template>
