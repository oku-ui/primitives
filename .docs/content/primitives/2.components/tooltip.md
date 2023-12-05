---
title: Tooltip
description: A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.
componentName: OkuTooltip
image: 'https://oku-ui.com/og/oku-tooltip.jpg'
links:
  - label: NPM - 0.5.0
    icon: i-simple-icons-npm
    to: https://www.npmjs.com/package/@oku-ui/tooltip
    title: OkuTooltip
---

::ContentDesignTabs
#oku
::ContentTabs
#preview
:ContentPreview{componentSrc="OkuTooltip" lang="vue" project="primitives"}
#vue
<!-- Autodocs{src="/primitives/OkuTooltip/index.vue" lang="vue"} -->
::
#radix
::ContentTabs
#preview
:ContentPreview{componentSrc="OkuTooltip" design="radix" lang="vue" project="primitives"}
#vue
<!-- Autodocs{src="/primitives/OkuTooltip/radix.vue" lang="vue"} -->
::
::

## Features
- Provider to control display delay globally.
- Opens when the trigger is focused or hovered.
- Closes when the trigger is activated or when pressing escape.
- Supports custom timings.



## Installation

Install the component from your command line.

::code-group

```sh [pnpm]
pnpm i @oku-ui/toolip
```

```bash [yarn]
yarn add @oku-ui/toolip
```

```bash [npm]
npm install @oku-ui/toolip
```

::



## Anatomy

Import the component.

```vue
<script setup lang="ts">
import {
  OkuTooltipArrow,
  OkuTooltipContent,
  OkuTooltipPortal,
  OkuTooltipProvider,
  OkuTooltipRoot,
  OkuTooltipTrigger
} from '@oku-ui/tooltip'
</script>

<template>
  <OkuTooltipProvider>
    <OkuTooltip>
      <OkuTooltipTrigger />
      <OkuTooltipPortal>
        <OkuTooltipContent>
          <OkuTooltipArrow />
        </OkuTooltipContent>
      </OkuTooltipPortal>
    </OkuTooltip>
  </OkuTooltipProvider>
</template>
```

## API Reference

### OkuTooltipProvider
Wraps your app to provide global functionality to your tooltips.

::OkuTable
---
data:
  - name: delayDuration
    type: number
    default: 700
    description: 'The duration from when the mouse enters a tooltip trigger until the tooltip opens.'
  - name: skipDelayDuration
    type: number
    default: 300
    description: 'How much time a user has to enter another trigger without incurring a delay again.'
  - name: disableHoverableContent
    type: boolean
    description: 'Prevents `Tooltip.Content` from remaining open when hovering. Disabling this has accessibility consequences.'
---
::

### OkuTooltip
Contains all the parts of a tooltip.

::OkuTable
---
data:
  - name: v-model
    type: boolean
    description: 'The controlled open state of the tooltip. Must be used in conjunction with `onOpenChange`.'
  - name: defaultOpen
    type: boolean
    description: 'The open state of the tooltip when it is initially rendered. Use when you do not need to control its open state.'
  - name: open
    type: boolean
    description: 'The controlled open state of the tooltip. Must be used in conjunction with `onOpenChange`.'
  - name: onOpenChange
    type: '(open: boolean) => void'
    typeSimple: function
    description: 'Event handler called when the open state of the tooltip changes.'
  - name: delayDuration
    type: number
    default: 700
    description: 'Override the duration given to the `Provider` to customize the open delay for a specific tooltip.'
  - name: disableHoverableContent
    type: boolean
    default: false
    description: 'Prevents `Tooltip.Content` from remaining open when hovering. Disabling this has accessibility consequences. Inherits from `Tooltip.Provider`.'
---
::

### OkuTooltipTrigger
The button that toggles the tooltip. By default, the `Tooltip.Content` will position itself against the trigger.


::OkuTable
---
data:
  - name: asChild
    required: false
    type: boolean
    default: 'false'
    description: 'Change the default rendered element for the one passed as a child, merging their props and behavior. Read our [Composition](../guides/composition) guide for more details.'
---
::

::OkuAttributesTable
---
data:
  - attribute: '[data-state]'
    values: ['closed', 'delayed-open', 'instant-open']
---
::

### OkuTooltipPortal
When used, portals the content part into the `body`.

::OkuTable
---
data:
  - name: forceMount
    type: boolean
    description: 'Used to force mounting when more control is needed. Useful when controlling animation with React animation libraries. If used on this part, it will be inherited by `Tooltip.Content`.'
  - name: container
    type: HTMLElement
    default: 'document.body'
    description: 'Specify a container element to portal the content into.'
---
::


### OkuTooltipContent
The component that pops out when the tooltip is open.

::OkuTable
---
data:
  - name: asChild
    required: false
    type: boolean
    default: 'false'
    description: 'Change the default rendered element for the one passed as a child, merging their props and behavior. Read our [Composition](../guides/composition) guide for more details.'
  - name: aria-label
    type: string
    description: 'By default, screen readers will announce the content inside the component. If this is not descriptive enough, or you have content that cannot be announced, use `aria-label` as a more descriptive label.'
  - name: onEscapeKeyDown
    type: '(event: KeyboardEvent) => void'
    typeSimple: function
    description: 'Event handler called when the escape key is down. It can be prevented by calling `event.preventDefault`.'
  - name: onPointerDownOutside
    type: '(event: PointerDownOutsideEvent) => void'
    typeSimple: function
    description: 'Event handler called when a pointer event occurs outside the bounds of the component. It can be prevented by calling `event.preventDefault`.'
  - name: forceMount
    type: boolean
    description: 'Used to force mounting when more control is needed. Useful when controlling animation with React animation libraries. It inherits from `Tooltip.Portal`.'
  - name: side
    type: '"top" | "right" | "bottom" | "left"'
    typeSimple: enum
    default: '"top"'
    description: 'The preferred side of the trigger to render against when open. Will be reversed when collisions occur and `avoidCollisions` is enabled.'
  - name: sideOffset
    type: number
    default: '0'
    description: 'The distance in pixels from the trigger.'
  - name: align
    type: '"start" | "center" | "end"'
    typeSimple: enum
    default: '"center"'
    description: 'The preferred alignment against the trigger. May change when collisions occur.'
  - name: alignOffset
    type: number
    default: '0'
    description: 'An offset in pixels from the "start" or "end" alignment options.'
  - name: avoidCollisions
    type: boolean
    default: 'true'
    description: 'When true, overrides the `side` and `align` preferences to prevent collisions with boundary edges.'
  - name: collisionBoundary
    type: 'Element | null | Array<Element | null>'
    typeSimple: Boundary
    default: '[]'
    description: 'The element used as the collision boundary. By default, this is the viewport, though you can provide additional element(s) to be included in this check.'
  - name: collisionPadding
    type: 'number | Partial<Record<Side, number>>'
    typeSimple: 'number | Padding'
    default: '0'
    description: 'The distance in pixels from the boundary edges where collision detection should occur. Accepts a number (same for all sides), or a partial padding object, for example: { top: 20, left: 20 }.'
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
    values: ['closed', 'delayed-open', 'instant-open']
  - attribute: '[data-side]'
    values: ['left', 'right', 'bottom', 'top']
  - attribute: '[data-align]'
    values: ['start', 'end', 'center']
---
::

::CssVariablesTable
---
data:
  - cssVariable: '-oku-tooltip-content-transform-origin'
    description: 'The `transform-origin` computed from the content and arrow positions/offsets.'
  - cssVariable: '-oku-tooltip-content-available-width'
    description: 'The remaining width between the trigger and the boundary edge.'
  - cssVariable: '-oku-tooltip-content-available-height'
    description: 'The remaining height between the trigger and the boundary edge.'
  - cssVariable: '-oku-tooltip-trigger-width'
    description: 'The width of the trigger.'
  - cssVariable: '-oku-tooltip-trigger-height'
    description: 'The height of the trigger.'
---
::




### OkuTooltipArrow
An optional arrow element to render alongside the tooltip. This can be used to help visually link the trigger with the `Tooltip.Content`. Must be rendered inside `Tooltip.Content`.

::OkuTable
---
data:
  - name: asChild
    required: false
    type: boolean
    default: 'false'
    description: 'Change the default rendered element for the one passed as a child, merging their props and behavior. Read our [Composition](../guides/composition) guide for more details.'
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



## Accessibility
### Keyboard Interactions

::OkuKeyboardTable
---
data:
  - keys: ['Tab']
    description: 'Opens/closes the tooltip without delay.'
  - keys: ['Space']
    description: 'If open, closes the tooltip without delay.'
  - keys: ['Enter']
    description: 'If open, closes the tooltip without delay.'
  - keys: ['Escape']
    description: 'If open, closes the tooltip without delay.'
---
::