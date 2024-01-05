<script setup lang="ts">
import { OkuAvatar, OkuAvatarFallback, OkuAvatarImage } from '@oku-ui/avatar'
import AvatarIcon from './AvatarIcon.vue'

const src = 'https://picsum.photos/id/1005/400/400'
const srcBroken = 'https://broken.link.com/broken-pic.jpg'
</script>

<template>
  <h1>Without image & with fallback</h1>
  <OkuAvatar class="avatar">
    <OkuAvatarFallback class="avatar-fallback">
      JS
    </OkuAvatarFallback>
  </OkuAvatar>

  <h1>With image & with fallback</h1>
  <OkuAvatar class="avatar">
    <OkuAvatarImage class="avatar-image" alt="John Smith" :src="src" />
    <OkuAvatarFallback :delay-ms="300" class="avatar-fallback">
      JS
    </OkuAvatarFallback>
  </OkuAvatar>

  <h1>With image & with fallback (but broken src)</h1>
  <OkuAvatar class="avatar">
    <OkuAvatarImage
      class="avatar-image"
      alt="John Smith"
      :src="srcBroken"
      @loading-status-change="console.log($event)"
    />
    <OkuAvatarFallback class="avatar-fallback">
      <AvatarIcon />
    </OkuAvatarFallback>
  </OkuAvatar>
</template>
