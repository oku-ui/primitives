<script setup lang="ts">
import {
  ContextMenuContent,
  ContextMenuItem,
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
</script>

<template>
  <div>
    <div
      :style="{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // width: '200px',
        height: '600px',
        gap: '20px',
      }"
    >
      <ContextMenuRoot>
        <ContextMenuTrigger class="contextMenu_triggerClass">
          Right click here
        </ContextMenuTrigger>
        <ContextMenuPortal>
          <ContextMenuContent class="menu_contentClass" :align-offset="-5">
            <ContextMenuItem class="menu_itemClass" @select="log('undo')">
              Undo
            </ContextMenuItem>
            <ContextMenuItem class="menu_itemClass" @select="log('redo')">
              Redo
            </ContextMenuItem>
            <ContextMenuSeparator class="menu_separatorClass" />
            <ContextMenuItem class="menu_itemClass" disabled @select="log('cut')">
              Cut
            </ContextMenuItem>
            <ContextMenuItem class="menu_itemClass" @select="log('copy')">
              Copy
            </ContextMenuItem>
            <ContextMenuItem class="menu_itemClass" @select="log('paste')">
              Paste
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenuPortal>
      </ContextMenuRoot>
    </div>
  </div>
</template>
