<script setup lang="ts">
import { OkuTooltip, OkuTooltipArrow, OkuTooltipContent, OkuTooltipPortal, OkuTooltipProvider, OkuTooltipTrigger } from '@oku-ui/tooltip'
</script>

<template>
  <div class="flex items-center justify-center">
    <OkuTooltipProvider>
      <OkuTooltip>
        <OkuTooltipTrigger as-child>
          <button class="text-codGray-900 bg-white dark:bg-codGray-900 dark:shadow-codGray-800 shadow-codGray-300 inline-flex h-[35px] w-[35px] items-center justify-center rounded-full  shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px] focus:shadow-black">
            <span class="i-ph-plus text-codGray-900 dark:text-white w-6 h-6" />
          </button>
        </OkuTooltipTrigger>
        <OkuTooltipPortal>
          <OkuTooltipContent
            class="bg-white dark:text-grayOA-50 dark:bg-codGray-900 px-2 py-2 text-codGray-800 rounded-[4px] data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade select-none text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]"
            :side-offset="5"
          >
            Add to library
            <OkuTooltipArrow class="fill-white dark:fill-codGray-900" />
          </OkuTooltipContent>
        </OkuTooltipPortal>
      </OkuTooltip>
    </OkuTooltipProvider>
  </div>
</template>
