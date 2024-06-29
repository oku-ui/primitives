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
].map(page => ({
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
    <aside class="page-aside">
      <NuxtLink to="/" class="home-link">
        OkuUI
      </NuxtLink>

      <NuxtLink v-for="page in pages" :key="page.name" class="link" :to="page.to" :prefetch="false">
        {{ page.name }}
      </NuxtLink>
    </aside>
    <div class="page-content-box">
      <div class="page-header">
        <span>OkuUI</span>
        <a href="https://github.com/morgenstern-ui/vue-primitives">GitHub</a>
      </div>

      <main class="page-main">
        <NuxtPage />
      </main>
    </div>
  </div>
</template>

<style>
:where(html) {
  --shadow-color: 220 3% 15%;
  --shadow-strength: 1%;
  --inner-shadow-highlight: inset 0 -.5px 0 0 #fff, inset 0 .5px 0 0 #0001;
  --shadow-1: 0 1px 2px -1px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 9%));
  --shadow-2:
    0 3px 5px -2px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 3%)),
    0 7px 14px -5px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 5%));
  --shadow-3:
    0 -1px 3px 0 hsl(var(--shadow-color) / calc(var(--shadow-strength) + 2%)),
    0 1px 2px -5px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 2%)),
    0 2px 5px -5px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 4%)),
    0 4px 12px -5px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 5%)),
    0 12px 15px -5px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 7%));
}

html {
  font-family: system-ui;
  color: #161c26;
  background: #f0eeee;
}

body {
  margin: 0;
}
</style>

<style scoped>
.home-link {
  font-weight: bold;
  font-family: system-ui;
  text-decoration: none;
  font-size: 26px;
  color: #1084d6;
}

.link {
  font-family: system-ui;
  text-decoration: none;
  color: #161c26;
}

.link.router-link-exact-active {
  color: #1084d6;
}

.page {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 20px;
  padding: 24px;
}

.page-aside {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.page-header {
  display: flex;
  align-items: center;
  gap: 20px;

  margin-bottom: 20px;

  span {
    font-size: 32px;
    font-weight: 600;
    font-family: system-ui;
    font-size: 26px;
    color: #1084d6;
  }

  a {
    font-size: 20px;
    font-weight: 400;
    color: #161c26;
  }
}

.page-main {
  padding-bottom: 500px;
}
</style>
