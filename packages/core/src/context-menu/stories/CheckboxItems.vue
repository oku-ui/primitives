<script setup lang="ts">
import { shallowRef } from 'vue'
import TickIcon from '../../menu/stories/TickIcon.vue'
import {
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuItemIndicator,
  ContextMenuPortal,
  ContextMenuRoot,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '../index.ts'
import '../../menu/stories/styles.css'
import './styles.css'

function log(v: string) {
  // eslint-disable-next-line no-console
  console.log(v)
}

const checkboxItems = ['Bold', 'Italic', 'Underline']
const selection = shallowRef<string[]>([])

function setSelection(item: string) {
  const cur = selection.value
  selection.value = cur.includes(item)
    ? cur.filter(el => el !== item)
    : cur.concat(item)
}
</script>

<template>
  <div>
    <div
      :style="{ textAlign: 'center', padding: '50px' }"
    >
      <ContextMenuRoot>
        <ContextMenuTrigger class="contextMenu_triggerClass">
          Right click here
        </ContextMenuTrigger>
        <ContextMenuPortal>
          <ContextMenuContent class="menu_contentClass" :align-offset="-5">
            <ContextMenuItem class="menu_itemClass" @select="log('show')">
              Show fonts
            </ContextMenuItem>
            <ContextMenuItem class="menu_itemClass" @select="log('bigger')">
              Bigger
            </ContextMenuItem>
            <ContextMenuItem class="menu_itemClass" @select="log('smaller')">
              Smaller
            </ContextMenuItem>
            <ContextMenuSeparator class="menu_separatorClass" />
            <ContextMenuCheckboxItem
              v-for="item in checkboxItems"
              :key="item"
              class="menu_itemClass"
              :checked="selection.includes(item)"
              @update:checked="setSelection(item)"
            >
              {{ item }}
              <ContextMenuItemIndicator>
                <TickIcon />
              </ContextMenuItemIndicator>
            </ContextMenuCheckboxItem>
            <ContextMenuSeparator />
            <ContextMenuCheckboxItem class="menu_itemClass" disabled>
              Strikethrough
              <ContextMenuItemIndicator>
                <TickIcon />
              </ContextMenuItemIndicator>
            </ContextMenuCheckboxItem>
          </ContextMenuContent>
        </ContextMenuPortal>
      </ContextMenuRoot>
    </div>
  </div>
</template>
