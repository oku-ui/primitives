<script setup lang="ts">
import { useDirection } from '../direction/index.ts'
import { useControllableState, useForwardElement, useRef } from '../hooks/index.ts'
import { Primitive } from '../primitive/index.ts'
import { useRovingFocusGroupRoot } from '../roving-focus/index.ts'
import { provideRadioGroupContext, type RadioGroupRootEmits, type RadioGroupRootProps } from './RadioGroupRoot.ts'

defineOptions({
  name: 'RadioGroup',
})

const props = withDefaults(defineProps<RadioGroupRootProps>(), {
  disabled: false,
  required: false,
  loop: true,
})
const emit = defineEmits<RadioGroupRootEmits>()
const elRef = useRef<HTMLElement>()
const forwardElement = useForwardElement(elRef)

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

const rovingFocusGroupRoot = useRovingFocusGroupRoot(elRef, {
  currentTabStopId: undefined,
  orientation() {
    return props.orientation
  },
  loop() {
    return props.loop
  },
  dir: direction,
}, {
  onMousedown(event) {
    emit('mousedown', event)
  },
  onFocus(event) {
    emit('focus', event)
  },
  onFocusout(event) {
    emit('focusout', event)
  },
})
</script>

<template>
  <Primitive
    :ref="forwardElement"

    :dir="direction"
    :tabindex="rovingFocusGroupRoot.tabindex()"
    :data-orientation="orientation"
    style="outline: none;"

    role="radiogroup"
    :aria-required="required"
    :aria-orientation="orientation"
    :data-disabled="disabled ? '' : undefined"

    @mousedown="rovingFocusGroupRoot.onMousedown"
    @focus="rovingFocusGroupRoot.onFocus"
    @focusout="rovingFocusGroupRoot.onFocusout"
  >
    <slot />
  </Primitive>
</template>
