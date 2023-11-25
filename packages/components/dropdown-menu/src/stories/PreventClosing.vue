<script setup lang="ts">
import { OkuDropdownMenu, OkuDropdownMenuArrow, OkuDropdownMenuContent, OkuDropdownMenuItem, OkuDropdownMenuPortal, OkuDropdownMenuTrigger } from '@oku-ui/dropdown-menu'

function alert(text: string) {
  // eslint-disable-next-line no-alert
  window.alert(text)
}
</script>

<template>
  <div :style="{ textAlign: 'center', padding: '50px' }">
    <OkuDropdownMenu>
      <OkuDropdownMenuTrigger class="dropdown-menu-trigger">
        Open
      </OkuDropdownMenuTrigger>
      <OkuDropdownMenuPortal>
        <OkuDropdownMenuContent class="dropdown-menu-content" :side-offset="5">
          <OkuDropdownMenuItem class="dropdown-menu-item" @select="alert('action 1')">
            I will close
          </OkuDropdownMenuItem>
          <OkuDropdownMenuItem
            class="dropdown-menu-item"
            @select="(event) => {
              event.preventDefault()
              alert('action 1')
            }"
          >
            I won't close
          </OkuDropdownMenuItem>
          <OkuDropdownMenuArrow />
        </OkuDropdownMenuContent>
      </OkuDropdownMenuPortal>
    </OkuDropdownMenu>
  </div>
</template>
