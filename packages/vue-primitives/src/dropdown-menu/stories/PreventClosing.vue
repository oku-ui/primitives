<script setup lang="ts">
import { DropdownMenuArrow, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuRoot, DropdownMenuSeparator, DropdownMenuTrigger } from '../index.ts'
import './style.css'
import '../../menu/stories/styles.css'

function alert(v: string) {
  // eslint-disable-next-line no-alert
  window.alert(v)
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
            <DropdownMenuItem class="menu_itemClass" @select="alert('action 1')">
              I will close
            </DropdownMenuItem>
            <DropdownMenuItem
              class="menu_itemClass"
              @select="(event) => {
                event.preventDefault();
                alert('action 1');
              }"
            >
              I won't close
            </DropdownMenuItem>
            <DropdownMenuArrow />
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenuRoot>
    </div>
  </div>
</template>
