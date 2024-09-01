<script setup lang="ts">
import { useRef } from '../../hooks/index.ts'
import { Collection } from './utils.ts'

const collectionRef = useRef<HTMLElement>()
function setRef(nodeRef: any) {
  collectionRef.current = nodeRef
}
Collection.provideCollectionContext(collectionRef)
</script>

<template>
  <ul :ref="setRef" class="list">
    <slot />
  </ul>
</template>
