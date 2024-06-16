<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { RovingFocusItem } from '../roving-focus/index.ts'
import { Toggle } from '../toggle/index.ts'
import type { ToggleGroupItemProps } from './ToggleGroupItem.ts'
import { useToggleGroupContext } from './ToggleGroup.ts'

defineOptions({
  name: 'ToggleGroupItem',
  inheritAttrs: false,
})

const props = defineProps<ToggleGroupItemProps>()
const attrs = useAttrs()

const context = useToggleGroupContext()
const pressed = computed(() => context.value.value?.includes(props.value))
const disabled = computed(() => context.disabled?.value || props.disabled)

const typeProps = computed(() => {
  if (context.type.value === 'single')
    return { 'role': 'radio', 'aria-checked': props.pressed, 'aria-pressed': undefined }

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
  <RovingFocusItem
    v-if="context.rovingFocus.value"
    as-child
    :focusable="!disabled"
    :active="pressed"
  >
    <Toggle
      :as="as"
      :as-child="asChild"
      v-bind="{
        ...attrs,
        ...typeProps,
      }"
      :pressed="pressed"
      :disabled="disabled"
      @update:pressed="onUpdatePressed"
    >
      <slot />
    </Toggle>
  </RovingFocusItem>
  <Toggle
    v-else
    :as="as"
    :as-child="asChild"
    v-bind="{
      ...attrs,
      ...typeProps,
    }"
    :pressed="pressed"
    :disabled="disabled"
    @update:pressed="onUpdatePressed"
  >
    <slot />
  </Toggle>
</template>
