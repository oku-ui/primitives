<script setup lang="ts">
import { ref } from 'vue'

import { OkuContextMenu, OkuContextMenuCheckboxItem, OkuContextMenuContent, OkuContextMenuItem, OkuContextMenuItemIndicator, OkuContextMenuPortal, OkuContextMenuSeparator, OkuContextMenuTrigger } from '@oku-ui/context-menu'

import TickIcon from './TickIcon.vue'

const checkboxItems = ['Bold', 'Italic', 'Underline']
const selection = ref<string[]>([])
</script>

<template>
  <div :style="{ textAlign: 'center', padding: '50px' }">
    <OkuContextMenu>
      <OkuContextMenuTrigger class="context-menu-trigger">
        Right click here
      </OkuContextMenuTrigger>
      <OkuContextMenuPortal>
        <OkuContextMenuContent class="context-menu-content" :align-offset="-5">
          <OkuContextMenuItem class="context-menu-item" @select="console.log('show')">
            Show fonts
          </OkuContextMenuItem>
          <OkuContextMenuItem class="context-menu-item" @select="console.log('bigger')">
            Bigger
          </OkuContextMenuItem>
          <OkuContextMenuItem class="context-menu-item" @select="console.log('smaller')">
            Smaller
          </OkuContextMenuItem>
          <OkuContextMenuSeparator class="context-menu-separator" />
          <OkuContextMenuCheckboxItem
            v-for="item in checkboxItems"
            :key="item"
            class="context-menu-item"
            :checked="selection.includes(item)"
            @checked-change="selection = selection.includes(item) ? selection.filter((el) => el !== item) : selection.concat(item)"
          >
            {{ item }}
            <OkuContextMenuItemIndicator>
              <TickIcon />
            </OkuContextMenuItemIndicator>
          </OkuContextMenuCheckboxItem>
          <OkuContextMenuSeparator />
          <OkuContextMenuCheckboxItem class="context-menu-item" disabled>
            Strikethrough
            <OkuContextMenuItemIndicator>
              <TickIcon />
            </OkuContextMenuItemIndicator>
          </OkuContextMenuCheckboxItem>
        </OkuContextMenuContent>
      </OkuContextMenuPortal>
    </OkuContextMenu>
  </div>
</template>
