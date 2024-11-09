---
title: Server Side Rendering
description: Oku Primitives can be rendered on the server.
---

# Server Side Rendering

<Description>
Oku Primitives can be rendered on the server.
</Description>

## Overview

Server-side rendering, or `SSR`, is a technique used to render components to HTML on the server, instead of rendering only on the client.

Static rendering is a similar approach but pre-renders pages to HTML at build time rather than on each request.

You should be able to use all of our primitives with both SSR and static rendering, for example with [Nuxt.js](https://nuxt.com/).

## Nuxt Hydration Support (Vue 3.5+)

Oku Primitives fully supports Vue 3.5 and above. If you're using Nuxt, you can use the [Oku Primitives Nuxt module](/overview/installation.html#nuxt-modules), which provides auto-import support for components.

For consistent performance and hydration behavior, we recommend using Vue 3.5 or later.