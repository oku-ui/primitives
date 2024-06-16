<script setup lang="ts">
import { type TabsEmits, type TabsProps, provideTabsContext } from './Tabs.ts'
import { useControllableState } from '~/hooks/useControllableState.ts'
import { useDirection } from '~/direction/Direction.ts'
import { useId } from '~/hooks/useId.ts'
import { Primitive } from '~/primitive/index.ts'

defineOptions({
  name: 'Tabs',
})

const props = withDefaults(defineProps<TabsProps>(), {
  orientation: 'horizontal',
  activationMode: 'automatic',
})

const emit = defineEmits<TabsEmits>()

const direction = useDirection(() => props.dir)

const value = useControllableState(props, emit, 'value', props.defaultValue)

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
    :as="as"
    :as-child="asChild"
    :dir="direction"
    :data-orientation="orientation"
  >
    <slot />
  </Primitive>
</template>
