---

title: Scroll Area
description: Augments native scroll functionality for custom, cross-browser styling.
name: scroll-area
---

# ScrollArea

<Description>
Augments native scroll functionality for custom, cross-browser styling.
</Description>

<ComponentPreview name="ScrollArea" />

## Features

<Highlights
  :features="[
    'Scrollbar sits on top of the scrollable content, taking up no space.',
    'Scrolling is native; no underlying position movements via CSS transformations.',
    'Shims pointer behaviors only when interacting with the controls, so keyboard controls are unaffected.',
    'Supports Right to Left direction.',
  ]"
/>

## Installation

Install the component from your command line.

<InstallationTabs value="@oku-ui/primitives" />

## Anatomy

Import all parts and piece them together.

```vue
<script setup>
import { ScrollAreaRoot, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport } from '@oku-ui/primitives'
</script>

<template>
  <ScrollAreaRoot>
    <ScrollAreaViewport />
    <ScrollAreaScrollbar orientation="horizontal">
      <ScrollAreaThumb />
    </ScrollAreaScrollbar>
    <ScrollAreaScrollbar orientation="vertical">
      <ScrollAreaThumb />
    </ScrollAreaScrollbar>
    <ScrollAreaCorner />
  </ScrollAreaRoot>
</template>
```

## API Reference

### Root

Contains all the parts of a scroll area.

<!-- @include: @/meta/ScrollAreaRoot.md -->

### Viewport

The viewport area of the scroll area.

<!-- @include: @/meta/ScrollAreaViewport.md -->

### Scrollbar

The vertical scrollbar. Add a second `Scrollbar` with an `orientation` prop to enable horizontal scrolling.

<!-- @include: @/meta/ScrollAreaScrollbar.md -->

<DataAttributesTable
  :data="[
    {
      attribute: '[data-state]',
      values: ['visible', 'hidden'],
    },
    {
      attribute: '[data-orientation]',
      values: ['vertical', 'horizontal'],
    },
  ]"
/>

### Thumb

The thumb to be used in `ScrollAreaScrollbar`.

<!-- @include: @/meta/ScrollAreaThumb.md -->

<DataAttributesTable
  :data="[
    {
      attribute: '[data-state]',
      values: ['visible', 'hidden'],
    },
  ]"
/>

### Corner

The corner where both vertical and horizontal scrollbars meet.

<!-- @include: @/meta/ScrollAreaCorner.md -->

## Accessibility

In most cases, it's best to rely on native scrolling and work with the customization options available in CSS. When that isn't enough, `ScrollArea` provides additional customizability while maintaining the browser's native scroll behavior (as well as accessibility features, like keyboard scrolling).

### Keyboard Interactions

Scrolling via keyboard is supported by default because the component relies on native scrolling. Specific keyboard interactions may differ between platforms, so we do not specify them here or add specific event listeners to handle scrolling via key events.
