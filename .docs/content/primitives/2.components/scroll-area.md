---
title: ScrollArea
description: A vertically stacked set of interactive headings that each reveal an associated section of content.
componentName: OkuScrollArea
image: 'https://oku-ui.com/og/oku-scroll-area.png'
links:
  - label: NPM - 0.5.0
    icon: i-simple-icons-npm
    to: https://www.npmjs.com/package/@oku-ui/scroll-area
    title: OkuScrollArea
navigation:
  badge: New
---

::ContentDesignTabs
#oku
::ContentTabs
#preview
:ContentPreview{componentSrc="OkuScrollArea" lang="vue" project="primitives"}
#vue
<!-- Autodocs{src="/primitives/OkuScrollArea/index.vue" lang="vue"} -->
::
#radix
::ContentTabs
#preview
:ContentPreview{componentSrc="OkuScrollArea" design="radix" lang="vue" project="primitives"}
#vue
<!-- Autodocs{src="/primitives/OkuScrollArea/radix.vue" lang="vue"} -->
::
::

## Features
- Scrollbar sits on top of the scrollable content, taking up no space.
- Scrolling is native; no underlying position movements via CSS transformations.
- Shims pointer behaviors only when interacting with the controls, so keyboard controls are unaffected.
- Supports Right to Left direction.

## Installation

Install the component from your command line.

::code-group

```sh [pnpm]
pnpm i @oku-ui/scroll-area
```

```bash [yarn]
yarn add @oku-ui/scroll-area
```

```bash [npm]
npm install @oku-ui/scroll-area
```

::

## Anatomy

Import the component.

::code-group

```vue [o.vue]
<script setup lang="ts">
import {
  OkuScrollArea,
  OkuScrollAreaCorner,
  OkuScrollAreaScrollbar,
  OkuScrollAreaThumb,
  OkuScrollAreaViewport,
} from '@oku-ui/scroll-area'
</script>

<template>
  <OkuScrollArea>
    <OkuScrollAreaViewport />
    <OkuScrollAreaScrollbar orientation="horizontal">
      <OkuScrollAreaThumb />
    </OkuScrollAreaScrollbar>
    <OkuScrollAreaScrollbar orientation="vertical">
      <OkuScrollAreaThumb />
    </OkuScrollAreaScrollbar>
    <OkuScrollAreaCorner />
  </OkuScrollArea>
</template>
```
::

## API Reference

### OkuScrollArea
Contains all the parts of a scroll area.


::OkuTable
---
data:
  - name: 'asChild'
    required: false
    type: 'boolean'
    default: 'false'
    description: |
      Change the default rendered element for the one passed as a child,
      merging their props and behavior.
      <br />
      <br />
      Read our [Composition](../guides/composition) guide for more details.
  - name: 'type'
    type: '"auto" | "always" | "scroll" | "hover"'
    typeSimple: 'enum'
    default: '"hover"'
    description: |
      Describes the nature of scrollbar visibility, similar to how the
      scrollbar preferences in MacOS control visibility of native
      scrollbars.
      <br />
      <br />
      <code>"auto"</code> means that scrollbars are visible when content is overflowing
      on the corresponding orientation.
      <br />
      <code>"always"</code> means that scrollbars are always visible regardless
      of whether the content is overflowing.
      <br />
      <code>"scroll"</code> means that scrollbars are visible when the user is
      scrolling along its corresponding orientation.
      <br />
      <code>"hover"</code> when the user is scrolling along its corresponding
      orientation and when the user is hovering over the scroll area.
  - name: 'scrollHideDelay'
    type: 'number'
    default: '600'
    description: |
      If `type` is set to either `"scroll"` or `"hover"`, this prop determines the length of time, in
      milliseconds, before the scrollbars are hidden after the user stops
      interacting with scrollbars.
  - name: 'dir'
    required: false
    type: '"ltr" | "rtl"'
    typeSimple: 'enum'
    description: |
      The reading direction of the scroll area. If omitted, inherits
      globally from `DirectionProvider` or assumes LTR (left-to-right) reading mode.
---
::



### OkuScrollAreaViewport
The viewport area of the scroll area.

::OkuTable
---
data:
  - name: 'asChild'
    required: false
    type: 'boolean'
    default: 'false'
    description: |
      Change the default rendered element for the one passed as a child,
      merging their props and behavior.
      <br />
      <br />
      Read our [Composition](../guides/composition) guide for more details.
---
::

### OkuScrollAreaScrollbar
The vertical scrollbar.Add a second `Scrollbar` with an`orientation` prop to enable horizontal scrolling.

::OkuTable
---
data:
  - name: 'asChild'
    required: false
    type: 'boolean'
    default: 'false'
    description: |
      Change the default rendered element for the one passed as a child,
      merging their props and behavior.
      <br />
      <br />
      Read our [Composition](../guides/composition) guide for more details.
  - name: 'forceMount'
    type: 'boolean'
    description: |
      Used to force mounting when more control is needed. Useful when
      controlling animation with React animation libraries.
  - name: 'orientation'
    required: false
    type: '"horizontal" | "vertical"'
    typeSimple: 'enum'
    default: 'vertical'
    description: 'The orientation of the scrollbar'
---
::

::OkuAttributesTable
---
data:
  - attribute: '[data-state]'
    values:
      - 'visible'
      - 'hidden'
  - attribute: '[data-orientation]'
    values:
      - 'vertical'
      - 'horizontal'
---
::

### OkuScrollAreaThumb
The thumb to be used in `ScrollArea.Scrollbar`.


::OkuTable
---
data:
  - name: 'asChild'
    required: false
    type: 'boolean'
    default: 'false'
    description: |
      Change the default rendered element for the one passed as a child,
      merging their props and behavior.
      <br />
      <br />
      Read our [Composition](../guides/composition) guide for more details.
---
::

::OkuAttributesTable
---
data:
  - attribute: '[data-state]'
    values:
      - 'visible'
      - 'hidden'
---
::

### OkuScrollAreaCorner
The corner where both vertical and horizontal scrollbars meet.

::OkuTable
---
data:
  - name: 'asChild'
    required: false
    type: 'boolean'
    default: 'false'
    description: |
      Change the default rendered element for the one passed as a child,
      merging their props and behavior.
      <br />
      <br />
      Read our [Composition](../guides/composition) guide for more details.
---
::

## Accessibility

In most cases, it's best to rely on native scrolling and work with the customization options available in CSS. When that isn't enough, `ScrollArea` provides additional customizability while maintaining the browser's native scroll behavior (as well as accessibility features, like keyboard scrolling).

### Keyboard Interactions

Scrolling via keyboard is supported by default because the component relies on native scrolling.Specific keyboard interactions may differ between platforms, so we do not specify them here or add specific event listeners to handle scrolling via key events.