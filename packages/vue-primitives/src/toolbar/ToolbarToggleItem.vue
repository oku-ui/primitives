<script setup lang="ts">
import { DATA_COLLECTION_ITEM } from '../collection/index.ts'
import { useComposedElements } from '../hooks/index.ts'
import { useRovingFocusGroupItem } from '../roving-focus/index.ts'
import { ToggleGroupItem } from '../toggle-group/index.ts'
import type { ToolbarToggleItemEmits, ToolbarToggleItemProps } from './ToolbarToggleItem.ts'

defineOptions({
  name: 'ToolbarToggleItem',
})
defineProps<ToolbarToggleItemProps>()

const emit = defineEmits<ToolbarToggleItemEmits>()

const rovingFocusGroupItem = useRovingFocusGroupItem({}, {
  onMousedown(event) {
    emit('mousedown', event)
  },
  onKeydown(event) {
    emit('keydown', event)
  },
  onFocus(event) {
    emit('focus', event)
  },
})

const forwardElement = useComposedElements((v) => {
  rovingFocusGroupItem.useCollectionItem(v, rovingFocusGroupItem.itemData, rovingFocusGroupItem.collectionKey)
})
</script>

<template>
  <ToggleGroupItem
    :ref="forwardElement"
    :[DATA_COLLECTION_ITEM]="true"

    :tabindex="rovingFocusGroupItem.tabindex()"
    :data-orientation="rovingFocusGroupItem.orientation()"

    :value="value"
    type="button"

    @mousedown="rovingFocusGroupItem.onMousedown"
    @focus="rovingFocusGroupItem.onFocus"
    @keydown="rovingFocusGroupItem.onKeydown"
  >
    <slot />
  </ToggleGroupItem>
</template>
