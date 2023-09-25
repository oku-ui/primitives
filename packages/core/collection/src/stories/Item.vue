<script lang="ts" setup>
import { useAttrs } from 'vue'
import { CollectionItemSlot } from './utils'

defineProps({
  disabled: Boolean,
})
const attrs: any = useAttrs()
console.log('attrs', attrs)
</script>

<template>
  <CollectionItemSlot :scope="undefined" :disabled="disabled">
    <li :style="{ ...attrs.style, opacity: disabled ? 0.3 : undefined }" class="pl-5 mt-2 space-y-1  list-inside">
      <slot />
    </li>
  </CollectionItemSlot>
</template>
