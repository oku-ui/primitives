<script setup lang="ts">
import { OkuCheckbox, OkuCheckboxIndicator } from '@oku-ui/checkbox'
</script>

<template>
  <div class="flex items-center justify-center gap-2">
    <OkuCheckbox id="c1" class="w-6 h-6 flex border focus:outline focus:outline-[1px] dark:focus:outline-[1px] focus:border-blackOA-900 dark:focus:border-grayOA-300 focus:outline-blackOA-900 dark:focus:outline-grayOA-300 border-grayOA-300 dark:border-codgrayOA-700 overflow-hidden rounded-[4px]">
      <OkuCheckboxIndicator class="w-6 h-6 flex items-center justify-center text-white bg-oku-500 ">
        <div class="i-heroicons-check w-5 h-5" />
      </OkuCheckboxIndicator>
    </OkuCheckbox>
    <label class="Label text-codGray-800 dark:text-white" for="c1">
      Accept terms and conditions.
    </label>
  </div>
</template>
