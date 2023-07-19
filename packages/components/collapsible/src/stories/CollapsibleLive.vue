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
  <OkuCollapsible v-model:open="open" class="max-w-xs" :disabled="rootDisabled">
    <div style="display: flex; align-items: center; justify-content: space-between">
      <span class="text-black dark:text-white text-sm leading-6">
        @oku-ui starred 3 repos
      </span>
      <OkuCollapsibleTrigger
        class="cursor-default rounded-full h-6 w-6 inline-flex items-center justify-center text-black dark:text-gray-300 outline-none dark:data-[state=closed]:bg-gray-500 data-[state=closed]:bg-gray-200 data-[state=open]:bg-red-300 hover:bg-gray-500 focus:shadow-black"
      >
        <i v-if="open" class="i-ph-arrows-in-line-vertical h-3.5 w-3.5 dark:text-white" />
        <i v-else class="i-ph-arrows-out-line-vertical h-3.5 w-3.5 dark:text-white" />
      </OkuCollapsibleTrigger>
    </div>

    <div class="bg-gray-100 rounded my-[10px] p-[10px]">
      <span class="text-oku-500 text-sm leading-6">@oku-ui/primivites</span>
    </div>

    <!-- TODO: TransitionGroup make it work -->
    <TransitionGroup name="fade">
      <OkuCollapsibleContent>
        <div key="lorem1" class="bg-gray-100 rounded my-[10px] p-[10px]">
          <span class="text-oku-500 text-sm leading-6">@productdevbook</span>
        </div>
        <div key="lorem2" class="bg-gray-100 rounded my-[10px] p-[10px]">
          <span class="text-oku-500 text-sm leading-6">@huntersofbook</span>
        </div>
      </OkuCollapsibleContent>
    </TransitionGroup>
  </OkuCollapsible>
</template>

<style lang="postcss">
@keyframes rotateIn {
  0% {
    transform: scale(0) rotateZ(calc(var(--direction, 0) * 45deg));
  }

  100% {
    transform: scale(1)
  }
}

.fade-enter-from {
  transform: scale(0) rotateZ(calc(var(--direction, 0) * 45deg));
}

.fade-enter-to {
  transform: scale(1)
}

.fade-enter-active {
  animation: rotateIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);

  &[data-state='top'] {
    --direction: 1;
  }

  &[data-state='bottom'] {
    --direction: -1;
  }
}

.fade-leave-to {
  animation: rotateIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) reverse;
}
</style>
