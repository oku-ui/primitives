<script setup lang="ts">
import { OkuTooltip, OkuTooltipArrow, OkuTooltipContent, OkuTooltipPortal, OkuTooltipProvider, OkuTooltipTrigger } from '@oku-ui/tooltip'
</script>

<template>
  <OkuTooltipProvider>
    <OkuTooltip>
      <OkuTooltipTrigger as-child>
        <button class="text-violet11 shadow-blackA7 hover:bg-violet3 inline-flex h-[35px] w-[35px] items-center justify-center rounded-full bg-white shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px] focus:shadow-black">
          <span class="i-ic-baseline-plus text-violet11 w-5 h-5" />
        </button>
      </OkuTooltipTrigger>
      <OkuTooltipPortal>
        <OkuTooltipContent
          class="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-violet11 select-none rounded-[4px] bg-white px-[15px] py-[10px] text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]"
          :side-offset="5"
        >
          Add to library
          <OkuTooltipArrow class="fill-white" />
        </OkuTooltipContent>
      </OkuTooltipPortal>
    </OkuTooltip>
  </OkuTooltipProvider>
</template>
