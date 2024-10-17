<script lang="ts">
import type { PrimitiveProps } from '@oku-ui/primitive'

export interface ToggleProps extends PrimitiveProps {
  /**
   * The controlled state of the toggle.
   */
  pressed?: boolean
  /**
   * The state of the toggle when initially rendered. Use `defaultPressed`
   * if you do not need to control the state of the toggle.
   * @defaultValue false
   */
  defaultPressed?: boolean
  disabled?: boolean
}

export type ToggleEmits = {
  /**
   * The callback that fires when the state of the toggle changes.
   */
  'update:pressed': [pressed: boolean]
  'pressedChange': [pressed: boolean]
  'click': [event: MouseEvent]
}

</script>

<script setup lang="ts">
import { Primitive } from '@oku-ui/primitive'
import { useComponentRef, useVModel } from '@oku-ui/use-composable'
import { composeEventHandlers } from '@oku-ui/utils'
import { defineOptions } from 'vue'

defineOptions({
  name: 'OkuToggle',
})

const props = withDefaults(defineProps<ToggleProps>(), {
  pressed: undefined,
  defaultPressed: false,
  disabled: false,
  is: 'button',
})

const emits = defineEmits<ToggleEmits>()

const { componentRef, currentElement } = useComponentRef<HTMLButtonElement | null>()

const pressed = useVModel(props, 'pressed', emits, {
  defaultValue: props.defaultPressed,
  passive: (props.pressed === undefined) as false,
  shouldEmit(v: any) {
    emits('pressedChange', v)
    return true
  },
})

defineExpose({
  $el: currentElement,
})
</script>

<template>
  <Primitive
    :is="props.is"
    ref="componentRef"
    :as-child="props.asChild"
    :disabled="props.disabled"
    type="button"
    :aria-pressed="pressed"
    :data-state="pressed ? 'on' : 'off'"
    :data-disabled="props.disabled ? '' : undefined"
    @click="composeEventHandlers<ToggleEmits['click'][0]>((event) => {
      emits('click', event)
    }, () => {
      if (!props.disabled)
        pressed = !pressed
    })($event)"
  >
    <slot />
  </Primitive>
</template>
