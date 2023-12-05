---
title: Accordion
description: A vertically stacked set of interactive headings that each reveal an associated section of content.
componentName: OkuAccordion
image: 'https://oku-ui.com/og/oku-accordion.png'
links:
  - label: NPM - 0.5.0
    icon: i-simple-icons-npm
    to: https://www.npmjs.com/package/@oku-ui/accordion
    title: OkuAccordion
navigation:
  badge: New
---

::ContentDesignTabs
#oku
::ContentTabs
#preview
:ContentPreview{componentSrc="OkuAccordion" lang="vue" project="primitives"}
#vue
<!-- Autodocs{src="/primitives/OkuAccordion/index.vue" lang="vue"} -->
#tailwind
<!-- Autodocs{src="/primitives/OkuAccordion/tailwind.js" lang="ts"} -->
::
#radix
::ContentTabs
#preview
:ContentPreview{componentSrc="OkuAccordion" design="radix" lang="vue" project="primitives"}
#vue
<!-- Autodocs{src="/primitives/OkuAccordion/radix.vue" lang="vue"} -->
::
::

## Features

- Full keyboard navigation.
- Supports horizontal/vertical orientation.
- Supports Right to Left direction.
- Can expand one or multiple items.
- Can be controlled or uncontrolled.

## Installation

Install the component from your command line.

::code-group

```sh [pnpm]
pnpm i @oku-ui/accordion
```

```bash [yarn]
yarn add @oku-ui/accordion
```

```bash [npm]
npm install @oku-ui/accordion
```

::


## Anatomy

Import the component.

::code-group

```vue [o.vue]
<script setup lang="ts">
import {
  OkuAccordion,
  OkuAccordionContent,
  OkuAccordionHeader,
  OkuAccordionItem,
  OkuAccordionTrigger
} from '@oku-ui/accordion'
</script>

<template>
  <OkuAccordion>
    <OkuAccordionItem>
      <OkuAccordionHeader>
        <OkuAccordionTrigger />
      </OkuAccordionHeader>
      <OkuAccordionContent />
    </OkuAccordionItem>
  </OkuAccordion>
</template>
```
::

## API Reference

### OkuAccordion
Contains all the parts of an accordion.


::OkuTable
---
data:
  - name: asChild
    required: false
    type: boolean
    default: false
    description: 'Change the default rendered element for the one passed as a child, merging their props and behavior.<br><br>Read our <a href="../guides/composition">Composition</a> guide for more details.'
  - name: type
    required: true
    type: 'enum: "single" | "multiple"'
    description: 'Determines whether one or multiple items can be opened at the same time.'
  - name: value
    required: false
    type: string
    description: 'The controlled value of the item to expand when type is "single". Must be used in conjunction with onValueChange.'
  - name: defaultValue
    required: false
    type: string
    description: 'The value of the item to expand when initially rendered and type is "single". Use when you do not need to control the state of the items.'
  - name: onValueChange
    required: false
    type: 'function: (value: string) => void'
    description: 'Event handler called when the expanded state of an item changes and type is "single".'
  - name: value
    required: false
    default: '[]'
    type: 'string[]'
    description: 'The controlled value of the item to expand when type is "multiple". Must be used in conjunction with onValueChange.'
  - name: defaultValue
    required: false
    default: '[]'
    type: 'string[]'
    description: 'The value of the item to expand when initially rendered when type is "multiple". Use when you do not need to control the state of the items.'
  - name: onValueChange
    required: false
    type: 'function: (value: string[]) => void'
    description: 'Event handler called when the expanded state of an item changes and type is "multiple".'
  - name: collapsible
    required: false
    default: false
    type: boolean
    description: 'When type is "single", allows closing content when clicking trigger for an open item.'
  - name: disabled
    required: false
    type: boolean
    default: false
    description: 'When true, prevents the user from interacting with the accordion and all its items.'
  - name: dir
    required: false
    default: 'ltr'
    type: 'enum: "ltr" | "rtl"'
    description: 'The reading direction of the accordion when applicable. If omitted, assumes LTR (left-to-right) reading mode.'
  - name: orientation
    required: false
    default: 'vertical'
    type: 'enum: "horizontal" | "vertical"'
    description: 'The orientation of the accordion.'
---
::


::OkuAttributesTable
---
data:
  - attribute: '[data-state]'
    values:
      - 'open'
      - 'closed'
  - attribute: '[data-disabled]'
    values: 'Present when disabled'
---
::


### OkuAccordionItem
Contains all the parts of a collapsible section.

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
  - name: 'disabled'
    required: false
    type: 'boolean'
    default: 'false'
    description: |
      When `true`, prevents the user from interacting with the item.
  - name: 'value'
    required: true
    type: 'string'
    description: 'A unique value for the item.'
---
::


::OkuAttributesTable
---
data:
  - attribute: '[data-state]'
    values:
      - 'open'
      - 'closed'
  - attribute: '[data-disabled]'
    values: 'Present when disabled'
  - attribute: '[data-orientation]'
    values:
      - 'vertical'
      - 'horizontal'
---
::

### OkuAccordionHeader
Wraps an `OkuAccordionHeader`. Use the `asChild` prop to update it to the appropriate heading level for your page.

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
      - 'open'
      - 'closed'
  - attribute: '[data-disabled]'
    values: 'Present when disabled'
  - attribute: '[data-orientation]'
    values:
      - 'vertical'
      - 'horizontal'
---
::

### OkuAccordionTrigger
Toggles the collapsed state of its associated item. It should be nested inside of an `OkuAccordionTrigger`.

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
      - 'open'
      - 'closed'
  - attribute: '[data-disabled]'
    values: 'Present when disabled'
  - attribute: '[data-orientation]'
    values:
      - 'vertical'
      - 'horizontal'
---
::

### OkuAccordionContent
Contains the collapsible content for an item.


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
---
::


::OkuAttributesTable
---
data:
  - attribute: '[data-state]'
    values:
      - 'open'
      - 'closed'
  - attribute: '[data-disabled]'
    values: 'Present when disabled'
  - attribute: '[data-orientation]'
    values:
      - 'vertical'
      - 'horizontal'
---
::


::CssVariablesTable
---
data:
  - cssVariable: '--oku-accordion-content-width'
    description: 'The width of the content when it opens/closes'
  - cssVariable: '--oku-accordion-content-height'
    description: 'The height of the content when it opens/closes'
---
::

## Accessibility

Adheres to the [Accordion WAI-ARIA design pattern](https://www.w3.org/TR/wai-aria-practices-1.1/#accordion).

### Keyboard Interactions

::OkuKeyboardTable
---
data:
  - keys: ['Space']
    description: |
      When focus is on an `OkuAccordionTrigger` of a collapsed
      section, expands the section.
  - keys: ['Enter']
    description: |
      When focus is on an `OkuAccordionTrigger` of a collapsed
      section, expands the section.
  - keys: ['Tab']
    description: 'Moves focus to the next focusable element.'
  - keys: ['Shift + Tab']
    description: 'Moves focus to the previous focusable element.'
  - keys: ['ArrowDown']
    description: |
      Moves focus to the next `OkuAccordionTrigger` when `orientation` is `vertical`.
  - keys: ['ArrowUp']
    description: |
      Moves focus to the previous `OkuAccordionTrigger` when `orientation` is `vertical`.
  - keys: ['ArrowRight']
    description: |
      Moves focus to the next `OkuAccordionTrigger` when `orientation` is `horizontal`.
  - keys: ['ArrowLeft']
    description: |
      Moves focus to the previous `OkuAccordionTrigger` when `orientation` is `horizontal`.
  - keys: ['Home']
    description: |
      When focus is on an `OkuAccordionTrigger`, moves focus to the first `OkuAccordionTrigger`.
  - keys: ['End']
    description: |
      When focus is on an `OkuAccordionTrigger`, moves focus to the last `OkuAccordionTrigger`.
---
::