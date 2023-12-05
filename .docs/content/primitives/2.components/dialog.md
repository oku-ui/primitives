---
title: Dialog
description: A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.
componentName: OkuDialog
image: 'https://oku-ui.com/og/oku-dialog.jpg'
links:
  - label: NPM - 0.5.0
    icon: i-simple-icons-npm
    to: https://www.npmjs.com/package/@oku-ui/dialog
    title: OkuDialog
---

::ContentDesignTabs
#oku
::ContentTabs
#preview
:ContentPreview{componentSrc="OkuDialog" lang="vue" project="primitives"}
#vue
<!-- Autodocs{src="/primitives/OkuDialog/index.vue" lang="vue"} -->
::
#radix
::ContentTabs
#preview
:ContentPreview{componentSrc="OkuDialog" design="radix" lang="vue" project="primitives"}
#vue
<!-- Autodocs{src="/primitives/OkuDialog/radix.vue" lang="vue"} -->
::
::

## Features
- Supports modal and non-modal modes.
- Focus is automatically trapped when modal.
- Can be controlled or uncontrolled.
- Manages screen reader announcements with `Title` and `Description` components.
- Esc closes the component automatically.

## Installation

Install the component from your command line.

::code-group

```sh [pnpm]
pnpm i @oku-ui/dialog
```

```bash [yarn]
yarn add @oku-ui/dialog
```

```bash [npm]
npm install @oku-ui/dialog
```

::



## Anatomy

Import the component.

```vue
<script setup lang="ts">
import {
  OkuDialog,
  OkuDialogClose,
  OkuDialogContent,
  OkuDialogDescription,
  OkuDialogOverlay,
  OkuDialogPortal,
  OkuDialogTitle,
  OkuDialogTrigger
} from '@oku-ui/dialog'
</script>

<template>
  <OkuDialog>
    <OkuDialogTrigger />
    <OkuDialogPortal>
      <OkuDialogOverlay />
      <OkuDialogContent>
        <OkuDialogTitle />
        <OkuDialogDescription />
        <OkuDialogClose />
      </OkuDialogContent>
    </OkuDialogPortal>
  </OkuDialog>
</template>
```

## API Reference

### OkuDialog
Contains all the parts of a dialog.

::OkuTable
---
data:
  - name: v-model
    type: boolean
    description: |
      The controlled open state of the dialog. Must be used in conjunction with `onOpenChange`.
  - name: defaultOpen
    type: boolean
    description: |
      The open state of the dialog when it is initially rendered. Use when you do not need to control its open state.
  - name: open
    type: boolean
    description: |
      The controlled open state of the dialog. Must be used in conjunction with `onOpenChange`.
  - name: onOpenChange
    type: function
    description: |
      Event handler called when the open state of the dialog changes.
  - name: modal
    required: false
    type: boolean
    default: true
    description: |
      The modality of the dialog. When set to `true`, interaction with outside elements will be disabled, and only dialog content will be visible to screen readers.
---
::

### OkuDialogTrigger
The button that opens the dialog.

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



### OkuDialogPortal
When used, portals your overlay and content parts into the `body`.

::OkuTable
---
data:
  - name: forceMount
    type: boolean
    description: |
      Used to force mounting when more control is needed. Useful when
      controlling animation with React animation libraries. If used on this
      part, it will be inherited by <Code>Dialog.Overlay</Code> and{' '}
      <Code>Dialog.Content</Code>.
  - name: container
    type: HTMLElement
    default: document.body
    description: |
      Specify a container element to portal the content into.
---
::


### OkuDialogOverlay

A layer that covers the inert portion of the view when the dialog is open.

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
      controlling animation with React animation libraries. It inherits from <Code>Dialog.Portal</Code>.
---
::

::OkuAttributesTable
---
data:
  - attribute: '[data-state]'
    values: ['open', 'closed']
---
::

### OkuDialogContent
Contains content to be rendered in the open dialog.

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
      controlling animation with React animation libraries. It inherits from <Code>Dialog.Portal</Code>.
  - name: onOpenAutoFocus
    type: '(event: Event) => void'
    typeSimple: function
    description: |
      Event handler called when focus moves into the component after
      opening. It can be prevented by calling <Code>event.preventDefault</Code>.
  - name: onCloseAutoFocus
    type: '(event: Event) => void'
    typeSimple: function
    description: |
      Event handler called when focus moves to the trigger after closing. It
      can be prevented by calling <Code>event.preventDefault</Code>.
  - name: onEscapeKeyDown
    type: '(event: KeyboardEvent) => void'
    typeSimple: function
    description: |
      Event handler called when the escape key is down. It can be prevented
      by calling <Code>event.preventDefault</Code>.
  - name: onPointerDownOutside
    type: '(event: PointerDownOutsideEvent) => void'
    typeSimple: function
    description: |
      Event handler called when a pointer event occurs outside the bounds of
      the component. It can be prevented by calling <Code>event.preventDefault</Code>.
  - name: onInteractOutside
    type: '(event: React.FocusEvent | MouseEvent | TouchEvent) => void'
    typeSimple: function
    description: |
      Event handler called when an interaction (pointer or focus event)
      happens outside the bounds of the component. It can be prevented by
      calling <Code>event.preventDefault</Code>.
---
::

::OkuAttributesTable
---
data:
  - attribute: '[data-state]'
    values: ['open', 'closed']
---
::


### OkuDialogClose
The button that closes the dialog.

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


### OkuDialogTitle
An accessible title to be announced when the dialog is opened.

If you want to hide the title, wrap it inside our [Visually Hidden](../utilities/visually-hidden) utility like this `<VisuallyHidden asChild>`.

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


### OkuDialogDescription
An optional accessible description to be announced when the dialog is opened.

If you want to hide the description, wrap it inside our [Visually Hidden](../utilities/visually-hidden) utility like this `<VisuallyHidden asChild>`. If you want to remove the description entirely, remove this part and pass `aria-describedby={undefined}` to `Dialog.Content`.

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


## Accessibility
Adheres to the [Dialog WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialogmodal).

### Keyboard Interactions

::OkuKeyboardTable
---
data:
  - keys: ['Space']
    description: 'Opens/closes the dialog.'
  - keys: ['Enter']
    description: 'Opens/closes the dialog.'
  - keys: ['Tab']
    description: 'Moves focus to the next focusable element.'
  - keys: ['Shift + Tab']
    description: 'Moves focus to the previous focusable element.'
  - keys: ['Esc']
    description: |
      Closes the dialog and moves focus to <Code>Dialog.Trigger</Code>.
---
::
