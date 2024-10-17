<script setup lang="ts">
import { useControllableState, useId } from '@oku-ui/hooks'
import { Primitive } from '@oku-ui/primitive'
import { useDirection } from '../direction/index.ts'
import { provideTabsContext, type TabsRootEmits, type TabsRootProps } from './TabsRoot.ts'

defineOptions({
  name: 'TabsRoot',
})

const props = withDefaults(defineProps<TabsRootProps>(), {
  orientation: 'horizontal',
  activationMode: 'automatic',
})

const emit = defineEmits<TabsRootEmits>()

const direction = useDirection(() => props.dir)

const value = useControllableState(props, 'value', v => emit('update:value', v as string), props.defaultValue)

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
