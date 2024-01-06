<script setup lang="ts">
import type {
  ToolbarProps,
} from '@oku-ui/toolbar'
import {
  OkuToolbar,
  OkuToolbarButton,
  OkuToolbarLink,
  OkuToolbarSeparator,
  OkuToolbarToggleGroup,
  OkuToolbarToggleItem,
} from '@oku-ui/toolbar'
import { OkuToggle } from '@oku-ui/toggle'

const props = defineProps<{
  orientation?: ToolbarProps['orientation']
  loop?: ToolbarProps['loop']
  title?: string
  dir?: ToolbarProps['dir']
}>()
</script>

<template>
  <div>
    <h1>{{ props.title }}</h1>
    <OkuToolbar
      class="toolbar-root"
      :orientation="props.orientation"
      :loop="props.loop"
      :aria-label="`Toolbar ${props.title}`"
      :dir="props.dir"
    >
      <OkuToolbarButton class="toolbar-item">
        Button
      </OkuToolbarButton>
      <OkuToolbarButton class="toolbar-item" disabled>
        Button (disabled)
      </OkuToolbarButton>
      <OkuToolbarSeparator class="toolbar-separator" />
      <OkuToolbarLink
        class="toolbar-link"
        href="https://www.w3.org/TR/2019/WD-wai-aria-practices-1.2-20191218/examples/toolbar/toolbar.html"
        target="-blank"
      >
        Link
      </OkuToolbarLink>
      <OkuToolbarSeparator class="toolbar-separator" />
      <OkuToolbarButton class="toolbar-toggleButton" as-child>
        <OkuToggle>Toggle</OkuToggle>a
      </OkuToolbarButton>
      <OkuToolbarSeparator class="toolbar-separator" />
      <OkuToolbarToggleGroup type="single" class="toolbar-toggleGroup">
        <OkuToolbarToggleItem value="left" class="toolbar-toggleItem">
          Left
        </OkuToolbarToggleItem>
        <OkuToolbarToggleItem value="center" class="toolbar-toggleItem">
          Center
        </OkuToolbarToggleItem>
        <OkuToolbarToggleItem value="right" class="toolbar-toggleItem">
          Right
        </OkuToolbarToggleItem>
      </OkuToolbarToggleGroup>
      <OkuToolbarSeparator class="toolbar-separator" />
      <!-- TODO: DropdownMenu issua: https://github.com/oku-ui/primitives/issues/10 -->
      <!-- <DropdownMenu.Root>
        <OkuToolbarButton class="toolbar-item" as-child>
          <DropdownMenu.Trigger>Menu</DropdownMenu.Trigger>
        </OkuToolbarButton>
        <DropdownMenu.Content class="dropdownMenuContent" side-offset="5}">
          <DropdownMenu.Item class="dropdownMenuItem">
            Undo
          </DropdownMenu.Item>
          <DropdownMenu.Item class="dropdownMenuItem">
            Redo
          </DropdownMenu.Item>
          <DropdownMenu.Arrow />
        </DropdownMenu.Content>
      </DropdownMenu.Root> -->
    </OkuToolbar>
  </div>
</template>
