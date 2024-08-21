<script setup lang="ts">
import { computed, shallowRef, useAttrs } from 'vue'
import { Primitive } from '../primitive/index.ts'
import { RovingFocusGroupItem } from '../roving-focus/index.ts'
import { composeEventHandlers, forwardRef } from '../utils/vue.ts'
import { isFunction, isPropFalsy } from '../utils/is.ts'
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
const $el = shallowRef<HTMLElement>()
const forwardedRef = forwardRef($el)

const context = useTabsContext()
const triggerId = computed(() => makeTriggerId(context.baseId, props.value))
const contentId = computed(() => makeContentId(context.baseId, props.value))
const isSelected = computed(() => context.value.value === props.value)

const onMousedown = composeEventHandlers<MouseEvent>((event) => {
  if (isFunction(attrs.onMousedown))
    attrs.onMousedown(event)
}, (event) => {
  // only call handler if it's the left button (mousedown gets triggered by all mouse buttons)
  // but not when the control key is pressed (avoiding MacOS right click)
  if (isPropFalsy(attrs.disabled) && event.button === 0 && event.ctrlKey === false) {
    context.onValueChange(props.value)
  }
  else {
    // prevent focus to avoid accidental activation
    event.preventDefault()
  }
})

const onKeydown = composeEventHandlers<KeyboardEvent>((event) => {
  if (isFunction(attrs.onKeydown))
    attrs.onKeydown(event)
}, (event) => {
  if ([' ', 'Enter'].includes(event.key))
    context.onValueChange(props.value)
})

const onFocus = composeEventHandlers<FocusEvent>((event) => {
  if (isFunction(attrs.onFocus))
    attrs.onFocus(event)
}, () => {
  // handle "automatic" activation if necessary
  // ie. activate tab following focus
  const isAutomaticActivation = context.activationMode !== 'manual'
  if (!isSelected.value && isPropFalsy(attrs.disabled) && isAutomaticActivation) {
    context.onValueChange(props.value)
  }
})

defineExpose({
  $el,
})
</script>

<template>
  <RovingFocusGroupItem as-child :focusable="isPropFalsy(attrs.disabled)" :active="isSelected">
    <Primitive
      :id="triggerId"
      :ref="forwardedRef"
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
      :data-disabled="attrs.disabled"
      :disabled="attrs.disabled"
    >
      <slot />
    </Primitive>
  </RovingFocusGroupItem>
</template>
