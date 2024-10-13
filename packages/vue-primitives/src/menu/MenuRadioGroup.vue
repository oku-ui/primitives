<script setup lang="ts">
import { Primitive } from '../primitive/Primitive.ts'
import { type MenuRadioGroupEmits, type MenuRadioGroupProps, useMenuRadioGroup } from './MenuRadioGroup.ts'

defineOptions({
  name: 'MenuRadioGroup',
})

const props = defineProps<MenuRadioGroupProps>()

const emit = defineEmits<MenuRadioGroupEmits>()

useMenuRadioGroup({
  value() {
    return props.value
  },
  onUpdateValue(value) {
    emit('update:value', value)
  },
})
</script>

<template>
  <Primitive role="group">
    <slot />
  </Primitive>
</template>
