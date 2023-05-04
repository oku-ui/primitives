<script setup lang="ts">
interface Page {
  name: string
  path: string
}
const pages: Page[] = [
  {
    name: 'OkuLabel',
    path: '/label',
  },
  {
    name: 'OkuAvatar',
    path: '/avatar',
  },
  {
    name: 'OkuAspectRatio',
    path: '/aspect-ratio',
  },
  {
    name: 'OkuSeparator',
    path: '/separator',
  },
]
</script>

<template>
  <div class="grid grid-cols-3 gap-6">
    <router-link
      v-for="page in pages"
      :key="page.name"
      :to="page.path"
      class="bg-blue-900 hover:text-white text-white cursor-pointer hover:bg-blue-700 py-4 rounded-lg px-4"
    >
      {{ page.name }}
    </router-link>
  </div>
</template>
