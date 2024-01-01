<script setup lang="ts">
import { OkuScrollArea, OkuScrollAreaCorner, OkuScrollAreaScrollbar, OkuScrollAreaThumb, OkuScrollAreaViewport } from '@oku-ui/scroll-area'

const TAGS = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`)
</script>

<template>
  <OkuScrollArea class="w-[200px] h-[225px] rounded overflow-hidden shadow-[0_2px_10px] shadow-grayOA-200 bg-white dark:bg-grayOA-950 dark:shadow-grayOA-900">
    <OkuScrollAreaViewport class="w-full h-full rounded">
      <div class="py-[15px] px-5">
        <div class="text-grayOA-950 dark:text-white text-[15px] leading-[18px] font-medium">
          Tags
        </div>
        <template v-for="(tag, index) in TAGS" :key="index">
          <div
            class="text-grayOA-700 dark:text-grayOA-200 text-[13px] leading-[18px] mt-2.5 pt-2.5 border-t border-t-grayOA-200 dark:border-t-grayOA-800"
          >
            {{ tag }}
          </div>
        </template>
      </div>
    </OkuScrollAreaViewport>
    <OkuScrollAreaScrollbar
      class="flex select-none touch-none p-0.5 bg-grayOA-100 dark:bg-grayOA-800 transition-colors duration-[160ms] ease-out hover:bg-grayOA-200 dark:hover:bg-grayOA-700 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
      orientation="vertical"
    >
      <OkuScrollAreaThumb class="flex-1 bg-grayOA-400 dark:bg-grayOA-200 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
    </OkuScrollAreaScrollbar>
    <OkuScrollAreaScrollbar
      class="flex select-none touch-none p-0.5 bg-grayOA-100 dark:bg-grayOA-800 transition-colors duration-[160ms] ease-out hover:bg-grayOA-200 dark:hover:bg-grayOA-700 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
      orientation="horizontal"
    >
      <OkuScrollAreaThumb class="flex-1 bg-grayOA-50 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
    </OkuScrollAreaScrollbar>
    <OkuScrollAreaCorner class="bg-grayOA-50" />
  </OkuScrollArea>
</template>
