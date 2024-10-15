<script setup lang="ts">
import { toRef } from 'vue'
import { OkuRovingFocusGroup } from '@oku-ui/roving-focus'
import { usePrimitiveElement, useVModel } from '@oku-ui/use-composable'
import { useDirection } from '@oku-ui/direction'
import { type RadioGroupEmits, type RadioGroupProps, useRovingFocusGroupScope } from './RadioGroup'
import { provideRadioGroupContext } from './RadioGroup'
import { RADIO_GROUP_NAME } from './constants'
import { Primitive } from '@oku-ui/primitive'

defineOptions({
  name: RADIO_GROUP_NAME,
  inheritAttrs: false,
})

const props = defineProps<RadioGroupProps>()
const emit = defineEmits<RadioGroupEmits>()

const [$el, setForwardRef] = usePrimitiveElement()
const rovingFocusGroupScope = useRovingFocusGroupScope(props.scopeOkuRadioGroup)
const direction = useDirection(() => props.dir)

const state = useVModel(props, 'value', emit, {
  defaultValue: props.defaultValue,
  passive: true,
})

provideRadioGroupContext({
  scope: props.scopeOkuRadioGroup,
  name: toRef(props, 'name'),
  required: toRef(props, 'required'),
  disabled: toRef(props, 'disabled'),
  value: state,
  onValueChange(value: string) {
    state.value = value
  },
})

defineExpose({
  $el,
})
</script>

<template>
  <OkuRovingFocusGroup
    :is="is"
    :as-child="asChild"
    :orientation="orientation"
    :dir="direction"
    :loop="loop"
    v-bind="rovingFocusGroupScope"
  >
    <Primitive
      :is="is"
      :ref="setForwardRef"
      :as-child="asChild"
      role="radiogroup"
      :aria-required="required"
      :aria-orientation="orientation"
      :data-disabled="disabled ? '' : undefined"
      :dir="direction"
      v-bind="$attrs"
    >
      <slot />
    </Primitive>
  </OkuRovingFocusGroup>
</template>
