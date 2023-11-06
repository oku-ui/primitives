<script setup lang="ts">
import { ref } from 'vue'
import { OkuContextMenu, OkuContextMenuContent, OkuContextMenuItem, OkuContextMenuItemIndicator, OkuContextMenuPortal, OkuContextMenuRadioGroup, OkuContextMenuRadioItem, OkuContextMenuSeparator, OkuContextMenuTrigger } from '@oku-ui/context-menu'
import TickIcon from './TickIcon.vue'

const files = ['README.md', 'index.js', 'page.css']
const file = ref(files[1])
</script>

<template>
  <div :style="{ textAlign: 'center', padding: '50px' }">
    <OkuContextMenu>
      <OkuContextMenuTrigger class="context-menu-trigger">
        Right click here
      </OkuContextMenuTrigger>
      <OkuContextMenuPortal>
        <OkuContextMenuContent class="context-menu-content" :align-offset="-5">
          <OkuContextMenuItem class="context-menu-item" @select="console.log('minimize')">
            Minimize window
          </OkuContextMenuItem>
          <OkuContextMenuItem class="context-menu-item" @select="console.log('zoom')">
            Zoom
          </OkuContextMenuItem>
          <OkuContextMenuItem class="context-menu-item" @select="console.log('smaller')">
            Smaller
          </OkuContextMenuItem>
          <OkuContextMenuSeparator class="context-menu-separator" />
          <OkuContextMenuRadioGroup :value="file" @value-change="(value: string) => file = value">
            <OkuContextMenuRadioItem v-for="_file in files" :key="_file" class="context-menu-item" :value="_file">
              {{ _file }}
              <OkuContextMenuItemIndicator>
                <TickIcon />
              </OkuContextMenuItemIndicator>
            </OkuContextMenuRadioItem>
          </OkuContextMenuRadioGroup>
        </OkuContextMenuContent>
      </OkuContextMenuPortal>
    </OkuContextMenu>
    <p>Selected file: {{ file }}</p>
  </div>
</template>
