<script setup lang="ts">
import MenuGroup from './MenuGroup.vue'
import { type MenuRadioGroupEmits, type MenuRadioGroupProps, providRadioGroupContext } from './MenuRadioGroup.ts'

defineOptions({
  name: 'MenuRadioGroup',
})

const props = defineProps<MenuRadioGroupProps>()

const emit = defineEmits<MenuRadioGroupEmits>()

providRadioGroupContext({
  value() {
    return props.value
  },
  onValueChange(value) {
    emit('update:value', value)
  },
})
</script>

<template>
  <MenuGroup>
    <slot />
  </MenuGroup>
</template>
