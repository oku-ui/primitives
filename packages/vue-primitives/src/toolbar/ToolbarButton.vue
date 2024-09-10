<script setup lang="ts">
import { DATA_COLLECTION_ITEM } from '../collection/index.ts'
import { useComposedElements } from '../hooks/index.ts'
import { Primitive } from '../primitive/index.ts'
import { useRovingFocusGroupItem } from '../roving-focus/index.ts'
import type { ToolbarButtonEmits, ToolbarButtonProps } from './ToolbarButton.ts'

defineOptions({
  name: 'ToolbarButton',
})

const props = withDefaults(defineProps<ToolbarButtonProps>(), {
  as: 'button',
  disabled: undefined,
})

const emit = defineEmits<ToolbarButtonEmits>()

const rovingFocusGroupItem = useRovingFocusGroupItem({
  focusable() {
    return !props.disabled
  },
}, {
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
  <Primitive
    :ref="forwardElement"
    :as="as"
    :[DATA_COLLECTION_ITEM]="true"

    :tabindex="rovingFocusGroupItem.tabindex()"
    :data-orientation="rovingFocusGroupItem.orientation()"

    type="button"
    :disabled="disabled"

    @mousedown="rovingFocusGroupItem.onMousedown"
    @focus="rovingFocusGroupItem.onFocus"
    @keydown="rovingFocusGroupItem.onKeydown"
  >
    <slot />
  </Primitive>
</template>
