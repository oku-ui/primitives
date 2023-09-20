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
      class="toolbar_rootClass"
      :orientation="props.orientation"
      :loop="props.loop"
      :aria-label="`Toolbar ${props.title}`"
      :dir="props.dir"
    >
      <OkuToolbarButton class="toolbar_itemClass">
        Button
      </OkuToolbarButton>
      <OkuToolbarButton class="toolbar_itemClass" disabled>
        Button (disabled)
      </OkuToolbarButton>
      <OkuToolbarSeparator class="toolbar_separatorClass" />
      <OkuToolbarLink
        class="toolbar_linkClass"
        href="https://www.w3.org/TR/2019/WD-wai-aria-practices-1.2-20191218/examples/toolbar/toolbar.html"
        target="_blank"
      >
        Link
      </OkuToolbarLink>
      <OkuToolbarSeparator class="toolbar_separatorClass" />
      <OkuToolbarButton class="toolbar_toggleButtonClass" as-child>
        <OkuToggle>Toggle</OkuToggle>a
      </OkuToolbarButton>
      <OkuToolbarSeparator class="toolbar_separatorClass" />
      <OkuToolbarToggleGroup type="single" class="toolbar_toggleGroupClass">
        <OkuToolbarToggleItem value="left" class="toolbar_toggleItemClass">
          Left
        </OkuToolbarToggleItem>
        <OkuToolbarToggleItem value="center" class="toolbar_toggleItemClass">
          Center
        </OkuToolbarToggleItem>
        <OkuToolbarToggleItem value="right" class="toolbar_toggleItemClass">
          Right
        </OkuToolbarToggleItem>
      </OkuToolbarToggleGroup>
      <OkuToolbarSeparator class="toolbar_separatorClass" />
      <!-- TODO: DropdownMenu issua: https://github.com/oku-ui/primitives/issues/10 -->
      <!-- <DropdownMenu.Root>
        <OkuToolbarButton class="toolbar_itemClass" as-child>
          <DropdownMenu.Trigger>Menu</DropdownMenu.Trigger>
        </OkuToolbarButton>
        <DropdownMenu.Content class="dropdownMenuContentClass" side-offset="5}">
          <DropdownMenu.Item class="dropdownMenuItemClass">
            Undo
          </DropdownMenu.Item>
          <DropdownMenu.Item class="dropdownMenuItemClass">
            Redo
          </DropdownMenu.Item>
          <DropdownMenu.Arrow />
        </DropdownMenu.Content>
      </DropdownMenu.Root> -->
    </OkuToolbar>
  </div>
</template>
