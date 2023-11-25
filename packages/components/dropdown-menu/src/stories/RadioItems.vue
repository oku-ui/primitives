<script setup lang="ts">
import { ref } from 'vue'
import { OkuDropdownMenu, OkuDropdownMenuArrow, OkuDropdownMenuContent, OkuDropdownMenuItem, OkuDropdownMenuItemIndicator, OkuDropdownMenuPortal, OkuDropdownMenuRadioGroup, OkuDropdownMenuRadioItem, OkuDropdownMenuSeparator, OkuDropdownMenuTrigger } from '@oku-ui/dropdown-menu'
import TickIcon from './TickIcon.vue'

const files = ['README.md', 'index.js', 'page.css']
const file = ref(files[1])
</script>

<template>
  <div :style="{ textAlign: 'center', padding: '50px' }">
    <OkuDropdownMenu>
      <OkuDropdownMenuTrigger class="dropdown-menu-trigger">
        Open
      </OkuDropdownMenuTrigger>
      <OkuDropdownMenuPortal>
        <OkuDropdownMenuContent class="dropdown-menu-content" :side-offset="5">
          <OkuDropdownMenuItem class="dropdown-menu-item" @select="console.log('minimize')">
            Minimize window
          </OkuDropdownMenuItem>
          <OkuDropdownMenuItem class="dropdown-menu-item" @select="console.log('zoom')">
            Zoom
          </OkuDropdownMenuItem>
          <OkuDropdownMenuItem class="dropdown-menu-item" @select="console.log('smaller')">
            Smaller
          </OkuDropdownMenuItem>
          <OkuDropdownMenuSeparator class="dropdown-menu-separator" />
          <OkuDropdownMenuRadioGroup :value="file" @value-change="(value: string) => file = value">
            <OkuDropdownMenuRadioItem v-for="_file in files" :key="_file" class="dropdown-menu-item" :value="_file">
              {{ _file }}
              <OkuDropdownMenuItemIndicator>
                <TickIcon />
              </OkuDropdownMenuItemIndicator>
            </OkuDropdownMenuRadioItem>
          </OkuDropdownMenuRadioGroup>
          <OkuDropdownMenuArrow />
        </OkuDropdownMenuContent>
      </OkuDropdownMenuPortal>
    </OkuDropdownMenu>
    <p>Selected file: {{ file }}</p>
  </div>
</template>
