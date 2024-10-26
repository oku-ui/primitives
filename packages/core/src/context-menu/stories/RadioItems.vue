<script setup lang="ts">
import { shallowRef } from 'vue'
import TickIcon from '../../menu/stories/TickIcon.vue'
import {
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuItemIndicator,
  ContextMenuPortal,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
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

const files = ['README.md', 'index.js', 'page.css']
const file = shallowRef(files[1])

function setFile(v: string) {
  file.value = v
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
            <ContextMenuRadioGroup :value="file" @update:value="setFile">
              <ContextMenuRadioItem
                v-for="item in files"
                :key="item"
                class="menu_itemClass"
                :value="item"
              >
                {{ item }}
                <ContextMenuItemIndicator>
                  <TickIcon />
                </ContextMenuItemIndicator>
              </ContextMenuRadioItem>
            </ContextMenuRadioGroup>
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

      <p>Selected file: {{ file }}</p>
    </div>
  </div>
</template>
