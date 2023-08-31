<script setup lang="ts">
import {
  OkuToolbar,
  OkuToolbarButton,
  OkuToolbarLink,
  OkuToolbarSeparator,
  OkuToolbarToggleGroup,
  OkuToolbarToggleItem,
} from '@oku-ui/toolbar'
import { OkuToggle } from '@oku-ui/toggle'
</script>

<template>
  <div>
    <OkuToolbar
      class="toolbarClass"
      orientation="vertical"
      :loop="true"
      aria-label="asdasd toolbar"
    >
      <OkuToolbarButton class="toolbarItemClass">
        Button
      </OkuToolbarButton>
      <OkuToolbarButton class="toolbarItemClass" disabled>
        Button (disabled)
      </OkuToolbarButton>
      <OkuToolbarSeparator class="toolbarSeparatorClass" />
      <OkuToolbarLink
        class="toolbarLinkClass"
        href="https://www.w3.org/TR/2019/WD-wai-aria-practices-1.2-20191218/examples/toolbar/toolbar.html"
        target="_blank"
      >
        Link
      </OkuToolbarLink>
      <OkuToolbarSeparator class="toolbarSeparatorClass" />
      <OkuToolbarButton class="toolbarToggleButtonClass" as-child>
        <OkuToggle>Toggle</OkuToggle>a
      </OkuToolbarButton>
      <OkuToolbarSeparator class="toolbarSeparatorClass" />
      <OkuToolbarToggleGroup type="single" class="toolbarToggleGroupClass">
        <OkuToolbarToggleItem value="left" class="toolbarToggleItemClass">
          Left
        </OkuToolbarToggleItem>
        <OkuToolbarToggleItem value="center" class="toolbarToggleItemClass">
          Center
        </OkuToolbarToggleItem>
        <OkuToolbarToggleItem value="right" class="toolbarToggleItemClass">
          Right
        </OkuToolbarToggleItem>
      </OkuToolbarToggleGroup>
      <OkuToolbarSeparator class="toolbarSeparatorClass" />
      <!-- TODO: DropdownMenu issua: https://github.com/oku-ui/primitives/issues/10 -->
      <!-- <DropdownMenu.Root>
        <OkuToolbarButton class="toolbarItemClass" as-child>
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

<style>
.toolbarClass {
  display: flex;

  &[data-orientation="vertical"] {
    flex-direction: column;
  }

  display: inline-flex;
  gap: 5;
  box-sizing: border-box;
  min-width: 130px;
  background-color: #fff;
  border: 1px solid #f0f0f0;
  border-radius: 6px;
  padding: 5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  font-family: apple-system, BlinkMacSystemFont, helvetica, arial, sans-serif;
  font-size: 13px;

  &:focus-within {
    border-color: #000;
  }
}

.toolbarSeparatorClass {
  height: 1px;
  margin: 5px;
  background-color: #f0f0f0;

  &[data-orientation="vertical"] {
    width: 1px;
    height: auto;
  }
}

.toolbarItemClass {
  border: 1px solid #000;
  border-radius: 6px;
  background-color: transparent;
  padding: 5px 10px;
  font-family: apple-system, BlinkMacSystemFont, helvetica, arial, sans-serif;
  font-size: 13px;

  display: flex;
  align-items: center;

  &:focus,
  &:focus-within {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.5);
  }

  &[data-disabled] {
    opacity: 0.5;
    user-select: none;
  }
}

.toolbarLinkClass {
  border: 1px solid #000;
  border-radius: 6px;
  background-color: transparent;
  padding: 5px 10px;
  font-family: apple-system, BlinkMacSystemFont, helvetica, arial, sans-serif;
  font-size: 13px;

  display: flex;
  align-items: center;

  &:focus,
  &:focus-within {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.5);
  }

  &[data-disabled] {
    opacity: 0.5;
    user-select: none;
  }

  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: black;
}

.toolbarToggleButtonClass {
  border: 1px solid #000;
  border-radius: 6px;
  background-color: transparent;
  padding: 5px 10px;
  font-family: apple-system, BlinkMacSystemFont, helvetica, arial, sans-serif;
  font-size: 13px;

  display: flex;
  align-items: center;

  &:focus,
  &:focus-within {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.5);
  }

  &[data-disabled] {
    opacity: 0.5;
    user-select: none;
  }

  &[data-state="on"] {
    background: black;
    color: white;
  }
}

.toolbarToggleGroupClass {
  display: flex;
  gap: 5px;

  &[data-orientation="vertical"] {
    flex-direction: column;
  }
}

.toolbarToggleItemClass {
    border: 1px solid #000;
  border-radius: 6px;
  background-color: transparent;
  padding: 5px 10px;
  font-family: apple-system, BlinkMacSystemFont, helvetica, arial, sans-serif;
  font-size: 13px;

  display: flex;
  align-items: center;

  &:focus,
  &:focus-within {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.5);
  }

  &[data-disabled] {
    opacity: 0.5;
    user-select: none;
  }

  &[data-state="on"] {
    background: black;
    color: white;
  }
}
</style>
