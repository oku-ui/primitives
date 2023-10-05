<script setup lang="ts">
import { ref } from 'vue'
import { OkuMenuItem, OkuMenuItemIndicator, OkuMenuRadioGroup, OkuMenuRadioItem, OkuMenuSeparator } from 'oku-ui/OkuMenu'
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
    <OkuMenuItem class="item" @select="alert('minimize')">
      Minimize window
    </OkuMenuItem>
    <OkuMenuItem class="item" @select="alert('zoom')">
      Zoom
    </OkuMenuItem>
    <OkuMenuItem class="item" @select="alert('smaller')">
      Smaller
    </OkuMenuItem>
    <OkuMenuSeparator class="separator" />
    <OkuMenuRadioGroup :value="file" @value-change="(_file: string) => file = _file">
      <OkuMenuRadioItem v-for="_file in files" :key="_file" class="item" :value="_file">
        {{ file }}
        <OkuMenuItemIndicator>
          <TickIcon />
        </OkuMenuItemIndicator>
      </OkuMenuRadioItem>
    </OkuMenuRadioGroup>
  </MenuWithAnchor>
</template>
