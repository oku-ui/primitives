<script setup lang="ts">
import { computed } from 'vue'
import type { TabsTriggerEmits, TabsTriggerProps } from './TabsTrigger'
import { OkuRovingFocusGroupItem } from '@oku-ui/roving-focus'
import { useRovingFocusGroupScope, useTabsContext } from './Tabs'
import { Primitive } from '@oku-ui/primitive'
import { TAB_TRIGGER_NAME } from './constants'
import { makeContentId, makeTriggerId } from './utils'
import { composeEventHandlers } from '@oku-ui/utils'
import { usePrimitiveElement } from '@oku-ui/use-composable'

defineOptions({
  name: TAB_TRIGGER_NAME,
  inheritAttrs: false,
})

const props = withDefaults(defineProps<TabsTriggerProps>(), {
  disabled: false,
  is: 'button',
})
const emit = defineEmits<TabsTriggerEmits>()

const [$el, forwardedRef] = usePrimitiveElement()
const context = useTabsContext(TAB_TRIGGER_NAME, props.scopeOkuTabs)

const rovingFocusGroupScope = useRovingFocusGroupScope(props.scopeOkuTabs)
const triggerId = makeTriggerId(context.baseId, props.value)
const contentId = makeContentId(context.baseId, props.value)
const isSelected = computed(() => props.value === context.value.value)

const mousedownHandler = composeEventHandlers<MouseEvent>((e) => {
  emit('mousedown', e)
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

const keydownHandler = composeEventHandlers<KeyboardEvent>((e) => {
  emit('keydown', e)
}, (event) => {
  if ([' ', 'Enter'].includes(event.key))
    context.onValueChange(props.value)
})

function focusHandler() {
  // handle 'automatic' activation if necessary
  // ie. activate tab following focus
  const isAutomaticActivation = context.activationMode?.value !== 'manual'
  if (!isSelected.value && !props.disabled && isAutomaticActivation)
    context.onValueChange(props.value)
}

defineExpose({
  $el,
})
</script>

<template>
  <OkuRovingFocusGroupItem v-bind="rovingFocusGroupScope" as-child :focusable="!disabled" :active="isSelected">
    <Primitive
      :is="is"
      :id="triggerId"
      :ref="forwardedRef"
      role="tab"
      :type="is === 'button' ? 'button' : undefined"
      :as-child="asChild"
      :aria-selected="isSelected"
      :aria-controls="contentId"
      :data-state="isSelected ? 'active' : 'inactive'"
      :data-disabled="disabled ? '' : undefined"
      :disabled="disabled"
      v-bind="$attrs"
      @mousedown="mousedownHandler"
      @keydown="keydownHandler"
      @focus="focusHandler"
    >
      <slot />
    </Primitive>
  </OkuRovingFocusGroupItem>
</template>
