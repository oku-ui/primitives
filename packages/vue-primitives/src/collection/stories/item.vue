<script setup lang="ts">
import { shallowRef, useAttrs } from 'vue'
import { isPropFalsy } from '../../utils/is.ts'
import { ITEM_DATA_ATTR } from '../Collection.ts'
import { Collection, type ItemData } from './utils.ts'

const attrs = useAttrs()

const currentElement = shallowRef<HTMLElement>()
Collection.useCollectionItem(currentElement, attrs as unknown as ItemData)
</script>

<template>
  <li
    ref="currentElement"
    class="item"
    :style="{
      opacity: !isPropFalsy($attrs.disabled) ? 0.3 : undefined,
    }"
    :[ITEM_DATA_ATTR]="true"
  >
    <slot />
  </li>
</template>
