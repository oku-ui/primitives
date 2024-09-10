<script setup lang="ts">
import { computed } from 'vue'
import { DATA_COLLECTION_ITEM } from '../collection/index.ts'
import { useComposedElements } from '../hooks/index.ts'
import { Primitive } from '../primitive/index.ts'
import { useRovingFocusGroupItem } from '../roving-focus/index.ts'
import { composeEventHandlers } from '../utils/vue.ts'
import { useTabsContext } from './TabsRoot.ts'
import { makeContentId, makeTriggerId } from './utils.ts'
import type { TabsTriggerEmits, TabsTriggerProps } from './TabsTrigger.ts'

defineOptions({
  name: 'TabsTrigger',
})

const props = withDefaults(defineProps<TabsTriggerProps>(), {
  as: 'button',
  disabled: undefined,
})
const emit = defineEmits<TabsTriggerEmits>()

const context = useTabsContext('TabsTrigger')
const triggerId = computed(() => makeTriggerId(context.baseId, props.value))
const contentId = computed(() => makeContentId(context.baseId, props.value))
const isSelected = computed(() => context.value.value === props.value)

const onMousedown = composeEventHandlers<MouseEvent>((event) => {
  emit('mousedown', event)
}, (event) => {
  // only call handler if it's the left button (mousedown gets triggered by all mouse buttons)
  // but not when the control key is pressed (avoiding MacOS right click)
  if (!props.disabled && event.button === 0 && event.ctrlKey === false) {
    context.onValueChange(props.value)
  }
  else {
    // prevent focus to avoid accidental activation
    event.preventDefault()
  }
})

const onKeydown = composeEventHandlers<KeyboardEvent>((event) => {
  emit('keydown', event)
}, (event) => {
  if ([' ', 'Enter'].includes(event.key))
    context.onValueChange(props.value)
})

const onFocus = composeEventHandlers<FocusEvent>((event) => {
  emit('focus', event)
}, () => {
  // handle "automatic" activation if necessary
  // ie. activate tab following focus
  const isAutomaticActivation = context.activationMode !== 'manual'
  if (!isSelected.value && !props.disabled && isAutomaticActivation) {
    context.onValueChange(props.value)
  }
})

const rovingFocusGroupItem = useRovingFocusGroupItem({
  focusable() {
    return !props.disabled
  },
  active() {
    return isSelected.value
  },
}, {
  onMousedown,
  onKeydown,
  onFocus,
})

const forwardElement = useComposedElements((v) => {
  rovingFocusGroupItem.useCollectionItem(v, rovingFocusGroupItem.itemData)
})
</script>

<template>
  <Primitive
    :id="triggerId"
    :ref="forwardElement"
    :as="as"
    :[DATA_COLLECTION_ITEM]="true"

    :tabindex="rovingFocusGroupItem.tabindex()"
    :data-orientation="rovingFocusGroupItem.orientation()"

    type="button"
    role="tab"
    :aria-selected="isSelected"
    :aria-controls="contentId"
    :data-state="isSelected ? 'active' : 'inactive'"
    :data-disabled="disabled"
    :disabled="disabled"

    @mousedown="rovingFocusGroupItem.onMousedown"
    @focus="rovingFocusGroupItem.onFocus"
    @keydown="rovingFocusGroupItem.onKeydown"
  >
    <slot />
  </Primitive>
</template>
