---
title: Alert Dialog
description: A modal dialog that interrupts the user with important content and expects a response.
componentName: OkuAlertDialog
image: 'https://oku-ui.com/og/oku-alert-dialog.png'
links:
  - label: NPM - 0.5.0
    icon: i-simple-icons-npm
    to: https://www.npmjs.com/package/@oku-ui/alert-dialog
    title: OkuAlertDialog
navigation:
  badge: New
---

::ContentDesignTabs
#oku
::ContentTabs
#preview
:ContentPreview{componentSrc="OkuAlertDialog" lang="vue" project="primitives"}
#vue
<!-- Autodocs{src="/primitives/OkuAlertDialog/index.vue" lang="vue"} -->
::
#radix
::ContentTabs
#preview
:ContentPreview{componentSrc="OkuAlertDialog" design="radix" lang="vue" project="primitives"}
#vue
<!-- Autodocs{src="/primitives/OkuAlertDialog/radix.vue" lang="vue"} -->
::
::


## Features

- Full keyboard navigation.
- Can be controlled or uncontrolled.
- Manages screen reader announcements with `Title` and `Description` components.
- Esc closes the component automatically.

## Installation

Install the component from your command line.

::code-group

```sh [pnpm]
pnpm i @oku-ui/alert-dialog
```

```bash [yarn]
yarn add @oku-ui/alert-dialog
```

```bash [npm]
npm install @oku-ui/alert-dialog
```

::


## Anatomy

Import the component.

::code-group

```vue [o.vue]
<script setup lang="ts">
import {
  OkuAlertDialog,
  OkuAlertDialogAction,
  OkuAlertDialogCancel,
  OkuAlertDialogContent,
  OkuAlertDialogDescription,
  OkuAlertDialogOverlay,
  OkuAlertDialogPortal,
  OkuAlertDialogTitle,
  OkuAlertDialogTrigger,
} from '@oku-ui/alert-dialog'
</script>

<template>
  <OkuAlertDialog>
    <OkuAlertDialogTrigger />
    <OkuAlertDialogPortal>
      <OkuAlertDialogOverlay />
      <OkuAlertDialogContent>
        <OkuAlertDialogTitle />
        <OkuAlertDialogDescription />
        <OkuAlertDialogCancel />
        <OkuAlertDialogAction />
      </OkuAlertDialogContent>
    </OkuAlertDialogPortal>
  </OkuAlertDialog>
</template>
```
::

## API Reference

### OkuAlertDialog
Contains all the parts of an alert dialog.


::OkuTable
---
data:
  - name: 'defaultOpen'
    type: 'boolean'
    description:
      'The open state of the dialog when it is initially rendered. Use when you do not need to control its open state.'
  - name: 'open'
    type: 'boolean'
    description: |
      The controlled open state of the dialog. Must be used in conjunction
      with `onOpenChange`.
  - name: 'onOpenChange'
    type: '(open: boolean) => void'
    typeSimple: 'function'
    description:
      'Event handler called when the open state of the dialog changes.'
---
::

### OkuAlertDialogTrigger
A button that opens the dialog.

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
---
::

### OkuAlertDialogPortal
When used, portals your overlay and content parts into the `body`.

::OkuTable
---
data:
  - name: 'forceMount'
    type: 'boolean'
    description: |
      Used to force mounting when more control is needed. Useful when
      controlling animation with React animation libraries. If used on this
      part, it will be inherited by `AlertDialog.Overlay` and `AlertDialog.Content`.
  - name: 'container'
    type: 'HTMLElement'
    default: 'document.body'
    description: 'Specify a container element to portal the content into.'
---
::

### OkuAlertDialogOverlay
A layer that covers the inert portion of the view when the dialog is open.

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
      controlling animation with React animation libraries. It inherits from `AlertDialog.Portal`.
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

### OkuAlertDialogContent
Contains content to be rendered when the dialog is open.

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
      controlling animation with React animation libraries. It inherits from `AlertDialog.Portal`.
  - name: 'onOpenAutoFocus'
    type: '(event: Event) => void'
    typeSimple: 'function'
    description: |
      Event handler called when focus moves to the destructive action after
      opening. It can be prevented by calling `event.preventDefault`.
  - name: 'onCloseAutoFocus'
    type: '(event: Event) => void'
    typeSimple: 'function'
    description: |
      Event handler called when focus moves to the trigger after closing. It
      can be prevented by calling `event.preventDefault`.
  - name: 'onEscapeKeyDown'
    type: '(event: KeyboardEvent) => void'
    typeSimple: 'function'
    description: |
      Event handler called when the escape key is down. It can be prevented
      by calling `event.preventDefault`.
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

### OkuAlertDialogCancel

A button that closes the dialog. This button should be distinguished visually from `OkuAlertDialogAction` buttons.

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

### OkuAlertDialogAction

A button that closes the dialog. This button should be distinguished visually from `OkuAlertDialogCancel` buttons.

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

## OkuAlertDialogTitle

An accessible name to be announced when the dialog is opened. Alternatively, you can provide `aria-label` or `aria-labelledby` to `OkuAlertDialogContent` and exclude this component.

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

## OkuAlertDialogDescription

An accessible description to be announced when the dialog is opened. Alternatively, you can provide `aria-describedby` to `OkuAlertDialogContent` and exclude this component.

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

Adheres to the [Alert and Message Dialogs WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog).

### Keyboard Interactions

::KeyboardTable
---
data:
  - key: 'Space'
    description: 'Opens/closes the dialog.'
  - key: 'Enter'
    description: 'Opens/closes the dialog.'
  - key: 'Tab'
    description: 'Moves focus to the next focusable element.'
  - key: 'Shift + Tab'
    description: 'Moves focus to the previous focusable element.'
  - key: 'Esc'
    description: |
      Closes the dialog and moves focus to `OkuAlertDialogTrigger`.
---
