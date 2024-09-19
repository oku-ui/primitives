<script setup lang="ts">
import type { ToolbarLinkEmits, ToolbarLinkProps } from './ToolbarLink.ts'
import { DATA_COLLECTION_ITEM } from '../collection/index.ts'
import { useComposedElements } from '../hooks/index.ts'
import { Primitive } from '../primitive/index.ts'
import { useRovingFocusGroupItem } from '../roving-focus/index.ts'
import { composeEventHandlers } from '../shared/index.ts'

defineOptions({
  name: 'ToolbarLink',
})

withDefaults(defineProps<ToolbarLinkProps>(), {
  as: 'a',
})
const emit = defineEmits<ToolbarLinkEmits>()

const onKeydown = composeEventHandlers<KeyboardEvent>((event) => {
  emit('keydown', event)
}, (event: KeyboardEvent) => {
  if (event.key === ' ') {
    (event.currentTarget as HTMLElement).click()
  }
})

const rovingFocusGroupItem = useRovingFocusGroupItem({
  focusable: true,
}, {
  onMousedown(event) {
    emit('mousedown', event)
  },
  onKeydown,
  onFocus(event) {
    emit('focus', event)
  },
})

const forwardElement = useComposedElements((v) => {
  rovingFocusGroupItem.useCollectionItem(v, rovingFocusGroupItem.itemData, rovingFocusGroupItem.collectionKey)
})
</script>

<template>
  <Primitive
    :ref="forwardElement"
    :as="as"
    :[DATA_COLLECTION_ITEM]="true"

    :tabindex="rovingFocusGroupItem.tabindex()"
    :data-orientation="rovingFocusGroupItem.orientation()"

    @mousedown="rovingFocusGroupItem.onMousedown"
    @focus="rovingFocusGroupItem.onFocus"
    @keydown="rovingFocusGroupItem.onKeydown"
  >
    <slot />
  </Primitive>
</template>
