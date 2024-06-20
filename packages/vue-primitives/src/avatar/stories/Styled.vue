<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '../index.ts'
import AvatarIcon from './AvatarIcon.vue'
import './styles.css'

const src = 'https://avatars.githubusercontent.com/u/62594983?v=4'
const srcBroken = 'https://broken.link.com/broken-pic.jpg'
</script>

<template>
  <div>
    <h1>Without image & with fallback</h1>
    <Avatar class="avatar_rootClass">
      <AvatarFallback class="avatar_fallbackClass">
        JS
      </AvatarFallback>
    </Avatar>

    <h1>With image & with fallback</h1>
    <Avatar class="avatar_rootClass">
      <AvatarImage class="avatar_imageClass" alt="John Smith" :src="src" />
      <AvatarFallback :delay-ms="300" class="avatar_fallbackClass">
        JS
      </AvatarFallback>
    </Avatar>

    <h1>With image & with fallback (but broken src)</h1>
    <Avatar class="avatar_rootClass">
      <AvatarImage
        class="avatar_imageClass"
        alt="John Smith"
        :src="srcBroken"
        @loading-status-change="console.log"
      />
      <AvatarFallback class="avatar_fallbackClass">
        <AvatarIcon />
      </AvatarFallback>
    </Avatar>
  </div>
</template>
