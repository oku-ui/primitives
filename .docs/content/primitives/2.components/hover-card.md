---
title: Hover Card
description: For sighted users to preview content available behind a link.
componentName: OkuHoverCard
image: 'https://oku-ui.com/og/oku-hover-card.jpg'
links:
  - label: NPM - 0.5.0
    icon: i-simple-icons-npm
    to: https://www.npmjs.com/package/@oku-ui/hover-card
    title: OkuHoverCard
---

::ContentDesignTabs
#oku
::ContentTabs
#preview
:ContentPreview{componentSrc="OkuHoverCard" lang="vue" project="primitives"}
#vue
<!-- Autodocs{src="/primitives/OkuHoverCard/index.vue" lang="vue"} -->
::
#radix
::ContentTabs
#preview
:ContentPreview{componentSrc="OkuHoverCard" design="radix" lang="vue" project="primitives"}
#vue
<!-- Autodocs{src="/primitives/OkuHoverCard/radix.vue" lang="vue"} -->
::
::




## Features
- Can be controlled or uncontrolled.
- Customize side, alignment, offsets, collision handling.
- Optionally render a pointing arrow.
- Supports custom open and close delays.
- Opens on hover only.
- Ignored by screen readers.


## Installation

Install the component from your command line.

::code-group

```sh [pnpm]
pnpm i @oku-ui/hover-card
```

```bash [yarn]
yarn add @oku-ui/hover-card
```

```bash [npm]
npm install @oku-ui/hover-card
```

::

## Anatomy

Import the component.

```vue
<script setup lang="ts">
import {
  OkuHoverCard,
  OkuHoverCardArrow,
  OkuHoverCardContent,
  OkuHoverCardPortal,
  OkuHoverCardTrigger
} from '@oku-ui/hover-card'
</script>

<template>
  <OkuHoverCard>
    <OkuHoverCardTrigger />
    <OkuHoverCardPortal>
      <OkuHoverCardContent>
        <OkuHoverCardArrow />
      </OkuHoverCardContent>
    </OkuHoverCardPortal>
  </OkuHoverCard>
  );
</template>
```

## API Reference

### OkuHoverCard
Contains all the parts of a hover card.

::OkuTable
---
data:
  - name: v-model
    type: boolean
    description: |
      The controlled open state of the hover card. Must be used in
  - name: defaultOpen
    type: boolean
    description: |
      The open state of the hover card when it is initially rendered. Use
      when you do not need to control its open state.
  - name: open
    type: boolean
    description: |
      The controlled open state of the hover card. Must be used in
      conjunction with <Code>onOpenChange</Code>.
  - name: onOpenChange
    type: '(open: boolean) => void'
    typeSimple: function
    description: |
      Event handler called when the open state of the hover card changes.
  - name: openDelay
    type: number
    default: 700
    description: |
      The duration from when the mouse enters the trigger until the hover card opens.
  - name: closeDelay
    type: number
    default: 300
    description: |
      The duration from when the mouse leaves the trigger or content until the hover card closes.
---
::


### OkuHoverCardTrigger
The link that opens the hover card when hovered.

::OkuTable
---
data:
  - name: asChild
    required: false
    type: boolean
    default: false
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
    values: ['open', 'closed']
---
::

### OkuHoverCardPortal
When used, portals the content part into the `body`.

::OkuTable
---
data:
  - name: forceMount
    type: boolean
    description: |
      Used to force mounting when more control is needed. Useful when
      controlling animation with React animation libraries. If used on this
      part, it will be inherited by <Code>HoverCard.Content</Code>.
  - name: container
    type: HTMLElement
    default: document.body
    description: |
      Specify a container element to portal the content into.
---
::


### OkuHoverCardContent
The component that pops out when the hover card is open.

::OkuTable
---
data:
  - name: asChild
    required: false
    type: boolean
    default: false
    description: |
      Change the default rendered element for the one passed as a child,
      merging their props and behavior.
      <br />
      <br />
      Read our [Composition](../guides/composition) guide for more details.
  - name: forceMount
    type: boolean
    description: |
      Used to force mounting when more control is needed. Useful when
      controlling animation with React animation libraries. It inherits from <Code>HoverCard.Portal</Code>.
  - name: side
    type: '"top" | "right" | "bottom" | "left"'
    typeSimple: enum
    default: '"bottom"'
    description: |
      The preferred side of the trigger to render against when open. Will be
      reversed when collisions occur and <Code>avoidCollisions</Code> is
      enabled.
  - name: sideOffset
    type: number
    default: 0
    description: |
      The distance in pixels from the trigger.
  - name: align
    type: '"start" | "center" | "end"'
    typeSimple: enum
    default: '"center"'
    description: |
      The preferred alignment against the trigger. May change when
      collisions occur.
  - name: alignOffset
    type: number
    default: 0
    description: |
      An offset in pixels from the <Code>"start"</Code> or <Code>"end"</Code> alignment options.
  - name: avoidCollisions
    type: boolean
    default: true
    description: |
      When <Code>true</Code>, overrides the <Code>side</Code> and
      <Code>align</Code> preferences to prevent collisions with boundary edges.
  - name: collisionBoundary
    type: 'Element | null | Array<Element | null>'
    typeSimple: Boundary
    default: '[]'
    description: |
      The element used as the collision boundary. By default this is the
      viewport, though you can provide additional element(s) to be included
      in this check.
  - name: collisionPadding
    type: 'number | Partial<Record<Side, number>>'
    typeSimple: 'number | Padding'
    default: 0
    description: |
      The distance in pixels from the boundary edges where collision
      detection should occur. Accepts a number (same for all sides), or a
      partial padding object, for example: <Code>{`{ top: 20, left: 20 }`}</Code>.
  - name: arrowPadding
    type: number
    default: 0
    description: |
      The padding between the arrow and the edges of the content. If your
      content has <Code>border-radius</Code>, this will prevent it from
      overflowing the corners.
  - name: sticky
    type: '"partial" | "always"'
    typeSimple: enum
    default: '"partial"'
    description: |
      The sticky behavior on the align axis. <Code>"partial"</Code> will
      keep the content in the boundary as long as the trigger is at least
      partially in the boundary whilst <Code>"always"</Code> will keep the
      content in the boundary regardless.
  - name: hideWhenDetached
    type: boolean
    default: false
    description: |
      Whether to hide the content when the trigger becomes fully occluded.
---
::

::OkuAttributesTable
---
data:
  - attribute: '[data-state]'
    values: ['open', 'closed']
  - attribute: '[data-side]'
    values: ['left', 'right', 'bottom', 'top']
  - attribute: '[data-align]'
    values: ['start', 'end', 'center']
---
::


::OkuCssVariablesTable
---
data:
  - cssVariable: '--radix-hover-card-content-transform-origin'
    description: |
      The <Code>transform-origin</Code> computed from the content and arrow positions/offsets
  - cssVariable: '--radix-hover-card-content-available-width'
    description: |
      The remaining width between the trigger and the boundary edge
  - cssVariable: '--radix-hover-card-content-available-height'
    description: |
      The remaining height between the trigger and the boundary edge
  - cssVariable: '--radix-hover-card-trigger-width'
    description: |
      The width of the trigger
  - cssVariable: '--radix-hover-card-trigger-height'
    description: |
      The height of the trigger
---
::

### OkuHoverCardArrow
An optional arrow element to render alongside the hover card. This can be used to help visually link the trigger with the `HoverCard.Content`. Must be rendered inside `HoverCard.Content`.


::OkuTable
---
data:
  - name: asChild
    required: false
    type: boolean
    default: false
    description: |
      Change the default rendered element for the one passed as a child,
      merging their props and behavior.
      <br />
      <br />
      Read our [Composition](../guides/composition) guide for more details.
  - name: width
    type: number
    default: 10
    description: |
      The width of the arrow in pixels.
  - name: height
    type: number
    default: 5
    description: |
      The height of the arrow in pixels.
---
::



## Accessibility

### Keyboard Interactions

The hover card is intended for mouse users only so will not respond to keyboard navigation.