---
title: Aspect Ratio
description: Displays content within a desired ratio.
componentName: OkuAspectRatio
image: 'https://oku-ui.com/og/oku-aspect-ratio.jpg'
links:
  - label: NPM - 0.5.0
    icon: i-simple-icons-npm
    to: https://www.npmjs.com/package/@oku-ui/aspect-ratio
    title: OkuAspectRatio
---

::ContentDesignTabs
#oku
::ContentTabs
#preview
:ContentPreview{componentSrc="OkuAspectRatio" lang="vue" project="primitives"}
#vue
<!-- Autodocs{src="/primitives/OkuAspectRatio/index.vue" lang="vue"} -->
::
#radix
::ContentTabs
#preview
:ContentPreview{componentSrc="OkuAspectRatio" design="radix" lang="vue" project="primitives"}
#vue
<!-- Autodocs{src="/primitives/OkuAspectRatio/radix.vue" lang="vue"} -->
::
::

## Features

- Accepts any custom ratio.

## Installation

Install the component from your command line.

::code-group

```sh [pnpm]
pnpm i @oku-ui/aspect-ratio
```

```bash [yarn]
yarn add @oku-ui/aspect-ratio
```

```bash [npm]
npm install @oku-ui/aspect-ratio
```

::



## Anatomy

Import the component.

::code-group

```vue [o.vue]
<script setup lang="ts">
import { OkuAspectRatio } from '@oku-ui/aspect-ratio'
</script>

<template>
  <OkuAspectRatio :ratio="1 / 2" />
</template>
```
::

## API Reference

### OkuAspectRatio
Contains the content you want to constrain to a given ratio.


::OkuTable
---
data:
  - name: asChild
    required: false
    type: boolean
    default: false
    description: 'Change the default rendered element for the one passed as a child, merging their props and behavior.<br><br>Read our <a href=&quot;/guides/composition&quot;>Composition</a> guide for more details.'
  - name: ratio
    type: number
    default: 1
    description: The desired ratio
---
::