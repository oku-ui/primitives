<script setup lang="ts" generic="T extends ToggleGroupType">
import { computed, toRef, useAttrs } from 'vue'
import { type ToggleGroupEmits, type ToggleGroupProps, type ToggleGroupType, provideToggleGroupContext } from './ToggleGroup.ts'
import { useControllableState } from '~/hooks/useControllableState.ts'
import { useDirection } from '~/direction/Direction.ts'
import { RovingFocusGroup } from '~/roving-focus/index.ts'
import { Primitive } from '~/primitive/index.ts'
import { arrayify } from '~/utils/array.ts'

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
const attrs = useAttrs()

const value = useControllableState(props, emit, 'value', props.defaultValue)

const TYPE_SINGLE = 'single' as const satisfies ToggleGroupType
type SingleValue = NonNullable<ToggleGroupProps<'single'>['value']>
type MultipleValue = NonNullable<ToggleGroupProps<'multiple'>['value']>
type Value = T extends 'single' ? SingleValue : MultipleValue

const direction = useDirection(() => props.dir)

provideToggleGroupContext({
  type: toRef(props, 'type'),
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
  rovingFocus: toRef(props, 'rovingFocus'),
  disabled: toRef(props, 'disabled'),
})
</script>

<template>
  <RovingFocusGroup
    v-if="rovingFocus"
    as-child
    :orientation="orientation"
    :dir="direction"
    :loop="loop"
  >
    <Primitive
      :as="as"
      :as-child="asChild"
      v-bind="attrs"
      role="group"
      :dir="direction"
    >
      <slot />
    </Primitive>
  </RovingFocusGroup>
  <Primitive
    v-else
    :as="as"
    :as-child="asChild"
    v-bind="attrs"
    role="group"
    :dir="direction"
  >
    <slot />
  </Primitive>
</template>
