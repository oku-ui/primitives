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
  'update:modelValue': [pressed: boolean]
  pressedChange: [pressed: boolean]
  click: [event: MouseEvent]
}
</script>

<script setup lang="ts">
import { computed, defineOptions } from 'vue'
import { useComponentRef, useControllable, useVModel } from '@oku-ui/use-composable'
import { composeEventHandlers } from '@oku-ui/utils'
import { Primitive } from '@oku-ui/primitive'

defineOptions({
  name: 'OkuToggle',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ToggleProps>(), {
  pressed: undefined,
  defaultPressed: false,
  disabled: false,
})

const emits = defineEmits<ToggleEmits>()

const { componentRef } = useComponentRef<HTMLButtonElement | null>()

const modelValue = useVModel(props, 'pressed', emits)

const [pressed, setPressed] = useControllable({
  prop: computed(() => modelValue.value),
  defaultProp: computed(() => props.defaultPressed),
  onChange: (result) => {
    emits('pressedChange', result)
    emits('update:modelValue', result)
  },
  initialValue: false,
})
</script>

<template>
  <Primitive
    is="button"
    v-bind="$attrs"
    ref="componentRef"
    type="button"
    :aria-pressed="pressed"
    :data-state="pressed ? 'on' : 'off'"
    :data-disabled="props.disabled ? '' : undefined"
    @click="composeEventHandlers<ToggleEmits['click'][0]>((event) => {
      emits('click', event)
    }, () => {
      if (!props.disabled)
        setPressed(!pressed)
    })($event)"
  >
    <slot />
  </Primitive>
</template>
