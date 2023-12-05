---
title: Checkbox
description: Renders an accessible checkbox associated with controls.
componentName: OkuCheckbox
image: 'https://oku-ui.com/og/oku-checkbox.jpg'
links:
  - label: NPM - 0.5.0
    icon: i-simple-icons-npm
    to: https://www.npmjs.com/package/@oku-ui/checkbox
    title: OkuCheckbox
---

::ContentDesignTabs
#oku
::ContentTabs
#preview
:ContentPreview{componentSrc="OkuCheckbox" lang="vue" project="primitives"}
#vue
<!-- Autodocs{src="/primitives/OkuCheckbox/index.vue" lang="vue"} -->
::
#radix
::ContentTabs
#preview
:ContentPreview{componentSrc="OkuCheckbox" design="radix" lang="vue" project="primitives"}
#vue
<!-- Autodocs{src="/primitives/OkuCheckbox/radix.vue" lang="vue"} -->
::
::



## Features

- Supports indeterminate state.
- Full keyboard navigation.
- Can be controlled or uncontrolled.



## Installation

Install the component from your command line.

::code-group

```sh [pnpm]
pnpm i @oku-ui/checkbox
```

```bash [yarn]
yarn add @oku-ui/checkbox
```

```bash [npm]
npm install @oku-ui/checkbox
```

::


## Anatomy

Import the component.

```vue
<script setup lang="ts">
import { OkuCheckbox, OkuCheckboxIndicator } from '@oku-ui/checkbox'
</script>

<template>
  <div class="flex items-center justify-center">
    <OkuCheckbox>
      <OkuCheckboxIndicator />
    </OkuCheckbox>
  </div>
</template>
```

## API Reference

### OkuCheckbox
Contains all the parts of a checkbox. An input will also render when used within a form to ensure events propagate correctly.


::OkuTable
---
data:
  - name: v-model
    type: boolean
    description: 'The controlled checked state of the checkbox. Must be used in conjunction with `onCheckedChange`.'
  - name: asChild
    required: false
    type: boolean
    default: false
    description: 'Change the default rendered element for the one passed as a child, merging their props and behavior.<br><br>Read our [Composition](../guides/composition) guide for more details.'
  - name: defaultChecked
    type: boolean
    description: 'The checked state of the checkbox when it is initially rendered. Use when you do not need to control its checked state.'
  - name: checked
    type: boolean
    description: 'The controlled checked state of the checkbox. Must be used in conjunction with `onCheckedChange`.'
  - name: onCheckedChange
    type: '(checked: boolean | "indeterminate") => void'
    typeSimple: function
    description: 'Event handler called when the checked state of the checkbox changes.'
  - name: disabled
    type: boolean
    description: 'When `true`, prevents the user from interacting with the checkbox.'
  - name: required
    type: boolean
    description: 'When `true`, indicates that the user must check the checkbox before the owning form can be submitted.'
  - name: name
    type: string
    description: 'The name of the checkbox. Submitted with its owning form as part of a name/value pair.'
  - name: value
    type: string
    default: 'on'
    description: 'The value given as data when submitted with a `name`.'
---
::


::OkuAttributesTable
---
data:
  - attribute: '[data-state]'
    values:
      - 'checked'
      - 'unchecked'
      - 'indeterminate'
  - attribute: '[data-disabled]'
    values: 'Present when disabled'
---
::



### OkuCheckboxIndicator
Renders when the checkbox is in a checked or indeterminate state. You can style this element directly, or you can use it as a wrapper to put an icon into, or both.

::OkuTable
---
data:
  - name: asChild
    required: false
    type: boolean
    default: false
    description: 'Change the default rendered element for the one passed as a child, merging their props and behavior.<br><br>Read our [Composition](../guides/composition) guide for more details.'
  - name: forceMount
    type: boolean
    description: 'Used to force mounting when more control is needed. Useful when controlling animation with React animation libraries.'
---
::

::OkuAttributesTable
---
data:
  - attribute: '[data-state]'
    values:
      - 'checked'
      - 'unchecked'
      - 'indeterminate'
  - attribute: '[data-disabled]'
    values: 'Present when disabled'
---
::


## Accessibility

Adheres to the [tri-state Checkbox WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox).

### Keyboard Interactions

::OkuKeyboardTable
---
data:
  - keys: ['Space']
    description: 'Checks/unchecks the checkbox.'
---
::
