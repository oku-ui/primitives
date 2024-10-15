<script setup lang="ts">
import { ref } from 'vue'

import {
  OkuCollapsible,
  OkuCollapsibleContent,
  OkuCollapsibleTrigger,
} from '@oku-ui/collapsible'

const open = ref(false)
</script>

<template>
  <div>
    <OkuCollapsible v-model="open" class="max-w-[280px] w-full mx-auto">
      <div style="display: flex; align-items: center; justify-content: space-between">
        <span class="text-white text-[15px] leading-[25px]">
          @productdevbook starred 3 repositories
        </span>
        <OkuCollapsibleTrigger
          class="rounded-full h-[25px] w-[25px] inline-flex items-center justify-center text-violet11 shadow-[0_2px_10px] shadow-blackA7 outline-none data-[state=closed]:bg-white data-[state=open]:bg-violet3 hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black"
        >
          <i v-if="open" class="i-ph-x h-[15px] w-[15px] text-violet11" />
          <i v-else class="i-ph-arrows-out-line-vertical h-[15px] w-[15px] text-violet11" />
        </OkuCollapsibleTrigger>
      </div>
      <div class="bg-white rounded my-[10px] p-[10px] shadow-[0_2px_10px] shadow-blackA7">
        <span class="text-violet11 text-[15px] leading-[25px]">@oku-ui/primitives</span>
      </div>
      <OkuCollapsibleContent>
        <div key="lorem1" class="bg-white rounded my-[10px] p-[10px] shadow-[0_2px_10px] shadow-blackA7">
          <span class="text-violet11 text-[15px] leading-[25px]">@oku-ui/gunes</span>
        </div>
        <div key="lorem2" class="bg-white rounded my-[10px] p-[10px] shadow-[0_2px_10px] shadow-blackA7">
          <span class="text-violet11 text-[15px] leading-[25px]">@radix-ui/primitives</span>
        </div>
      </OkuCollapsibleContent>
    </OkuCollapsible>
  </div>
</template>
