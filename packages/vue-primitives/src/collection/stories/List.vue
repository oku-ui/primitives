<script setup lang="ts">
import { shallowRef } from 'vue'
import { Collection } from './utils.ts'

const collectionRef = shallowRef<HTMLElement>()
Collection.provideCollectionContext(collectionRef)
</script>

<template>
  <ul ref="collectionRef" class="list">
    <slot />
  </ul>
</template>
