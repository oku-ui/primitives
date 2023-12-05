---
title: Label
description: Renders an accessible label associated with controls.
componentName: OkuLabel
image: 'https://oku-ui.com/og/oku-label.jpg'
links:
  - label: NPM - 0.5.0
    icon: i-simple-icons-npm
    to: https://www.npmjs.com/package/@oku-ui/label
    title: OkuLabel
---

::ContentDesignTabs
#oku
::ContentTabs
#preview
:ContentPreview{componentSrc="OkuLabel" lang="vue" project="primitives"}
#vue
<!-- Autodocs{src="/primitives/OkuLabel/index.vue" lang="vue"} -->
::
#radix
::ContentTabs
#preview
:ContentPreview{componentSrc="OkuLabel" design="radix" lang="vue" project="primitives"}
#vue
<!-- Autodocs{src="/primitives/OkuLabel/radix.vue" lang="vue"} -->
::
::



## Installation

Install the component from your command line.

::code-group

```sh [pnpm]
pnpm i @oku-ui/label
```

```bash [yarn]
yarn add @oku-ui/label
```

```bash [npm]
npm install @oku-ui/label
```

::

## Anatomy

Import the component.

```vue
<script setup lang="ts">
import Label from '@oku-ui/label'
</script>

<template>
  <OkuLabel
    class="text-black text-2xl border-2 border-gray-500 mb-4"
    for="firstName"
  >
    Label
  </OkuLabel>
</template>
```

## API Reference

### OkuLabel
Contains the content for the label.

::OkuTable
---
data:
  - name: asChild
    required: false
    type: boolean
    default: false
    description: 'Change the default rendered element for the one passed as a child, merging their props and behavior.<br><br>Read our [Composition](../guides/composition) guide for more details.'
  - name: htmlFor
    type: string
    description: 'The id of the element the label is associated with.'
---
::

## Accessibility

This component is based on the native `label` element, it will automatically apply the correct labelling when wrapping controls or using the `for` attribute. For your own custom controls to work correctly, ensure they use native elements such as `button` or `input` as a base.