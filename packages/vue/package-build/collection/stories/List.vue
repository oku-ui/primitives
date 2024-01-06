<script lang="ts" setup>
import { CollectionProvider, CollectionSlot } from './utils'
</script>

<template>
  <CollectionProvider :scope="undefined">
    <CollectionSlot :scope="undefined">
      <ul style="width: 200px;">
        <slot />
      </ul>
    </CollectionSlot>
  </CollectionProvider>
</template>
