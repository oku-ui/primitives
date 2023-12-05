---
title: Toast
description: Renders an accessible label associated with controls.
componentName: OkuToast
image: 'https://oku-ui.com/og/oku-toast.jpg'
---

::ContentDesignTabs
#oku
::ContentTabs
#preview
:ContentPreview{componentSrc="OkuToast" lang="vue" project="primitives"}
#vue
<!-- Autodocs{src="/primitives/OkuToast/index.vue" lang="vue"} -->
::
#radix
::ContentTabs
#preview
:ContentPreview{componentSrc="OkuToast" design="radix" lang="vue" project="primitives"}
#vue
<!-- Autodocs{src="/primitives/OkuToast/radix.vue" lang="vue"} -->
::
::

## Features
- Automatically closes.
- Pauses closing on hover, focus and window blur.
- Supports hotkey to jump to toast viewport.
- Supports closing via swipe gesture.
- Exposes CSS variables for swipe gesture animations.
- Can be controlled or uncontrolled.

## Installation

Install the component from your command line.

::code-group

```sh [pnpm]
pnpm i @oku-ui/toast
```

```bash [yarn]
yarn add @oku-ui/toast
```

```bash [npm]
npm install @oku-ui/toast
```

::

## Anatomy

Import the component.

```vue
<script setup lang="ts">
import {
  OkuToast,
  OkuToastAction,
  OkuToastClose,
  OkuToastDescription,
  OkuToastProvider,
  OkuToastTitle,
  OkuToastViewport
} from '@oku-ui/toast'
</script>

<template>
  <OkuToastProvider>
    <OkuToast>
      <OkuToastTitle />
      <OkuToastDescription />
      <OkuToastAction />
      <OkuToastClose />
    </OkuToast>

    <OkuToastViewport />
  </OkuToastProvider>
</template>
```

## API Reference

### OkuToastProvider
The provider that wraps your toasts and toast viewport. It usually wraps the application.

::OkuTable
---
data:
  - name: duration
    type: number
    default: 5000
    description: |
      The time in milliseconds that should elapse before automatically closing each toast.
  - name: label
    required: true
    type: string
    default: '"Notification"'
    description: |
      An author-localized label for each toast. Used to help screen reader users associate the interruption with a toast.
  - name: swipeDirection
    type: '"right" | "left" | "up" | "down"'
    typeSimple: enum
    default: '"right"'
    description: |
      The direction of the pointer swipe that should close the toast.
  - name: swipeThreshold
    type: number
    default: 50
    description: |
      The distance in pixels that the swipe gesture must travel before a close is triggered.
---
::


### OkuToastViewport
The fixed area where toasts appear. Users can jump to the viewport by pressing a hotkey. It is up to you to ensure the discoverability of the hotkey for keyboard users.

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
  - name: hotkey
    type: 'string[]'
    default: '["F8"]'
    description: |
      The keys to use as the keyboard shortcut that will move focus to the
      toast viewport. Use `event.code` value for each key from [keycode.info](https://keycode.info/).
      For meta keys, use `ctrlKey`, `shiftKey`, `altKey`, and/or `metaKey`.
  - name: label
    type: string
    default: '"Notifications ({hotkey})"'
    description: |
      An author-localized label for the toast region to provide context for screen reader users when navigating page landmarks. The available `{hotkey}` placeholder will be replaced for you.
---
::

### OkuToast
The toast that automatically closes. It should not be held open to [acquire a user response](/primitives/docs/components/toast#action).

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
  - name: type
    type: '"foreground" | "background"'
    typeSimple: enum
    default: '"foreground"'
    description: |
      Control the [sensitivity](/primitives/docs/components/toast#sensitivity) of the toast for accessibility purposes. For toasts that are the result of a user action, choose `foreground`. Toasts generated from background tasks should use `background`.
  - name: duration
    type: number
    description: |
      The time in milliseconds that should elapse before automatically closing the toast. This will override the value supplied to the provider.
  - name: defaultOpen
    type: boolean
    default: true
    description: |
      The open state of the dialog when it is initially rendered. Use when you do not need to control its open state.
  - name: open
    type: boolean
    description: |
      The controlled open state of the dialog. Must be used in conjunction with `onOpenChange`.
  - name: onOpenChange
    type: '(open: boolean) => void'
    typeSimple: function
    description: |
      Event handler called when the open state of the dialog changes.
  - name: onEscapeKeyDown
    type: '(event: KeyboardEvent) => void'
    typeSimple: function
    description: |
      Event handler called when the escape key is down. It can be prevented by calling `event.preventDefault`.
  - name: onPause
    type: '() => void'
    typeSimple: function
    description: |
      Event handler called when the dismiss timer is paused. This occurs when the pointer is moved over the viewport, the viewport is focused, or when the window is blurred.
  - name: onResume
    type: '() => void'
    typeSimple: function
    description: |
      Event handler called when the dismiss timer is resumed. This occurs when the pointer is moved away from the viewport, the viewport is blurred, or when the window is focused.
  - name: onSwipeStart
    type: '(event: SwipeEvent) => void'
    typeSimple: function
    description: |
      Event handler called when starting a swipe interaction. It can be prevented by calling `event.preventDefault`.
  - name: onSwipeMove
    type: '(event: SwipeEvent) => void'
    typeSimple: function
    description: |
      Event handler called during a swipe interaction. It can be prevented by calling `event.preventDefault`.
  - name: onSwipeEnd
    type: '(event: SwipeEvent) => void'
    typeSimple: function
    description: |
      Event handler called at the end of a swipe interaction. It can be prevented by calling `event.preventDefault`.
  - name: forceMount
    type: boolean
    description: |
      Used to force mounting when more control is needed. Useful when controlling animation with React animation libraries.
---
::

::OkuAttributesTable
---
data:
  - attribute: '[data-state]'
    values: ['open', 'closed']
  - attribute: '[data-swipe]'
    values: ['start', 'move', 'cancel', 'end']
  - attribute: '[data-swipe-direction]'
    values: ['up', 'down', 'left', 'right']
---
::

::OkuCssVariablesTable
---
data:
  - cssVariable: '--radix-toast-swipe-move-x'
    description: |
      The offset position of the toast when horizontally swiping
  - cssVariable: '--radix-toast-swipe-move-y'
    description: |
      The offset position of the toast when vertically swiping
  - cssVariable: '--radix-toast-swipe-end-x'
    description: |
      The offset end position of the toast after horizontally swiping
  - cssVariable: '--radix-toast-swipe-end-y'
    description: |
      The offset end position of the toast after vertically swiping
---
::


### OkuToastTitle
An optional title for the toast.

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

### OkuToastDescription
The toast message.

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

### OkuToastAction
An action that is safe to ignore to ensure users are not expected to complete tasks with unexpected side effects as a result of a [time limit](https://www.w3.org/TR/UNDERSTANDING-WCAG20/time-limits-required-behaviors.html).

When obtaining a user response is necessary, portal an [`AlertDialog`](/primitives/docs/components/alert-dialog) styled as a toast into the viewport instead.


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
  - name: altText
    required: true
    type: string
    description: |
      Describe an [alternative way to achieve the action](./toast#alternative-action) for screen reader users who cannot access the toast easily.
---
::


### OkuToastClose
A button that allows users to dismiss the toast before its duration has elapsed.

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



### Keyboard Interactions

::OkuKeyboardTable
---
data:
  - keys: ['F8']
    description: |
      Focuses toasts viewport.
  - keys: ['Tab']
    description: |
      Moves focus to the next focusable element.
  - keys: ['Shift + Tab']
    description: |
      Moves focus to the previous focusable element.
  - keys: ['Space']
    description: |
      When focus is on a `Toast.Action` or `Toast.Close`, closes the toast.
  - keys: ['Enter']
    description: |
      When focus is on a `Toast.Action` or `Toast.Close`, closes the toast.
  - keys: ['Esc']
    description: |
      When focus is on a `Toast`, closes the toast.
---
::
