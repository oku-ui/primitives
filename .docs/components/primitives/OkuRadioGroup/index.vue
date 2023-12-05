<script setup lang="ts">
import { OkuRadioGroup, OkuRadioGroupIndicator, OkuRadioGroupItem } from '@oku-ui/radio-group'
</script>

<template>
  <div class="flex items-center justify-center">
    <form>
      <OkuRadioGroup
        class="flex flex-col gap-2.5"
        default-value="default"
        aria-label="View density"
      >
        <div class="flex items-center">
          <OkuRadioGroupItem
            id="r1"
            class="bg-white w-[25px] h-[25px] rounded-full shadow-[0_2px_10px] shadow-grayOA-300 dark:shadow-grayOA-800 hover:bg-oku-100 focus:shadow-[0_0_0_2px] focus:shadow-black outline-none cursor-default"
            value="default"
          >
            <OkuRadioGroupIndicator class="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-oku-500" />
          </OkuRadioGroupItem>
          <label class="text-codGray-700 dark:text-white text-[15px] leading-none pl-[15px]" htmlFor="r1">
            Default
          </label>
        </div>
        <div class="flex items-center">
          <OkuRadioGroupItem
            id="r2"
            class="bg-white w-[25px] h-[25px] rounded-full shadow-[0_2px_10px] shadow-grayOA-300 dark:shadow-grayOA-800 hover:bg-oku-100 focus:shadow-[0_0_0_2px] focus:shadow-black outline-none cursor-default"
            value="comfortable"
          >
            <OkuRadioGroupIndicator class="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-oku-500" />
          </OkuRadioGroupItem>
          <label class="text-codGray-700 dark:text-white text-[15px] leading-none pl-[15px]" htmlFor="r2">
            Comfortable
          </label>
        </div>
        <div class="flex items-center">
          <OkuRadioGroupItem
            id="r3"
            class="bg-white w-[25px] h-[25px] rounded-full shadow-[0_2px_10px] shadow-grayOA-300 dark:shadow-grayOA-800 hover:bg-oku-100 focus:shadow-[0_0_0_2px] focus:shadow-black outline-none cursor-default"
            value="compact"
          >
            <OkuRadioGroupIndicator class="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-oku-500" />
          </OkuRadioGroupItem>
          <label class="text-codGray-700 dark:text-white text-[15px] leading-none pl-[15px]" htmlFor="r3">
            Compact
          </label>
        </div>
      </OkuRadioGroup>
    </form>
  </div>
</template>
