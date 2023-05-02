<script setup lang="ts">
import { OkuAvatar, OkuAvatarFallback, OkuAvatarImage } from '@oku-ui/avatar'
</script>

<template>
  <div class="mt-4">
    <OkuAvatar class="w-40 h-40 bg-gray-400 items-center inline-block overflow-hidden rounded-full">
      <OkuAvatarImage
        class="w-full h-full object-cover"
        src="https://images.unsplash.com/photo-1495216875107-c6c043eb703f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
      />
      <OkuAvatarFallback
        class="flex items-center text-white font-medium text-2xl h-full w-full justify-center"
        :delayms="100"
      >
        CT
      </OkuAvatarFallback>
    </OkuAvatar>
  </div>
</template>
