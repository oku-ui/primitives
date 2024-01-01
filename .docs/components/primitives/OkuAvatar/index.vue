<script setup lang="ts">
import { OkuAvatar, OkuAvatarFallback, OkuAvatarImage } from '@oku-ui/avatar'

const src = 'https://picsum.photos/id/1005/400/400'
const src2 = 'https://picsum.photos/id/1010/400/400'

const srcBroken = 'https://broken.link.com/broken-pic.jpg'
</script>

<template>
  <div class="grid grid-cols-4 gap-4 items-center justify-center">
    <OkuAvatar class="w-14 h-14 bg-oku-200 items-center inline-block overflow-hidden rounded-full">
      <OkuAvatarImage class="w-full h-full object-cover" :src="src" />
      <OkuAvatarFallback
        class="flex items-center text-white font-medium text-2xl h-full w-full justify-center"
        :delay-ms="100"
      >
        CT
      </OkuAvatarFallback>
    </OkuAvatar>

    <OkuAvatar class="w-14 h-14 bg-oku-400 items-center inline-block overflow-hidden rounded-full">
      <OkuAvatarImage class="w-full h-full object-cover" :src="src2" />
      <OkuAvatarFallback
        class="flex items-center text-white font-medium text-2xl h-full w-full justify-center"
        :delay-ms="100"
      >
        MT
      </OkuAvatarFallback>
    </OkuAvatar>

    <OkuAvatar class="w-14 h-14 bg-codGray-700 dark:bg-grayOA-200 items-center inline-block overflow-hidden rounded-full">
      <OkuAvatarFallback class="flex items-center text-white dark:text-codGray-900 font-bold h-full w-full justify-center" :delay-ms="100">
        CT
      </OkuAvatarFallback>
    </OkuAvatar>

    <OkuAvatar class="w-14 h-14 bg-codGray-900 dark:bg-grayOA-400 items-center inline-block overflow-hidden rounded-full">
      <OkuAvatarImage class="w-full h-full object-cover" :src="srcBroken" />
    </OkuAvatar>
  </div>
</template>
