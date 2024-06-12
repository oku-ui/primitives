<script setup lang="ts">
import { useAttrs } from 'vue'
import type { ToggleEmits, ToggleProps } from './Toggle.ts'
import { Primitive } from '~/primitive/index.ts'
import { useControllableState } from '~/hooks/useControllableState.ts'
import { composeEventHandlers } from '~/utils/composeEventHandlers.ts'

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

const pressed = useControllableState(props, emit, 'pressed', props.defaultPressed)

const onClick = composeEventHandlers((event: Event) => {
  ;(attrs.onClick as Function | undefined)?.(event)
}, () => {
  if (!attrs.disabled)
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
      ...$attrs,
      onClick,
    }"
    :data-state="pressed ? 'on' : 'off'"
    :data-disabled="$attrs.disabled ? '' : undefined"
  >
    <slot /> {{ pressed }}
  </Primitive>
</template>
