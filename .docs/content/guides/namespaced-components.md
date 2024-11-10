# Namespaced Components

The Oku Primitives design pattern involves creating individual primitives for each component, allowing users to construct or [compose](./composition) components as they wish.

However, importing all the necessary components individually can be cumbersome, and users might occasionally forget to import an important component.

To address this issue, we’ve introduced [Namespaced components](https://vuejs.org/api/sfc-script-setup.html#namespaced-components).

## How to use?

First, you need to import the namespaced components via `@oku-ui/primitives/namespaced` in your Vue component.

```vue line=2
<script setup lang="ts">
import { Dialog, DropdownMenu } from '@oku-ui/primitives/namespaced'
</script>
```

Then, you can use all the relevant components within the namespace.

```vue line=6-17
<script setup lang="ts">
import { Dialog } from '@oku-ui/primitives/namespaced'
</script>

<template>
  <Dialog.Root>
    <Dialog.Trigger>
      Trigger
    </Dialog.Trigger>
  </Dialog.Root>

  <Dialog.Portal>
    <Dialog.Overlay />
    <Dialog.Content>
      …
    </Dialog.Content>
  </Dialog.Portal>
</template>
```
