<script setup lang="ts">
import { OkuDropdownMenu, OkuDropdownMenuArrow, OkuDropdownMenuContent, OkuDropdownMenuItem, OkuDropdownMenuPortal, OkuDropdownMenuSeparator, OkuDropdownMenuTrigger } from '@oku-ui/dropdown-menu'
</script>

<template>
  <div :style="{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '200vh' }">
    <OkuDropdownMenu>
      <OkuDropdownMenuTrigger class="dropdown-menu-trigger">
        Open
      </OkuDropdownMenuTrigger>
      <OkuDropdownMenuPortal>
        <OkuDropdownMenuContent class="dropdown-menu-content" :side-offset="5">
          <OkuDropdownMenuItem class="dropdown-menu-item" @select="console.log('undo')">
            Undo
          </OkuDropdownMenuItem>
          <OkuDropdownMenuItem class="dropdown-menu-item" @select="console.log('redo')">
            Redo
          </OkuDropdownMenuItem>
          <OkuDropdownMenuSeparator class="dropdown-menu-separator" />
          <OkuDropdownMenuItem class="dropdown-menu-item" disabled @select="console.log('cut')">
            Cut
          </OkuDropdownMenuItem>
          <OkuDropdownMenuItem class="dropdown-menu-item" @select="console.log('copy')">
            Copy
          </OkuDropdownMenuItem>
          <OkuDropdownMenuItem class="dropdown-menu-item" @select="console.log('paste')">
            Paste
          </OkuDropdownMenuItem>
          <OkuDropdownMenuArrow />
        </OkuDropdownMenuContent>
      </OkuDropdownMenuPortal>
    </OkuDropdownMenu>
  </div>
</template>
