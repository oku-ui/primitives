<script setup lang="ts">
import type { PropType } from 'vue'
import type { ToolbarProps } from '@oku-ui/toolbar'
import {
  OkuToolbar,
  OkuToolbarButton,
  OkuToolbarLink,
  OkuToolbarSeparator,
  OkuToolbarToggleGroup,
  OkuToolbarToggleItem,
} from '@oku-ui/toolbar'
import { OkuToggle } from '@oku-ui/toggle'

defineProps({
  title: {
    type: String,
  },
  dir: {
    type: String as PropType<ToolbarProps['dir']>,
  },
  orientation: {
    type: String as PropType<ToolbarProps['orientation']>,
  },
})
</script>

<template>
  <div :style="{ padding: '1px', margin: '-1px' }">
    <h1>{{ title }}</h1>
    <OkuToolbar
      class="toolbar"
      :orientation="orientation"
      :loop="true"
      :aria-label="`${title} toolbar`"
      :dir="dir"
    >
      <OkuToolbarButton class="toolbar-item">
        Button
      </OkuToolbarButton>
      <OkuToolbarButton class="toolbar-item" disabled>
        Button (disabled)
      </OkuToolbarButton>
      <OkuToolbarSeparator class="toolbar-separator" />
      <OkuToolbarLink
        class="toolbar-link toolbar-item"
        href="https://www.w3.org/TR/2019/WD-wai-aria-practices-1.2-20191218/examples/toolbar/toolbar.html"
        target="-blank"
      >
        Link
      </OkuToolbarLink>
      <OkuToolbarSeparator class="toolbar-separator" />
      <OkuToolbarButton class="toolbar-toggle-button toolbar-item" as-child>
        <OkuToggle>Toggle</OkuToggle>
      </OkuToolbarButton>
      <OkuToolbarSeparator class="toolbar-separator" />
      <OkuToolbarToggleGroup type="single" class="toolbar-toggle-group">
        <OkuToolbarToggleItem value="left" class="toolbar-toggle-item toolbar-item">
          Left
        </OkuToolbarToggleItem>
        <OkuToolbarToggleItem value="center" class="toolbar-toggle-item toolbar-item">
          Center
        </OkuToolbarToggleItem>
        <OkuToolbarToggleItem value="right" class="toolbar-toggle-item toolbar-item">
          Right
        </OkuToolbarToggleItem>
      </OkuToolbarToggleGroup>
      <OkuToolbarSeparator class="toolbar-separator" />
      <!-- TODO: DropdownMenu issue: https://github.com/oku-ui/primitives/issues/10 -->
      <!-- <OkuDropdownMenu>
        <OkuToolbarButton class="toolbar-item" as-child>
          <OkuDropdownMenuTrigger>Menu</OkuDropdownMenuTrigger>
        </OkuToolbarButton>
        <OkuDropdownMenuContent class="toolbar-dropdown-menu-content" :side-offset="5}">
          <OkuDropdownMenuItem class="toolbar-dropdown-menu-item">
            Undo
          </OkuDropdownMenuItem>
          <OkuDropdownMenuItem class="toolbar-dropdown-menu-item">
            Redo
          </OkuDropdownMenuItem>
          <OkuDropdownMenuArrow />
        </OkuDropdownMenuContent>
      </OkuDropdownMenu>
    </OkuToolbar> -->
    </OkuToolbar>
  </div>
</template>
