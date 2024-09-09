<script setup lang="ts">
import { Toggle } from '../../toggle/index.ts'
import { ToolbarButton, ToolbarLink, ToolbarRoot, ToolbarSeparator, ToolbarToggleGroup, ToolbarToggleItem } from '../index.ts'
import type { Direction } from '../../direction/index.ts'
import './styles.css'

defineProps<{
  title?: string
  dir?: Direction
  orientation?: 'horizontal' | 'vertical'
}>()
</script>

<template>
  <div>
    <div :style="{ padding: '1px', margin: '-1px' }">
      <h1>{{ title }}</h1>
      <ToolbarRoot
        class="toolbar_toolbarClass"
        :orientation="orientation"
        :loop="true"
        :aria-label="`${title} toolbar`"
        :dir="dir"
      >
        <ToolbarButton class="toolbar_toolbarItemClass">
          Button
        </ToolbarButton>

        <ToolbarButton class="toolbar_toolbarItemClass" disabled>
          Button (disabled)
        </ToolbarButton>

        <ToolbarSeparator class="toolbar_toolbarSeparatorClass" />

        <ToolbarLink
          class="toolbar_toolbarItemClass toolbar_toolbarLinkClass "
          href="https://www.w3.org/TR/2019/WD-wai-aria-practices-1.2-20191218/examples/toolbar/toolbar.html"
          target="_blank"
        >
          Link
        </ToolbarLink>
        <ToolbarSeparator class="toolbar_toolbarSeparatorClass" />

        <ToolbarButton class="toolbar_toolbarItemClass toolbar_toolbarToggleButtonClass" as="template">
          <Toggle>Toggle</Toggle>
        </ToolbarButton>

        <ToolbarSeparator class="toolbar_toolbarSeparatorClass" />

        <ToolbarToggleGroup type="single" class="toolbar_toolbarToggleGroupClass">
          <ToolbarToggleItem value="left" class="toolbar_toolbarItemClass toolbar_toolbarToggleItemClass">
            Left
          </ToolbarToggleItem>
          <ToolbarToggleItem value="center" class="toolbar_toolbarItemClass toolbar_toolbarToggleItemClass">
            Center
          </ToolbarToggleItem>
          <ToolbarToggleItem value="right" class="toolbar_toolbarItemClass toolbar_toolbarToggleItemClass">
            Right
          </ToolbarToggleItem>
        </ToolbarToggleGroup>

        <ToolbarSeparator class="toolbar_toolbarSeparatorClass" />

        TODO:MENU
        <!-- <DropdownMenu.Root>
          <ToolbarButton class="toolbar_toolbarItemClass" as="template">
            <DropdownMenu.Trigger>Menu</DropdownMenu.Trigger>
          </ToolbarButton>
          <DropdownMenu.Content class="toolbar_dropdownMenuContentClass" side-offset="{5}">
            <DropdownMenu.Item class="toolbar_dropdownMenuItemClass">
              Undo
            </DropdownMenu.Item>
            <DropdownMenu.Item class="toolbar_dropdownMenuItemClass">
              Redo
            </DropdownMenu.Item>
            <DropdownMenu.Arrow />
          </DropdownMenu.Content>
        </DropdownMenu.Root> -->
      </ToolbarRoot>
    </div>
  </div>
</template>
