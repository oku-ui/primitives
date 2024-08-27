<script setup lang="ts">
import { useControllableState, useId } from '../hooks/index.ts'
import { useDirection } from '../direction/Direction.ts'
import { Primitive } from '../primitive/index.ts'
import { type TabsEmits, type TabsProps, provideTabsContext } from './TabsRoot.ts'

defineOptions({
  name: 'TabsRoot',
})

const props = withDefaults(defineProps<TabsProps>(), {
  orientation: 'horizontal',
  activationMode: 'automatic',
})

const emit = defineEmits<TabsEmits>()

const direction = useDirection(() => props.dir)

const value = useControllableState(props, v => emit('update:value', v), 'value', props.defaultValue)

provideTabsContext({
  baseId: useId(),
  value,
  onValueChange(newValue) {
    value.value = newValue
  },
  orientation: props.orientation,
  dir: direction,
  activationMode: props.activationMode,
})
</script>

<template>
  <Primitive
    :dir="direction"
    :data-orientation="orientation"
  >
    <slot />
  </Primitive>
</template>
