<script setup lang="ts">
import { ITEM_DATA_ATTR } from '../collection/index.ts'
import { useComposedElements } from '../hooks/useComposedElements.ts'
import { useRovingFocusGroupItem } from '../roving-focus/RovingFocusGroupItem.ts'
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
  rovingFocusGroupItem.useCollectionItem(v, rovingFocusGroupItem.itemData)
})
</script>

<template>
  <ToggleGroupItem
    :ref="forwardElement"
    :value="value"
    type="button"
    :tabindex="rovingFocusGroupItem.tabindex()"
    :data-orientation="rovingFocusGroupItem.orientation()"
    :[ITEM_DATA_ATTR]="true"
    @mousedown="rovingFocusGroupItem.onMousedown"
    @focus="rovingFocusGroupItem.onFocus"
    @keydown="rovingFocusGroupItem.onKeydown"
  >
    <slot />
  </ToggleGroupItem>
</template>
