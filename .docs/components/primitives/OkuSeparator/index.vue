<script setup lang="ts">
import { OkuSeparator } from '@oku-ui/separator'
</script>

<template>
  <div class="flex items-center justify-center">
    <div>
      <h1 class="text-codGray-950 dark:text-white">
        Horizontal
      </h1>
      <p class="text-codGray-700 dark:text-grayOA-200 mt-1">
        The following separator is horizontal and has semantic meaning.
      </p>

      <OkuSeparator class="border-0 bg-grayOA-400 my-4 h-[1px] dark:bg-codGray-700" orientation="horizontal" />
      <div class="flex items-center h-full">
        <p class="text-codGray-900 dark:text-grayOA-100">
          Home
        </p>
        <OkuSeparator class="w-[1px] mx-4 bg-grayOA-400 dark:bg-codGray-700 h-6" orientation="vertical" decorative />
        <p class="text-codGray-900 dark:text-grayOA-100">
          Docs
        </p>
        <OkuSeparator class="w-[1px] mx-4 bg-grayOA-400 dark:bg-codGray-700 h-6" orientation="vertical" decorative />
        <p class="text-codGray-900 dark:text-grayOA-100">
          Source
        </p>
      </div>
    </div>
  </div>
</template>
