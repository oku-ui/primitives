<script setup lang="ts">
import { OkuToolbar, OkuToolbarButton, OkuToolbarLink, OkuToolbarSeparator, OkuToolbarToggleGroup, OkuToolbarToggleItem } from '@oku-ui/toolbar'
</script>

<template>
  <div class="w-full">
    <OkuToolbar
      class="flex p-2 w-full min-w-max rounded-md bg-white dark:bg-codGray-900 shadow-[0_2px_6px] shadow-grayOA-200 dark:shadow-codGray-900"
      aria-label="Formatting options"
    >
      <OkuToolbarToggleGroup type="multiple" aria-label="Text formatting">
        <OkuToolbarToggleItem
          class="flex-shrink-0 flex-grow-0 basis-auto hover:bg-oku-300/20 text-codGray-700 h-[25px] px-[5px] rounded inline-flex text-[13px] leading-none items-center justify-center ml-0.5 outline-none focus:relative focus:shadow-[0_0_0_2px] first:ml-0 data-[state=on]:bg-oku-200 data-[state=on]:text-oku-900 dark:data-[state=on]:bg-oku-400 dark:data-[state=on]:text-oku-100"
          value="bold"
          aria-label="Bold"
        >
          <span class="i-ic-baseline-format-bold w-4 h-4 text-codGray-600 dark:text-white" />
        </OkuToolbarToggleItem>
        <OkuToolbarToggleItem
          class="flex-shrink-0 flex-grow-0 basis-auto text-codGray-700 h-[25px] px-[5px] rounded inline-flex text-[13px] leading-none items-center justify-center ml-0.5 outline-none focus:relative focus:shadow-[0_0_0_2px] first:ml-0 data-[state=on]:bg-oku-200 data-[state=on]:text-oku-900 dark:data-[state=on]:bg-oku-400 dark:data-[state=on]:text-oku-100"
          value="italic"
          aria-label="Italic"
        >
          <span class="i-ic-baseline-format-italic w-4 h-4 text-codGray-600 dark:text-white" />
        </OkuToolbarToggleItem>
        <OkuToolbarToggleItem
          class="flex-shrink-0 flex-grow-0 basis-auto text-codGray-700 h-[25px] px-[5px] rounded inline-flex text-[13px] leading-none items-center justify-center ml-0.5 outline-none focus:relative focus:shadow-[0_0_0_2px] first:ml-0 data-[state=on]:bg-oku-200 data-[state=on]:text-oku-900 dark:data-[state=on]:bg-oku-400 dark:data-[state=on]:text-oku-100"
          value="strikethrough"
          aria-label="Strike through"
        >
          <span class="i-ic-baseline-format-strikethrough w-4 h-4 text-codGray-600 dark:text-white" />
        </OkuToolbarToggleItem>
      </OkuToolbarToggleGroup>
      <OkuToolbarSeparator class="w-[1px] bg-grayOA-300 mx-[10px]" />
      <OkuToolbarToggleGroup type="single" default-value="center" aria-label="Text alignment">
        <OkuToolbarToggleItem
          class="flex-shrink-0 flex-grow-0 basis-auto text-codGray-700 hover:bg-oku-50 h-[25px] px-[5px] rounded inline-flex text-[13px] leading-none items-center justify-center ml-0.5 outline-none focus:relative focus:shadow-[0_0_0_2px] first:ml-0 data-[state=on]:bg-oku-200 data-[state=on]:text-oku-900 dark:data-[state=on]:bg-oku-400 dark:data-[state=on]:text-oku-100"
          value="left"
          aria-label="Left aligned"
        >
          <span class="i-ic-baseline-format-align-left w-4 h-4 text-codGray-600 dark:text-white" />
        </OkuToolbarToggleItem>
        <OkuToolbarToggleItem
          class="flex-shrink-0 flex-grow-0 basis-auto text-codGray-700 hover:bg-oku-50 h-[25px] px-[5px] rounded inline-flex text-[13px] leading-none items-center justify-center  ml-0.5 outline-none focus:relative focus:shadow-[0_0_0_2px] first:ml-0 data-[state=on]:bg-oku-200 data-[state=on]:text-oku-900 dark:data-[state=on]:bg-oku-400 dark:data-[state=on]:text-oku-100"
          value="center"
          aria-label="Center aligned"
        >
          <span class="i-ic-baseline-format-align-center w-4 h-4 text-codGray-600 dark:text-white" />
        </OkuToolbarToggleItem>
        <OkuToolbarToggleItem
          class="flex-shrink-0 flex-grow-0 basis-auto text-codGray-700 hover:bg-oku-50 h-[25px] px-[5px] rounded inline-flex text-[13px] leading-none items-center justify-center ml-0.5 outline-none focus:relative focus:shadow-[0_0_0_2px] first:ml-0 data-[state=on]:bg-oku-200 data-[state=on]:text-oku-900 dark:data-[state=on]:bg-oku-400 dark:data-[state=on]:text-oku-100"
          value="right"
          aria-label="Right aligned"
        >
          <span class="i-ic-baseline-format-align-right w-4 h-4 text-codGray-600 dark:text-white" />
        </OkuToolbarToggleItem>
      </OkuToolbarToggleGroup>
      <OkuToolbarSeparator class="w-[1px] bg-grayOA-300 mx-[10px]" />
      <OkuToolbarLink
        class="bg-transparent text-grayOA-400 hidden sm:inline-flex justify-center items-center hover:bg-transparent hover:cursor-pointer flex-shrink-0 flex-grow-0 basis-auto h-[25px] px-[5px] rounded text-[13px] leading-none bg-codGray-800 ml-0.5 outline-none focus:relative focus:shadow-[0_0_0_2px] first:ml-0"
        href="#"
        target="_blank"
        :style="{ marginRight: 10 }"
      >
        Edited 2 hours ago
      </OkuToolbarLink>
      <OkuToolbarButton
        class="px-[10px] text-white font-medium bg-oku-500 flex-shrink-0 flex-grow-0 basis-auto h-[25px] rounded inline-flex text-[13px] leading-none items-center justify-center outline-none focus:relative focus:shadow-[0_0_0_2px]"
        :style="{ marginLeft: 'auto' }"
      >
        Share
      </OkuToolbarButton>
    </OkuToolbar>
  </div>
</template>
