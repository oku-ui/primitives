<script setup lang="ts">
import { provideConfigContext } from '../../packages/vue-primitives/src/config/index.ts'

const useIdFunction = () => useId()

provideConfigContext({
  useId: useIdFunction,
})
</script>

<template>
  <div class="page">
    <header class="page-header">
      <NuxtLink to="/">
        Home
      </NuxtLink>
      <NuxtLink to="/roving-focus-group">
        RovingFocusGroup
      </NuxtLink>
      <NuxtLink to="/toggle">
        Toggle
      </NuxtLink>
      <NuxtLink to="/toggle-group">
        ToggleGroup
      </NuxtLink>
      <NuxtLink to="/collapsible">
        Collapsible
      </NuxtLink>
    </header>
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
  padding: 20px;
}

.page-header {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: 20px;
}

.page-main {
  padding-bottom: 500px;

  section {
    padding: 20px;
    border: 1px solid #ccc;
  }

  section + section{
    margin-top: 60px;
  }
}
</style>
