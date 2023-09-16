<script setup lang="ts">
interface Page {
  name: string
  path: '/arrow' | '/aspect-ratio' | '/avatar' | '/checkbox' | '/collapsible' | '/collection' | '/direction' | '/dismissable-layer' | '/focus-scope' | '/label' | '/popover' | '/popper' | '/portal' | '/presence' | '/progress' | '/radio-group' | '/roving-focus' | '/separator' | '/slider' | '/slot' | '/switch' | '/tabs' | '/toggle' | '/toggle-group' | '/tooltip' | '/visually-hidden' | '/toast' | '/hover-card' | '/dialog'
}

const pages: Page[] = [
  {
    name: 'OkuArrow',
    path: '/arrow',
  },
  {
    name: 'OkuAspectRatio',
    path: '/aspect-ratio',
  },
  {
    name: 'OkuAvatar',
    path: '/avatar',
  },
  {
    name: 'OkuCheckbox',
    path: '/checkbox',
  },
  {
    name: 'OkuCollapsible',
    path: '/collapsible',
  },
  {
    name: 'OkuCollection',
    path: '/collection',
  },
  {
    name: 'OkuDirection',
    path: '/direction',
  },
  {
    name: 'OkuDismissableLayer',
    path: '/dismissable-layer',
  },
  {
    name: 'OkuFocusScope',
    path: '/focus-scope',
  },
  {
    name: 'OkuLabel',
    path: '/label',
  },
  {
    name: 'OkuPopover',
    path: '/popover',
  },
  {
    name: 'OkuPopper',
    path: '/popper',
  },
  {
    name: 'OkuPortal',
    path: '/portal',
  },
  {
    name: 'OkuPresence',
    path: '/presence',
  },
  {
    name: 'OkuProgress',
    path: '/progress',
  },
  {
    name: 'OkuRadioGroup',
    path: '/radio-group',
  },
  {
    name: 'OkuRovingFocus',
    path: '/roving-focus',
  },
  {
    name: 'OkuSeparator',
    path: '/separator',
  },
  {
    name: 'OkuSlider',
    path: '/slider',
  },
  {
    name: 'OkuSlot',
    path: '/slot',
  },
  {
    name: 'OkuSwitch',
    path: '/switch',
  },
  {
    name: 'OkuTabs',
    path: '/tabs',
  },
  {
    name: 'OkuToggle',
    path: '/toggle',
  },
  {
    name: 'OkuToggleGroup',
    path: '/toggle-group',
  },
  {
    name: 'OkuTooltip',
    path: '/tooltip',
  },
  {
    name: 'OkuVisuallyHidden',
    path: '/visually-hidden',
  },
  {
    name: 'OkuToast',
    path: '/toast',
  },
  {
    name: 'OkuDialog',
    path: '/dialog',
  },
  {
    name: 'OkuHoverCard',
    path: '/hover-card',
  },
]
</script>

<template>
  <div class="grid grid-cols-3 gap-6">
    <nuxt-link
      v-for="page in pages"
      :key="page.name"
      :to="page.path"
      class="bg-cyan-900 hover:text-white text-white cursor-pointer hover:bg-cyan-700 py-4 rounded-lg px-4"
    >
      {{ page.name }}
    </nuxt-link>
  </div>
</template>
