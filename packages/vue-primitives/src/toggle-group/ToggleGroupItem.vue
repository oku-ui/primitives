<script setup lang="ts">
import type { ToggleGroupItemEmits, ToggleGroupItemProps } from './ToggleGroupItem.ts'
import { computed } from 'vue'
import { Primitive } from '../primitive/index.ts'
import { RovingFocusGroupItem } from '../roving-focus/index.ts'
import { composeEventHandlers } from '../utils/vue.ts'
import { useToggleGroupContext } from './ToggleGroupRoot.ts'

defineOptions({
  name: 'ToggleGroupItem',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ToggleGroupItemProps>(), {
  as: 'button',
  disabled: undefined,
})
const emit = defineEmits<ToggleGroupItemEmits>()

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

const onClick = composeEventHandlers<MouseEvent>((event) => {
  emit('click', event)
}, () => {
  if (props.disabled)
    return

  if (!pressed.value)
    context.onItemActivate(props.value)
  else
    context.onItemDeactivate(props.value)
})
</script>

<template>
  <RovingFocusGroupItem
    v-if="context.rovingFocus()"
    :as="as"
    :focusable="!disabled"
    :active="pressed"
    v-bind="{ ...$attrs, ...typeProps }"
    type="button"
    :aria-pressed="pressed"
    :data-state="pressed ? 'on' : 'off'"
    :disabled="disabled"
    :data-disabled="disabled"
    @click="onClick"
  >
    <slot />
  </RovingFocusGroupItem>
  <Primitive
    v-else
    :as="as"
    v-bind="{ ...$attrs, ...typeProps }"
    type="button"
    :aria-pressed="pressed"
    :data-state="pressed ? 'on' : 'off'"
    :disabled="disabled"
    :data-disabled="disabled"
    :pressed="pressed"
    @click="onClick"
  >
    <slot />
  </Primitive>
</template>
