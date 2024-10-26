<script setup lang="ts">
import { MenuItem, MenuSeparator } from '../index.ts'
import MenuWithAnchor from './MenuWithAnchor.vue'
import './styles.css'

function alert(name: string) {
  // eslint-disable-next-line no-alert
  window.alert(name)
}
</script>

<template>
  <div>
    <MenuWithAnchor>
      <MenuItem
        class="menu_itemClass"
        @select="alert('undo')"
      >
        Undo
      </MenuItem>
      <MenuItem
        class="menu_itemClass"
        @select="alert('redo')"
      >
        Redo
      </MenuItem>
      <MenuSeparator class="menu_separatorClass" />
      <MenuItem
        class="menu_itemClass"
        disabled
        @select="alert('cut')"
      >
        Cut
      </MenuItem>
      <MenuItem
        class="menu_itemClass"
        @select="alert('copy')"
      >
        Copy
      </MenuItem>
      <MenuItem
        class="menu_itemClass"
        @select="alert('paste')"
      >
        Paste
      </MenuItem>
    </MenuWithAnchor>
  </div>
</template>
