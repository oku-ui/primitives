<script setup lang="ts">
import { computed, shallowRef, useAttrs } from 'vue'
import { Primitive } from '../primitive/index.ts'
import { RovingFocusItem } from '../roving-focus/index.ts'
import { composeEventHandlers } from '../utils/composeEventHandlers.ts'
import { useTabsContext } from './Tabs.ts'
import { makeContentId, makeTriggerId } from './utils.ts'
import type { TabsTriggerProps } from './TabsTrigger.ts'

defineOptions({
  name: 'TabsTrigger',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<TabsTriggerProps>(), {
  as: 'button',
})
const attrs = useAttrs()

const elRef = shallowRef<HTMLElement>()

const context = useTabsContext()
const triggerId = computed(() => makeTriggerId(context.baseId, props.value))
const contentId = computed(() => makeContentId(context.baseId, props.value))
const isSelected = computed(() => context.value.value === props.value)

const onMousedown = composeEventHandlers<MouseEvent>((event) => {
  (attrs.onMousedown as Function | undefined)?.(event)
}, (event) => {
  // only call handler if it's the left button (mousedown gets triggered by all mouse buttons)
  // but not when the control key is pressed (avoiding MacOS right click)
  if (!attrs.disabled && event.button === 0 && event.ctrlKey === false) {
    context.onValueChange(props.value)
  }
  else {
    // prevent focus to avoid accidental activation
    event.preventDefault()
  }
})

const onKeydown = composeEventHandlers<KeyboardEvent>((event) => {
  (attrs.onKeydown as Function | undefined)?.(event)
}, (event) => {
  if ([' ', 'Enter'].includes(event.key))
    context.onValueChange(props.value)
})

const onFocus = composeEventHandlers<FocusEvent>((event) => {
  (attrs.onFocus as Function | undefined)?.(event)
}, () => {
  // handle "automatic" activation if necessary
  // ie. activate tab following focus
  const isAutomaticActivation = context.activationMode !== 'manual'
  if (!isSelected.value && !attrs.disabled && isAutomaticActivation) {
    context.onValueChange(props.value)
  }
})

defineExpose({
  $el: elRef,
})
</script>

<template>
  <RovingFocusItem as-child :focusable="!attrs.disabled" :active="isSelected">
    <Primitive
      :id="triggerId"
      :ref="(el: any) => {
        const node = (el?.$el ?? el)
        elRef = node?.hasAttribute ? node : undefined
      }"
      :as="as"
      :as-child="asChild"
      v-bind="{
        ...attrs,
        onMousedown,
        onKeydown,
        onFocus,
      }"
      type="button"
      role="tab"
      :aria-selected="isSelected"
      :aria-controls="contentId"
      :data-state="isSelected ? 'active' : 'inactive'"
      :data-disabled="attrs.disabled ? '' : undefined"
      :disabled="attrs.disabled"
    >
      <slot />
    </Primitive>
  </RovingFocusItem>
</template>
