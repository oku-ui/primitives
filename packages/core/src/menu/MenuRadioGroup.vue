<script setup lang="ts">
import type { EmitsToHookProps } from '../shared/index.ts'
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps } from '../shared/index.ts'
import { type MenuRadioGroupEmits, type MenuRadioGroupProps, useMenuRadioGroup } from './MenuRadioGroup.ts'

defineOptions({
  name: 'MenuRadioGroup',
})

const props = defineProps<MenuRadioGroupProps>()

const emit = defineEmits<MenuRadioGroupEmits>()

useMenuRadioGroup(convertPropsToHookProps(
  props,
  ['value'],
  (): Required<EmitsToHookProps<MenuRadioGroupEmits>> => ({
    onUpdateValue(value) {
      emit('update:value', value)
    },
  }),
))
</script>

<template>
  <Primitive role="group">
    <slot />
  </Primitive>
</template>
