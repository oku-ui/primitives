<script setup lang="ts">
import { shallowRef } from 'vue'
import { useDirection } from '../direction/index.ts'
import { useControllableState, useForwardElement } from '../hooks/index.ts'
import { Primitive } from '../primitive/index.ts'
import { RovingFocusGroupRoot } from '../roving-focus/index.ts'
import { type RadioGroupRootEmits, type RadioGroupRootProps, provideRadioGroupContext } from './RadioGroupRoot.ts'

defineOptions({
  name: 'RadioGroup',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<RadioGroupRootProps>(), {
  disabled: false,
  required: false,
  loop: true,
})
const emit = defineEmits<RadioGroupRootEmits>()
const $el = shallowRef<HTMLElement>()
const forwardElement = useForwardElement($el)

const direction = useDirection(() => props.dir)

const value = useControllableState(props, v => emit('update:value', v), 'value', props.defaultValue)

provideRadioGroupContext({
  name() {
    return props.name
  },
  required() {
    return props.loop
  },
  disabled() {
    return props.disabled
  },
  value,
  onValueChange(v) {
    value.value = v
  },
})

defineExpose({
  $el,
})
</script>

<template>
  <RovingFocusGroupRoot
    as-child
    :orientation="orientation"
    :dir="direction"
    :loop="loop"
  >
    <Primitive
      :ref="forwardElement"
      role="radiogroup"
      :aria-required="required"
      :aria-orientation="orientation"
      :data-disabled="disabled ? '' : undefined"
      :dir="direction"
      v-bind="$attrs"
    >
      <slot />
    </Primitive>
  </RovingFocusGroupRoot>
</template>
