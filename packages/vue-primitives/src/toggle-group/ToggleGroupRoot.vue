<script setup lang="ts" generic="T extends ToggleGroupType">
import { useDirection } from '@oku-ui/direction'
import { useControllableState } from '@oku-ui/hooks'
import { Primitive } from '@oku-ui/primitive'
import { arrayify } from '@oku-ui/shared'
import { computed } from 'vue'
import { RovingFocusGroupRoot } from '../roving-focus/index.ts'
import { provideToggleGroupContext, type ToggleGroupEmits, type ToggleGroupProps, type ToggleGroupType } from './ToggleGroupRoot.ts'

type SingleValue = Exclude<ToggleGroupProps<'single'>['value'], undefined>
type MultipleValue = Exclude<ToggleGroupProps<'multiple'>['value'], undefined>
type Value = T extends 'single' ? SingleValue : MultipleValue

defineOptions({
  name: 'ToggleGroup',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ToggleGroupProps<T>>(), {
  disabled: false,
  rovingFocus: true,
  loop: true,
})
const emit = defineEmits<ToggleGroupEmits<T>>()

const defaultValue = props.type === 'single' ? props.defaultValue : props.defaultValue ?? [] as string[]
const value = useControllableState(props, 'value', v => emit('update:value', v as Value), defaultValue)

const TYPE_SINGLE = 'single' as const satisfies ToggleGroupType

const direction = useDirection(() => props.dir)

provideToggleGroupContext({
  type() {
    return props.type
  },
  value: computed(() => {
    if (props.type === TYPE_SINGLE)
      return typeof value.value === 'string' ? [value.value] : []
    return Array.isArray(value.value) ? value.value : []
  }),
  onItemActivate(itemValue) {
    if (props.type === TYPE_SINGLE) {
      value.value = itemValue as Value
    }
    else {
      value.value = [...arrayify<SingleValue>(value.value || []), itemValue] as Value
    }
  },
  onItemDeactivate(itemValue) {
    if (props.type === TYPE_SINGLE) {
      value.value = '' as Value
    }
    else {
      value.value = arrayify<SingleValue>(value.value || []).filter(value => value !== itemValue) as Value
    }
  },
  rovingFocus() {
    return props.rovingFocus
  },
  disabled() {
    return props.disabled
  },
})
</script>

<template>
  <RovingFocusGroupRoot
    v-if="rovingFocus"
    :orientation="orientation"
    :dir="direction"
    :loop="loop"
    role="group"
    v-bind="$attrs"
  >
    <slot />
  </RovingFocusGroupRoot>
  <Primitive
    v-else
    v-bind="$attrs"
    role="group"
    :dir="direction"
  >
    <slot />
  </Primitive>
</template>
