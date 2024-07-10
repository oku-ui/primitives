<script setup lang="ts">
import { shallowRef, useAttrs } from 'vue'
import { useDirection } from '../direction/index.ts'
import { useControllableState, useTemplateElRef } from '../hooks/index.ts'
import { Primitive } from '../primitive/index.ts'
import { RovingFocusGroup } from '../roving-focus/index.ts'
import { type RadioGroupEmits, type RadioGroupProps, provideRadioGroupContext } from './RadioGroup.ts'

defineOptions({
  name: 'RadioGroup',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<RadioGroupProps>(), {
  disabled: false,
  required: false,
  loop: true,
})
const emit = defineEmits<RadioGroupEmits>()
const attrs = useAttrs()
const elRef = shallowRef<HTMLElement>()
const setElRef = useTemplateElRef(elRef)

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
  $el: elRef,
})
</script>

<template>
  <RovingFocusGroup
    as-child
    :orientation="orientation"
    :dir="direction"
    :loop="loop"
  >
    <Primitive
      :ref="setElRef"
      :as="as"
      :as-child="asChild"
      role="radiogroup"
      :aria-required="required"
      :aria-orientation="orientation"
      :data-disabled="disabled ? '' : undefined"
      :dir="direction"
      v-bind="attrs"
    >
      <slot />
    </Primitive>
  </RovingFocusGroup>
</template>
