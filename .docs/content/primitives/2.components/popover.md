---
title: Popover
description: Displays rich content in a portal, triggered by a button.
componentName: OkuPopover
image: 'https://oku-ui.com/og/oku-popover.jpg'
links:
  - label: NPM - 0.5.0
    icon: i-simple-icons-npm
    to: https://www.npmjs.com/package/@oku-ui/popover
    title: OkuPopover
---

::ContentDesignTabs
#oku
::ContentTabs
#preview
:ContentPreview{componentSrc="OkuPopover" lang="vue" project="primitives"}
#vue
<!-- Autodocs{src="/primitives/OkuPopover/index.vue" lang="vue"} -->
::
#radix
::ContentTabs
#preview
:ContentPreview{componentSrc="OkuPopover" design="radix" lang="vue" project="primitives"}
#vue
<!-- Autodocs{src="/primitives/OkuPopover/radix.vue" lang="vue"} -->
::
::



## Features
- Can be controlled or uncontrolled.
- Customize side, alignment, offsets, collision handling.
- Optionally render a pointing arrow.
- Focus is fully managed and customizable.
- Supports modal and non-modal modes.
- Dismissing and layering behavior is highly customizable.



## Installation

Install the component from your command line.

::code-group

```sh [pnpm]
pnpm i @oku-ui/popover
```

```bash [yarn]
yarn add @oku-ui/popover
```

```bash [npm]
npm install @oku-ui/popover
```

::

## Anatomy

Import the component.

```vue
<script setup lang="ts">
import {
  OkuPopover,
  OkuPopoverAnchor,
  OkuPopoverArrow,
  OkuPopoverClose,
  OkuPopoverContent,
  OkuPopoverPortal,
  OkuPopoverTrigger
} from '@oku-ui/popover'
</script>

<template>
  <OkuPopover>
    <OkuPopoverTrigger />
    <OkuPopoverAnchor />
    <OkuPopoverPortal>
      <OkuPopoverContent>
        <OkuPopoverClose />
        <OkuPopoverArrow />
      </OkuPopoverContent>
    </OkuPopoverPortal>
  </OkuPopover>
</template>
```

## API Reference

### OkuPopover
Contains all the parts of a popover.

::OkuTable
---
data:
  - name: v-model
    type: boolean
    description: 'The controlled open state of the popover. Must be used in conjunction with `onOpenChange`.'
  - name: defaultOpen
    type: boolean
    description: 'The open state of the popover when it is initially rendered. Use when you do not need to control its open state.'
  - name: open
    type: boolean
    description: 'The controlled open state of the popover. Must be used in conjunction with `onOpenChange`.'
  - name: onOpenChange
    type: '(open: boolean) => void'
    typeSimple: function
    description: 'Event handler called when the open state of the popover changes.'
  - name: modal
    required: false
    type: boolean
    default: false
    description: 'The modality of the popover. When set to `true`, interaction with outside elements will be disabled and only popover content will be visible to screen readers.'
---
::

### OkuPopoverTrigger

The button that toggles the popover. By default, the `Popover.Content` will position itself against the trigger.

::OkuTable
---
data:
  - name: asChild
    required: false
    type: boolean
    default: false
    description: 'Change the default rendered element for the one passed as a child, merging their props and behavior.<br><br>Read our [Composition](../guides/composition) guide for more details.'
---
::

::OkuAttributesTable
---
data:
  - attribute: '[data-state]'
    values:
      - 'open'
      - 'closed'
---
::

### OkuPopoverAnchor

An optional element to position the `Popover.Content` against. If this part is not used, the content will position alongside the <Code>Popover.Trigger</Code>.


::OkuTable
---
data:
  - name: asChild
    required: false
    type: boolean
    default: false
    description: 'Change the default rendered element for the one passed as a child, merging their props and behavior.<br><br>Read our [Composition](../guides/composition) guide for more details.'
---
::

### OkuPopoverPortal

When used, portals the content part into the `body`.

::OkuTable
---
data:
  - name: forceMount
    type: boolean
    description: 'Used to force mounting when more control is needed. Useful when controlling animation with React animation libraries. If used on this part, it will be inherited by `Popover.Content`.'
  - name: container
    type: HTMLElement
    default: 'document.body'
    description: 'Specify a container element to portal the content into.'
---
::

### OkuPopoverContent

The component that pops out when the popover is open.


::OkuTable
---
data:
  - name: asChild
    required: false
    type: boolean
    default: false
    description: 'Change the default rendered element for the one passed as a child, merging their props and behavior.<br><br>Read our [Composition](../guides/composition) guide for more details.'
  - name: onOpenAutoFocus
    type: '(event: Event) => void'
    typeSimple: function
    description: 'Event handler called when focus moves into the component after opening. It can be prevented by calling `event.preventDefault`.'
  - name: onCloseAutoFocus
    type: '(event: Event) => void'
    typeSimple: function
    description: 'Event handler called when focus moves to the trigger after closing. It can be prevented by calling `event.preventDefault`.'
  - name: onEscapeKeyDown
    type: '(event: KeyboardEvent) => void'
    typeSimple: function
    description: 'Event handler called when the escape key is down. It can be prevented by calling `event.preventDefault`.'
  - name: onPointerDownOutside
    type: '(event: PointerDownOutsideEvent) => void'
    typeSimple: function
    description: 'Event handler called when a pointer event occurs outside the bounds of the component. It can be prevented by calling `event.preventDefault`.'
  - name: onFocusOutside
    type: '(event: FocusOutsideEvent) => void'
    typeSimple: function
    description: 'Event handler called when focus moves outside the bounds of the component. It can be prevented by calling `event.preventDefault`.'
  - name: onInteractOutside
    type: '(event: PointerDownOutsideEvent | FocusOutsideEvent) => void'
    typeSimple: function
    description: 'Event handler called when an interaction (pointer or focus event) happens outside the bounds of the component. It can be prevented by calling `event.preventDefault`.'
  - name: forceMount
    type: boolean
    description: 'Used to force mounting when more control is needed. Useful when controlling animation with React animation libraries. It inherits from `Popover.Portal`.'
  - name: side
    type: '"top" | "right" | "bottom" | "left"'
    typeSimple: enum
    default: '"bottom"'
    description: 'The preferred side of the anchor to render against when open. Will be reversed when collisions occur and `avoidCollisions` is enabled.'
  - name: sideOffset
    type: number
    default: '0'
    description: 'The distance in pixels from the anchor.'
  - name: align
    type: '"start" | "center" | "end"'
    typeSimple: enum
    default: '"center"'
    description: 'The preferred alignment against the anchor. May change when collisions occur.'
  - name: alignOffset
    type: number
    default: '0'
    description: 'An offset in pixels from the "start" or "end" alignment options.'
  - name: avoidCollisions
    type: boolean
    default: 'true'
    description: 'When `true`, overrides the `side` and `align` preferences to prevent collisions with boundary edges.'
  - name: collisionBoundary
    type: 'Element | null | Array<Element | null>'
    typeSimple: Boundary
    default: '[]'
    description: 'The element used as the collision boundary. By default this is the viewport, though you can provide additional element(s) to be included in this check.'
  - name: collisionPadding
    type: 'number | Partial<Record<Side, number>>'
    typeSimple: 'number | Padding'
    default: '0'
    description: 'The distance in pixels from the boundary edges where collision detection should occur. Accepts a number (same for all sides), or a partial padding object, for example: `{ top: 20, left: 20 }`.'
  - name: arrowPadding
    type: number
    default: '0'
    description: 'The padding between the arrow and the edges of the content. If your content has `border-radius`, this will prevent it from overflowing the corners.'
  - name: sticky
    type: '"partial" | "always"'
    typeSimple: enum
    default: '"partial"'
    description: 'The sticky behavior on the align axis. "partial" will keep the content in the boundary as long as the trigger is at least partially in the boundary whilst "always" will keep the content in the boundary regardless.'
  - name: hideWhenDetached
    type: boolean
    default: 'false'
    description: 'Whether to hide the content when the trigger becomes fully occluded.'
---
::

::OkuAttributesTable
---
data:
  - attribute: '[data-state]'
    values:
      - 'open'
      - 'closed'
  - attribute: '[data-side]'
    values:
      - 'left'
      - 'right'
      - 'bottom'
      - 'top'
  - attribute: '[data-align]'
    values:
      - 'start'
      - 'end'
      - 'center'
---
::

::OkuCssVariablesTable
---
data:
  - cssVariable: '--oku-popover-content-transform-origin'
    description: 'The `transform-origin` computed from the content and arrow positions/offsets'
  - cssVariable: '--oku-popover-content-available-width'
    description: 'The remaining width between the trigger and the boundary edge'
  - cssVariable: '--oku-popover-content-available-height'
    description: 'The remaining height between the trigger and the boundary edge'
  - cssVariable: '--oku-popover-trigger-width'
    description: 'The width of the trigger'
  - cssVariable: '--oku-popover-trigger-height'
    description: 'The height of the trigger'
---
::



### OkuPopoverArrow

An optional arrow element to render alongside the popover. This can be used to help visually link the anchor with the `Popover.Content`. Must be rendered inside `Popover.Content`.

::OkuTable
---
data:
  - name: asChild
    required: false
    type: boolean
    default: false
    description: 'Change the default rendered element for the one passed as a child, merging their props and behavior.<br><br>Read our [Composition](../guides/composition) guide for more details.'
  - name: width
    type: number
    default: 10
    description: 'The width of the arrow in pixels.'
  - name: height
    type: number
    default: 5
    description: 'The height of the arrow in pixels.'
---
::

### OkuPopoverClose

The button that closes an open popover.

::OkuTable
---
data:
  - name: asChild
    required: false
    type: boolean
    default: false
    description: 'Change the default rendered element for the one passed as a child, merging their props and behavior.<br><br>Read our [Composition](../guides/composition) guide for more details.'
---
::

## Accessibility

Adheres to the [Dialog WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialogmodal).


::OkuKeyboardTable
---
data:
  - keys: ['Space']
    description: 'Opens/closes the popover.'
  - keys: ['Enter']
    description: 'Opens/closes the popover.'
  - keys: ['Tab']
    description: 'Moves focus to the next focusable element.'
  - keys: ['Shift + Tab']
    description: 'Moves focus to the previous focusable element.'
  - keys: ['Esc']
    description: 'Closes the popover and moves focus to `Popover.Trigger`.'
---
::
