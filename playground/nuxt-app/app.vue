<script setup lang="ts">
import { provideConfigContext } from '../../packages/vue-primitives/src/config/index.ts'

const utils = [
  'Collection',
  'Focus Scope',
  'Popper',
  'Presence',
  'Roving Focus Group',
  'Visually Hidden',
].map(util => ({
  name: util.replaceAll(' ', ''),
  to: `/${util.toLowerCase().replaceAll(' ', '-')}/`,
}))

const components = [
  'Accordion',
  'Alert Dialog',
  'Aspect Ratio',
  'Avatar',
  'Checkbox',
  'Collapsible',
  'Dialog',
  'Hover Card',
  'Label',
  'Popover',
  'Progress',
  'Radio Group',
  'Scroll Area',
  'Separator',
  'Slider',
  'Switch',
  'Tabs',
  'Toast',
  'Toggle',
  'Toolbar',
  'Toggle Group',
].map(component => ({
  name: component.replaceAll(' ', ''),
  to: `/${component.toLowerCase().replaceAll(' ', '-')}/`,
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

      <div class="links-list">
        <div class="links-group">
          <span class="links-group__title">Utils</span>
          <div class="links-group__list">
            <NuxtLink v-for="util in utils" :key="util.name" class="link" :to="util.to">
              {{ util.name }}
            </NuxtLink>
          </div>
        </div>

        <div class="links-group">
          <span class="links-group__title">Coponents</span>
          <div class="links-group__list">
            <NuxtLink v-for="component in components" :key="component.name" class="link" :to="component.to">
              {{ component.name }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </aside>

    <div class="page-content-box">
      <div class="page-header">
        <span>OkuUI</span>
        <a href="https://github.com/perigee-ui/vue-primitives">GitHub</a>
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
  background: #eeeff0;
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

.links-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.links-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.links-group__title {
  display: block;
  font-weight: 500;
  padding-block: 6px;
  border-bottom: 1px solid #b4b6b9;
}

.links-group__list {
  display: flex;
  flex-direction: column;
  gap: 12px;
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
  grid-template-columns: 200px 1fr;
}

.page-aside {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px;
}

.page-content-box {
  padding: 24px;
  min-width: 600px;
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
