---

title: Aspect Ratio
description: Displays content within a desired ratio.
name: aspect-ratio
---

# Aspect Ratio

<Description>
Displays content within a desired ratio.
</Description>

<ComponentPreview name="AspectRatio" />

## Features

<Highlights
  :features="[
    'Accepts any custom ratio.'
  ]"
/>

## Installation

Install the component from your command line.

<InstallationTabs value="@oku-ui/primitives" />

## Anatomy

Import the component.

```vue
<script setup>
import { AspectRatio } from '@oku-ui/primitives'
</script>

<template>
  <AspectRatio />
</template>
```

## API Reference

### Root

Contains the content you want to constrain to a given ratio.

<!-- @include: @/meta/AspectRatio.md -->
