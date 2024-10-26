<script setup lang="ts">
import { shallowRef } from 'vue'
import TickIcon from '../../menu/stories/TickIcon.vue'
import { DropdownMenuArrow, DropdownMenuContent, DropdownMenuItem, DropdownMenuItemIndicator, DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuRoot, DropdownMenuSeparator, DropdownMenuTrigger } from '../index.ts'
import './style.css'
import '../../menu/stories/styles.css'

const files = ['README.md', 'index.js', 'page.css']
const file = shallowRef(files[1])

function setFile(v: string) {
  file.value = v
}

function log(v: string) {
  // eslint-disable-next-line no-console
  console.log(v)
}
</script>

<template>
  <div>
    <div :style="{ textAlign: 'center', padding: '50px' }">
      <DropdownMenuRoot>
        <DropdownMenuTrigger class="dropdownMenu_triggerClass">
          Open
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent class="menu_contentClass" :side-offset="5">
            <DropdownMenuItem class="menu_itemClass" @select="log('minimize')">
              Minimize window
            </DropdownMenuItem>
            <DropdownMenuItem class="menu_itemClass" @select="log('zoom')">
              Zoom
            </DropdownMenuItem>
            <DropdownMenuItem class="menu_itemClass" @select="log('smaller')">
              Smaller
            </DropdownMenuItem>
            <DropdownMenuSeparator class="menu_separatorClass" />
            <DropdownMenuRadioGroup :value="file" @update:value="setFile">
              <DropdownMenuRadioItem v-for="el in files" :key="el" class="menu_itemClass" :value="el">
                {{ file }}
                <DropdownMenuItemIndicator>
                  <TickIcon />
                </DropdownMenuItemIndicator>
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
            <DropdownMenuArrow />
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenuRoot>
      <p>Selected file: {{ file }}</p>
    </div>
  </div>
</template>
