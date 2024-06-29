<script setup lang="ts">
import { provideConfigContext } from '../../packages/vue-primitives/src/config/index.ts'

const pages = [
  'Accordion',
  'Aspect Ratio',
  'Avatar',
  'Checkbox',
  'Collapsible',
  'Label',
  'Progress',
  'Separator',
  'Tabs',
  'Toggle',
  'Toggle Group',
].map((page) => ({
  name: page,
  to: `/${page.toLowerCase().replace(' ', '-')}`,
}))

const useIdFunction = () => useId()

provideConfigContext({
  useId: useIdFunction,
})
</script>

<template>
  <div class="page">
    <aside class="page-header">
      <NuxtLink v-for="page in pages" :key="page.name" :to="page.to" :prefetch="false">
        {{ page.name }}
      </NuxtLink>
    </aside>
    <main class="page-main">
      <NuxtPage />
    </main>
  </div>
</template>

<style>
body {
  margin: 0;
}

.page {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 20px;
  padding: 16px;
}

.page-header {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.page-main {
  padding-bottom: 500px;

  section {
    padding: 20px;
    border: 1px solid #ccc;
  }

  section+section {
    margin-top: 60px;
  }
}
</style>
