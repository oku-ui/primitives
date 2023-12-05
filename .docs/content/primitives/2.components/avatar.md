---
title: Avatar
description: An image element with a fallback for representing the user.
componentName: OkuAvatar
image: 'https://oku-ui.com/og/oku-avatar.jpg'
links:
  - label: NPM - 0.5.0
    icon: i-simple-icons-npm
    to: https://www.npmjs.com/package/@oku-ui/avatar
    title: OkuAvatar
---

::ContentDesignTabs
#oku
::ContentTabs
#preview
:ContentPreview{componentSrc="OkuAvatar" lang="vue" project="primitives"}
#vue
<!-- Autodocs{src="/primitives/OkuAvatar/index.vue" lang="vue"} -->
::
#radix
::ContentTabs
#preview
:ContentPreview{componentSrc="OkuAvatar" design="radix" lang="vue" project="primitives"}
#vue
<!-- Autodocs{src="/primitives/OkuAvatar/radix.vue" lang="vue"} -->
::
::


## Features

- Automatic and manual control over when the image renders.
- Fallback part accepts any children.
- Optionally delay fallback rendering to avoid content flashing.

## Installation

Install the component from your command line.

::code-group

```sh [pnpm]
pnpm i @oku-ui/avatar
```

```bash [yarn]
yarn add @oku-ui/avatar
```

```bash [npm]
npm install @oku-ui/avatar
```

::

## Anatomy

Import the component.

```vue
<script setup lang="ts">
import { OkuAvatar, OkuAvatarFallback, OkuAvatarImage } from '@oku-ui/avatar'
</script>

<template>
  <OkuAvatar>
    <OkuAvatarImage />
    <OkuAvatarFallback />
  </OkuAvatar>
</template>
```

## API Reference

### OkuAvatar
Contains all the parts of an avatar.

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


### OkuAvatarImage
The image to render. By default it will only render when it has loaded. You can use the `onLoadingStatusChange` handler if you need more control.

::OkuTable
---
data:
  - name: asChild
    required: false
    type: boolean
    default: false
    description: 'Change the default rendered element for the one passed as a child, merging their props and behavior.<br><br>Read our [Composition](../guides/composition) guide for more details.'
  - name: onLoadingStatusChange
    type: '(status: "idle" | "loading" | "loaded" | "error") => void'
    typeSimple: function
    description: 'A callback providing information about the loading status of the image. This is useful in case you want to control more precisely what to render as the image is loading.'
---
::


### OkuAvatarFallback

An element that renders when the image hasn't loaded. This means whilst it's loading, or if there was an error. If you notice a flash during loading, you can provide a `delay-ms` prop to delay its rendering so it only renders for those with slower connections. For more control, use the `onLoadingStatusChange` handler on `OkuAvatarImage`.

::OkuTable
---
data:
  - name: asChild
    required: false
    type: boolean
    default: false
    description: 'Change the default rendered element for the one passed as a child, merging their props and behavior.<br><br>Read our [Composition](../guides/composition) guide for more details.'
  - name: delayMs
    type: number
    description: 'Useful for delaying rendering so it only appears for those with slower connections.'
---
::
