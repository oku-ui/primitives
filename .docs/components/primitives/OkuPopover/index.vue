<script setup lang="ts">
import { OkuPopover, OkuPopoverArrow, OkuPopoverClose, OkuPopoverContent, OkuPopoverPortal, OkuPopoverTrigger } from '@oku-ui/popover'
</script>

<template>
  <div class="flex items-center justify-center">
    <OkuPopover>
      <OkuPopoverTrigger as-child>
        <button
          class="rounded-full w-[35px] h-[35px] inline-flex items-center justify-center text-grayOA-50 bg-white dark:bg-codGray-900 hover:bg-grayOA-50 cursor-default outline-none"
          aria-label="Update dimensions"
        >
          <span class="i-ph-sliders-horizontal-duotone w-6 h-6 text-codGray-900 dark:text-white " />
        </button>
      </OkuPopoverTrigger>
      <OkuPopoverPortal>
        <OkuPopoverContent
          class="rounded p-5 w-[260px] bg-white dark:bg-codGray-900 shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.grayOA-50)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
          :side-offset="5"
        >
          <div class="flex flex-col gap-2.5">
            <p class="text-codGray-950 dark:text-white text-[15px] leading-[19px] font-medium mb-2.5">
              Dimensions
            </p>
            <fieldset class="flex gap-5 items-center">
              <label class="text-[13px] text-grayOA-800 dark:text-grayOA-100 w-[75px]" htmlFor="width">
                Width
              </label>
              <input
                id="width"
                class="w-full inline-flex items-center justify-center flex-1 rounded px-2.5 text-[13px] leading-none text-grayOA-800 dark:text-grayOA-100  bg-white dark:bg-codGray-900 shadow-[0_0_0_1px] shadow-grayOA-400 h-[25px] focus:shadow-[0_0_0_2px] outline-none"
                defaultValue="100%"
              >
            </fieldset>
            <fieldset class="flex gap-5 items-center">
              <label class="text-[13px] text-grayOA-800 dark:text-grayOA-100 w-[75px]" htmlFor="maxWidth">
                Max. width
              </label>
              <input
                id="maxWidth"
                class="w-full inline-flex items-center justify-center flex-1 rounded px-2.5 text-[13px] leading-none text-grayOA-800 dark:text-grayOA-100  bg-white dark:bg-codGray-900 shadow-[0_0_0_1px] shadow-grayOA-400 h-[25px] focus:shadow-[0_0_0_2px] outline-none"
                defaultValue="300px"
              >
            </fieldset>
            <fieldset class="flex gap-5 items-center">
              <label class="text-[13px] text-grayOA-800 dark:text-grayOA-100 w-[75px]" htmlFor="height">
                Height
              </label>
              <input
                id="height"
                class="w-full inline-flex items-center justify-center flex-1 rounded px-2.5 text-[13px] leading-none text-grayOA-800 dark:text-grayOA-100 bg-white dark:bg-codGray-900  shadow-[0_0_0_1px] shadow-grayOA-400 h-[25px] focus:shadow-[0_0_0_2px] outline-none"
                defaultValue="25px"
              >
            </fieldset>
            <fieldset class="flex gap-5 items-center">
              <label class="text-[13px] text-grayOA-800 dark:text-grayOA-100 w-[75px]" htmlFor="maxHeight">
                Max. height
              </label>
              <input
                id="maxHeight"
                class="w-full inline-flex items-center justify-center flex-1 rounded px-2.5 text-[13px] leading-none text-grayOA-800 dark:text-grayOA-100 bg-white dark:bg-codGray-900  shadow-[0_0_0_1px] shadow-grayOA-400 h-[25px] focus:shadow-[0_0_0_2px] outline-none"
                defaultValue="none"
              >
            </fieldset>
          </div>
          <OkuPopoverClose
            class="rounded-full h-[25px] w-[25px] inline-flex items-center justify-center text-grayOA-50 absolute top-[5px] right-[5px] hover:bg-grayOA-100 dark:hover:bg-codGray-800 focus:shadow-[0_0_0_2px] focus:shadow-grayOA-400 outline-none cursor-default"
            aria-label="Close"
          >
            <span class="i-ph-x-bold w-4 h-4 text-codGray-900 dark:text-white" />
          </OkuPopoverClose>
          <OkuPopoverArrow class="fill-white dark:fill-codGray-900" />
        </OkuPopoverContent>
      </OkuPopoverPortal>
    </OkuPopover>
  </div>
</template>
