<script setup lang="ts">
import { computed } from 'vue'
import { RovingFocusGroupItem } from '../roving-focus/index.ts'
import { Toggle } from '../toggle/index.ts'
import type { ToggleGroupItemProps } from './ToggleGroupItem.ts'
import { useToggleGroupContext } from './ToggleGroupRoot.ts'

defineOptions({
  name: 'ToggleGroupItem',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ToggleGroupItemProps>(), {
  disabled: undefined,
})

const context = useToggleGroupContext('ToggleGroupItem')
const pressed = computed(() => context.value.value?.includes(props.value))
const disabled = computed(() => context.disabled() || props.disabled)

const typeProps = computed(() => {
  if (context.type() === 'single') {
    return {
      'role': 'radio',
      'aria-checked': pressed.value,
      'aria-pressed': undefined,
    }
  }

  return {}
})

function onUpdatePressed(pressed?: boolean) {
  if (pressed) {
    context.onItemActivate(props.value)
  }
  else {
    context.onItemDeactivate(props.value)
  }
}
</script>

<template>
  <RovingFocusGroupItem
    v-if="context.rovingFocus()"
    as="template"
    :focusable="!disabled"
    :active="pressed"
  >
    <Toggle
      v-bind="{
        ...$attrs,
        ...typeProps,
      }"
      :pressed="pressed"
      :disabled="disabled"
      @update:pressed="onUpdatePressed"
    >
      <slot />
    </Toggle>
  </RovingFocusGroupItem>
  <Toggle
    v-else
    v-bind="{
      ...$attrs,
      ...typeProps,
    }"
    :pressed="pressed"
    :disabled="disabled"
    @update:pressed="onUpdatePressed"
  >
    <slot />
  </Toggle>
</template>
