<script setup lang="ts">
import { OkuToggleGroup, OkuToggleGroupItem } from '@oku-ui/toggle-group'
</script>

<template>
  <div class="flex items-center justify-center">
    <OkuToggleGroup
      class="inline-flex rounded shadow-[0_2px_10px] shadow-grayOA-300 dark:shadow-grayOA-900 space-x-px" type="single"
      default-value="center" aria-label="Text alignment"
    >
      <OkuToggleGroupItem class="hover:bg-oku-400/10 dark:hover:bg-oku-200/60 text-oku-300 data-[state=on]:bg-oku-500/20 data-[state=on]:text-grayOA-500 dark:data-[state=on]:bg-oku-400/70 dark:data-[state=on]:text-grayOA-200 flex h-[35px] w-[35px] items-center justify-center bg-white dark:bg-codGray-800 text-base leading-4 first:rounded-l last:rounded-r focus:z-10 focus:shadow-[0_0_0_2px] focus:shadow-black dark:focus:shadow-white focus:outline-none" value="left" aria-label="Left aligned">
        <span class="i-ph-text-align-left text-codGray-500 dark:text-white w-5 h-5" />
      </OkuToggleGroupItem>
      <OkuToggleGroupItem class="hover:bg-oku-400/10 dark:hover:bg-oku-200/60 text-oku-300 data-[state=on]:bg-oku-500/20 data-[state=on]:text-grayOA-500 dark:data-[state=on]:bg-oku-400/70 dark:data-[state=on]:text-grayOA-200 flex h-[35px] w-[35px] items-center justify-center bg-white dark:bg-codGray-800 text-base leading-4 first:rounded-l last:rounded-r focus:z-10 focus:shadow-[0_0_0_2px] focus:shadow-black dark:focus:shadow-white focus:outline-none" value="center" aria-label="Center aligned">
        <span class="i-ph-text-align-center text-codGray-500 dark:text-white w-5 h-5" />
      </OkuToggleGroupItem>
      <OkuToggleGroupItem class="hover:bg-oku-400/10 dark:hover:bg-oku-200/60 text-oku-300 data-[state=on]:bg-oku-500/20 data-[state=on]:text-grayOA-500 dark:data-[state=on]:bg-oku-400/70 dark:data-[state=on]:text-grayOA-200 flex h-[35px] w-[35px] items-center justify-center bg-white dark:bg-codGray-800 text-base leading-4 first:rounded-l last:rounded-r focus:z-10 focus:shadow-[0_0_0_2px] focus:shadow-black dark:focus:shadow-white focus:outline-none" value="right" aria-label="Right aligned">
        <span class="i-ph-text-align-right text-codGray-500 dark:text-white w-5 h-5" />
      </OkuToggleGroupItem>
    </OkuToggleGroup>
  </div>
</template>
