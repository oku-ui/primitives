<script setup lang="ts">
import { useAttrs } from 'vue'
import { useComposedElements } from '../../hooks/useComposedElements.ts'
import { isPropFalsy } from '../../utils/is.ts'
import { ITEM_DATA_ATTR } from '../Collection.ts'
import { Collection, type ItemData } from './utils.ts'

const attrs = useAttrs()

const composedElements = useComposedElements((v) => {
  Collection.useCollectionItem(v, attrs as unknown as ItemData)
})
</script>

<template>
  <li
    :ref="composedElements"
    class="item"
    :style="{
      opacity: !isPropFalsy($attrs.disabled) ? 0.3 : undefined,
    }"
    :[ITEM_DATA_ATTR]="true"
  >
    <slot />
  </li>
</template>
