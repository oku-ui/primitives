<script setup lang="ts">
import { ref } from 'vue'
import { CollapsibleContent, CollapsibleRoot, CollapsibleTrigger } from '@oku-ui/primitives'
import { Icon } from '@iconify/vue'

const open = ref(false)
</script>

<template>
  <CollapsibleRoot
    v-model:open="open"
    class="w-[300px]"
  >
    <div style="display: flex; align-items: center; justify-content: space-between">
      <span class="text-white text-[15px] leading-[25px]"> @peduarte starred 3 repos </span>
      <CollapsibleTrigger
        class="cursor-default rounded-full h-[25px] w-[25px] inline-flex items-center justify-center text-mauve12 shadow-[0_2px_10px] shadow-blackA7 outline-none data-[state=closed]:bg-white data-[state=open]:bg-indigo3 hover:bg-indigo3 focus:shadow-[0_0_0_2px] focus:shadow-black"
      >
        <Icon
          v-if="open"
          icon="radix-icons:cross-2"
          class="h-3.5 w-3.5"
        />
        <Icon
          v-else
          icon="radix-icons:row-spacing"
          class="h-3.5 w-3.5"
        />
      </CollapsibleTrigger>
    </div>

    <div class="bg-white rounded mt-[10px] p-[10px] shadow-[0_2px_10px] shadow-blackA7">
      <span class="text-mauve12 text-[15px] leading-[25px]">@oku-ui/primitives</span>
    </div>

    <CollapsibleContent class="data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden">
      <div class="bg-white rounded my-[10px] p-[10px] shadow-[0_2px_10px] shadow-blackA7">
        <span class="text-mauve12 text-[15px] leading-[25px]">@vuejs/core</span>
      </div>
      <div class="bg-white rounded my-[10px] p-[10px] shadow-[0_2px_10px] shadow-blackA7">
        <span class="text-mauve12 text-[15px] leading-[25px]">@radix-ui/primitives</span>
      </div>
    </CollapsibleContent>
  </CollapsibleRoot>
</template>
