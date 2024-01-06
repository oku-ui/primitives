<script setup lang="ts">
import { ref } from 'vue'
import { OkuMenuItem, OkuMenuItemIndicator, OkuMenuRadioGroup, OkuMenuRadioItem, OkuMenuSeparator } from '@oku-ui/menu'
import MenuWithAnchor from './MenuWithAnchor.vue'
import TickIcon from './TickIcon.vue'

const files = ['README.md', 'index.js', 'page.css']
const file = ref(files[1])

function alert(text: string) {
  // eslint-disable-next-line no-alert
  window.alert(text)
}
</script>

<template>
  <MenuWithAnchor>
    <OkuMenuItem class="menu-item" @select="alert('minimize')">
      Minimize window
    </OkuMenuItem>
    <OkuMenuItem class="menu-item" @select="alert('zoom')">
      Zoom
    </OkuMenuItem>
    <OkuMenuItem class="menu-item" @select="alert('smaller')">
      Smaller
    </OkuMenuItem>
    <OkuMenuSeparator class="menu-separator" />
    <OkuMenuRadioGroup :value="file" @value-change="(value: string) => file = value">
      <OkuMenuRadioItem v-for="_file in files" :key="_file" class="menu-item" :value="_file">
        {{ _file }}
        <OkuMenuItemIndicator>
          <TickIcon />
        </OkuMenuItemIndicator>
      </OkuMenuRadioItem>
    </OkuMenuRadioGroup>
  </MenuWithAnchor>
</template>
