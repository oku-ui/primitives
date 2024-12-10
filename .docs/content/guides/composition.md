---

title: Composition
description: Use the `as` prop to compose Radix's functionality onto alternative element types or your own Vue components.
---

# Composition

<Description>
Use the `as` prop to compose Radix's functionality onto alternative
element types or your own Vue components.
</Description>

All Radix primitive parts that render a DOM element accept an `as` prop. When `as` is set to `true`, Oku Primitives will not render a default DOM element, instead passing the props and behavior required to make it functional to the first child of the slots.

## Changing the element type

In the majority of cases you shouldn’t need to modify the element type as Radix has been designed to provide the most appropriate defaults. However, there are cases where it is helpful to do so.

A good example is with `TooltipTrigger`. By default this part is rendered as a `button`, though you may want to add a tooltip to a link (`a` tag) as well. Let's see how you can achieve this using `as`:

```vue{7}
<script setup lang="ts">
import { TooltipRoot, TooltipTrigger, TooltipPortal } from "@oku-ui/primitives";
</script>

<template>
  <TooltipRoot>
    <TooltipTrigger as="template">
      <a href="https://primitives.oku-ui.com/">Oku Primitives</a>
    </TooltipTrigger>
    <TooltipPortal>…</TooltipPortal>
  </TooltipRoot>
</template>
```

> If you do decide to change the underlying element type, it is your responsibility to ensure it remains accessible and functional. In the case of `TooltipTrigger` for example, it must be a focusable element that can respond to pointer and keyboard events. If you were to switch it to a `div`, it would no longer be accessible.

In reality, you will rarely modify the underlying DOM element like we've seen above. Instead it's more common to use your own Vue components. This is especially true for most `Trigger` parts, as you usually want to compose the functionality with the custom buttons and links in your design system.

## Composing with your own Vue components

This works exactly the same as above, you pass `as` to the part and then wrap your own component with it.
However, there are a few gotchas to be aware of.

## Composing multiple primitives

`as` can be used as deeply as you need to. This means it is a great way to compose multiple primitive's behavior together.
Here is an example of how you can compose `TooltipTrigger` and `DialogTrigger` together with your own button:

```vue{9,10}
<script setup lang="ts">
import { TooltipRoot, TooltipTrigger, TooltipPortal, DialogRoot, DialogTrigger, DialogPortal } from "@oku-ui/primitives";
import MyButton from from "@/components/MyButton.vue"
</script>

<template>
  <DialogRoot>
    <TooltipRoot>
      <TooltipTrigger as="template">
        <DialogTrigger as="template">
          <MyButton>Open dialog</MyButton>
        </DialogTrigger>
      </TooltipTrigger>
      <TooltipPortal>…</TooltipPortal>
    </TooltipRoot>

    <DialogPortal>...</DialogPortal>
  </DialogRoot>
</template>
```
