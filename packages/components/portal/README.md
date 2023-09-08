# Portal
Portals provide a first-class way to render children into a DOM node that exists outside the DOM hierarchy of the parent component.

![@oku-ui/portal](./../../../.github/assets/og/oku-portal.jpg)


<span><a href="https://www.npmjs.com/package/@oku-ui/portal "><img src="https://img.shields.io/npm/v/@oku-ui/portal?style=flat&colorA=18181B&colorB=28CF8D" alt="Version"></a> </span> | <span> <a href="https://www.npmjs.com/package/@oku-ui/portal"> <img src="https://img.shields.io/npm/dm/@oku-ui/portal?style=flat&colorA=18181B&colorB=28CF8D" alt="Downloads"> </a> </span> | <span> <a href="https://oku-ui.com/primitives/components/portal"><img src="https://img.shields.io/badge/Open%20Documentation-18181B" alt="Website"></a> </span>

## Installation

```sh
$ pnpm add @oku-ui/portal
```
[Documentation](https://oku-ui.com/primitives/components/portal)

## Usage

```vue
<script setup lang="ts">
import { OkuPortal } from '@oku-ui/portal'
</script>

<template>
<OkuPortal>
  <h1>This content is rendered in a portal (another DOM tree)</h1>
</OkuPortal>
</template>
```
...
