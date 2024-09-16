<script setup lang="ts">
import { DropdownMenuArrow, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuRoot, DropdownMenuSeparator, DropdownMenuTrigger } from '../index.ts'
import './style.css'
import '../../menu/stories/styles.css'

function log(v: string) {
  // eslint-disable-next-line no-console
  console.log(v)
}
</script>

<template>
  <div>
    <div :style="{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '200vh' }">
      <DropdownMenuRoot>
        <DropdownMenuTrigger class="dropdownMenu_triggerClass">
          Open
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent class="menu_contentClass" :side-offset="5">
            <DropdownMenuItem class="menu_itemClass" @select="log('undo')">
              Undo
            </DropdownMenuItem>
            <DropdownMenuItem class="menu_itemClass" @select="log('redo')">
              Redo
            </DropdownMenuItem>
            <DropdownMenuSeparator class="menu_separatorClass" />
            <DropdownMenuItem class="menu_itemClass" disabled @select="log('cut')">
              Cut
            </DropdownMenuItem>
            <DropdownMenuItem class="menu_itemClass" @select="log('copy')">
              Copy
            </DropdownMenuItem>
            <DropdownMenuItem class="menu_itemClass" @select="log('paste')">
              Paste
            </DropdownMenuItem>
            <DropdownMenuArrow />
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenuRoot>
    </div>
  </div>
</template>
