<script setup lang="ts">
import { useAttrs } from 'vue'
import { useComposedElements } from '../../hooks/index.ts'
import { isPropFalsy } from '../../utils/is.ts'
import { DATA_COLLECTION_ITEM } from '../index.ts'
import { Collection, type ItemData } from './utils.ts'

const attrs = useAttrs()

const composedElements = useComposedElements((v) => {
  Collection.useCollectionItem(v, attrs as unknown as ItemData['demo'], 'demo')
})
</script>

<template>
  <li
    :ref="composedElements"
    class="item"
    :style="{
      opacity: !isPropFalsy($attrs.disabled) ? 0.3 : undefined,
    }"
    :[DATA_COLLECTION_ITEM]="true"
  >
    <slot />
  </li>
</template>
