<script setup lang="ts">
import { AvatarFallback, AvatarImage, AvatarRoot } from '../index.ts'
import AvatarIcon from './AvatarIcon.vue'
import './styles.css'

const src = 'https://avatars.githubusercontent.com/u/62594983?v=4'
const srcBroken = 'https://broken.link.com/broken-pic.jpg'
</script>

<template>
  <div>
    <h1>Without image & with fallback</h1>
    <AvatarRoot class="avatar_rootClass">
      <AvatarFallback class="avatar_fallbackClass">
        JS
      </AvatarFallback>
    </AvatarRoot>

    <h1>With image & with fallback</h1>
    <AvatarRoot class="avatar_rootClass">
      <AvatarImage class="avatar_imageClass" alt="John Smith" :src="src" />
      <AvatarFallback :delay-ms="300" class="avatar_fallbackClass">
        JS
      </AvatarFallback>
    </AvatarRoot>

    <h1>With image & with fallback (but broken src)</h1>
    <AvatarRoot class="avatar_rootClass">
      <AvatarImage class="avatar_imageClass" alt="John Smith" :src="srcBroken" />
      <AvatarFallback class="avatar_fallbackClass">
        <AvatarIcon />
      </AvatarFallback>
    </AvatarRoot>
  </div>
</template>
