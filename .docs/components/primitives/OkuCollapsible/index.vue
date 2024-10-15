<script setup lang="ts">
import { ref } from 'vue'

import {
  OkuCollapsible,
  OkuCollapsibleContent,
  OkuCollapsibleTrigger,
} from '@oku-ui/collapsible'

const open = ref(false)
const rootDisabled = ref(false)
</script>

<template>
  <OkuCollapsible v-model="open" class="max-w-[280px] w-full mx-auto" :disabled="rootDisabled">
    <div style="display: flex; align-items: center; justify-content: space-between">
      <span class="text-[#222222] dark:text-white text-sm font-bold leading-6">
        @oku-ui 3 repos
      </span>
      <OkuCollapsibleTrigger
        class="cursor-default rounded-full h-6 w-6 inline-flex items-center justify-center text-black dark:text-grayOA-300 outline-none dark:bg-codGray-800 dark:data-[state=closed]:bg-codGray-800 data-[state=closed]:bg-white data-[state=open]:bg-white hover:bg-grayOA-500 focus:outline-blackOA-950 dark:focus:outline-grayOA-300"
      >
        <i v-if="open" class="i-ph-x h-3.5 w-3.5 !text-black dark:!text-white" />
        <i v-else class="i-ph-arrows-out-line-vertical h-3.5 w-3.5 !text-black dark:!text-white" />
      </OkuCollapsibleTrigger>
    </div>

    <div class="bg-white rounded dark:bg-blackOA-800 my-[10px] p-[10px]">
      <span class="text-codGray-700 dark:text-grayOA-50 text-sm leading-6">@oku-ui/primivites</span>
    </div>

    <OkuCollapsibleContent>
      <div key="lorem1" class="bg-white dark:bg-blackOA-800 rounded my-[10px] p-[10px]">
        <span class="text-codGray-700 dark:text-grayOA-50 text-sm leading-6">@productdevbook</span>
      </div>
      <div key="lorem2" class="bg-white dark:bg-blackOA-800 rounded my-[10px] p-[10px]">
        <span class="text-codGray-700 dark:text-grayOA-50 text-sm leading-6">@huntersofbook</span>
      </div>
    </OkuCollapsibleContent>
  </OkuCollapsible>
</template>
