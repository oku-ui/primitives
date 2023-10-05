<script setup lang="ts">
import { OkuMenuItem, OkuMenuSeparator } from '@oku-ui/menu'
import MenuWithAnchor from './MenuWithAnchor.vue'

function alert(text: string) {
  // eslint-disable-next-line no-alert
  window.alert(text)
}
</script>

<template>
  <MenuWithAnchor>
    <OkuMenuItem class="item" @select="alert('undo')">
      Undo
    </OkuMenuItem>
    <OkuMenuItem class="item" @select="alert('redo')">
      Redo
    </OkuMenuItem>
    <OkuMenuSeparator class="separator" />
    <OkuMenuItem class="item" disabled @select="alert('cut')">
      Cut
    </OkuMenuItem>
    <OkuMenuItem class="item" @select="alert('copy')">
      Copy
    </OkuMenuItem>
    <OkuMenuItem class="item" @select="alert('paste')">
      Paste
    </OkuMenuItem>
  </MenuWithAnchor>
</template>
