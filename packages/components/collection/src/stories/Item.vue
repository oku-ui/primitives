<script lang="ts" setup>
import { CollectionItemSlot } from './utils'

defineProps({
  disabled: Boolean,
})
// const attrs = useAttrs()
</script>

<template>
  <CollectionItemSlot :scope="undefined" :disabled="disabled">
    <li :style="{ opacity: disabled ? 0.3 : undefined }">
      <slot />
    </li>
  </CollectionItemSlot>
</template>
