<script setup lang="ts">
import { OkuAvatar, OkuAvatarFallback, OkuAvatarImage } from '@oku-ui/avatar'
</script>

<template>
  <div class="mt-4">
    <OkuAvatar class="w-40 h-40 bg-gray-400 items-center inline-block overflow-hidden rounded-full">
      <OkuAvatarImage
        class="w-full h-full object-cover"
        src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
      />
      <OkuAvatarFallback
        class="flex items-center text-white font-medium text-2xl h-full w-full justify-center"
        :delayms="500"
      >
        CT
      </OkuAvatarFallback>
    </OkuAvatar>
  </div>
</template>
