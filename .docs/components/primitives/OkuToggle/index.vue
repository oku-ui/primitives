<script setup lang="ts">
import { OkuToggle } from '@oku-ui/toggle'
</script>

<template>
  <div class="flex items-center justify-center">
    <OkuToggle
      id="toggle"
      aria-label="Toggle italic"
      class="w-10 h-10 font-medium transition duration-300 border-2 rounded focus:outline-blackOA-950 focus:outline focus:outline-2 focus:border-blackOA-950 dark:focus:outline-codGray-300 text-codGray-600 dark:text-grayOA-200 dark:border-codGray-500 flex items-center justify-center data-[state=on]:border-oku-500 data-[state=on]:bg-oku-500 data-[state=on]:text-white data-[state=off]:border-grayOA-400 dark:data-[state=on]:text-white dark:data-[state=on]:bg-oku-500 dark:data-[state=on]:border-oku-500"
    >
      I
    </OkuToggle>
  </div>
</template>
