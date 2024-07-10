<script setup lang="ts">
import { useAttrs } from 'vue'
import { Primitive } from '../primitive/index.ts'
import { useControllableState } from '../hooks/index.ts'
import { composeEventHandlers } from '../utils/composeEventHandlers.ts'
import { isFunction, isPropFalsy } from '../utils/is.ts'
import type { ToggleEmits, ToggleProps } from './Toggle.ts'

defineOptions({
  name: 'Toggle',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ToggleProps>(), {
  pressed: undefined,
  as: 'button',
})
const emit = defineEmits<ToggleEmits>()
const attrs = useAttrs()

const pressed = useControllableState(props, v => emit('update:pressed', v), 'pressed', props.defaultPressed)

const onClick = composeEventHandlers((event: Event) => {
  isFunction(attrs.onClick) && attrs.onClick(event)
}, () => {
  if (isPropFalsy(attrs.disabled))
    pressed.value = !pressed.value
})
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    type="button"
    :aria-pressed="pressed"
    v-bind="{
      ...attrs,
      onClick,
    }"
    :data-state="pressed ? 'on' : 'off'"
    :data-disabled="attrs.disabled"
  >
    <slot />
  </Primitive>
</template>
