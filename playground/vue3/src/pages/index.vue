<script setup lang="ts">
import json from '../components.json'
</script>

<template>
  <div style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.5rem;">
    <nuxt-link
      v-for="page in json" :key="page.name" :to="page.path"
      style="background-color: #2b6cb0; color: #fff; cursor: pointer; padding-top: 1rem; padding-bottom: 1rem; padding-left: 1.5rem; padding-right: 1.5rem; border-radius: 0.375rem;"
    >
      {{ page.name }}
    </nuxt-link>
  </div>
</template>
