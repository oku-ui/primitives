<script setup lang="ts">
import { shallowRef } from 'vue'
import { MenuItem, MenuItemIndicator, MenuRadioGroup, MenuRadioItem, MenuSeparator } from '../index.ts'
import MenuWithAnchor from './MenuWithAnchor.vue'
import TickIcon from './TickIcon.vue'

const files = ['README.md', 'index.js', 'page.css']
const file = shallowRef(files[1])

function setFile(v: string) {
  file.value = v
}

function alert(name: string) {
  // eslint-disable-next-line no-alert
  window.alert(name)
}
</script>

<template>
  <div>
    <MenuWithAnchor>
      <MenuItem class="menu_itemClass" @select="alert('minimize')">
        Minimize window
      </MenuItem>
      <MenuItem class="menu_itemClass" @select="alert('zoom')">
        Zoom
      </MenuItem>
      <MenuItem class="menu_itemClass" @select="alert('smaller')">
        Smaller
      </MenuItem>
      <MenuSeparator class="menu_separatorClass" />
      <MenuRadioGroup :value="file" @update:value="setFile">
        <MenuRadioItem v-for="el in files" :key="el" class="menu_itemClass" :value="el">
          {{ el }}
          <MenuItemIndicator>
            <TickIcon />
          </MenuItemIndicator>
        </MenuRadioItem>
      </MenuRadioGroup>
    </MenuWithAnchor>
  </div>
</template>
