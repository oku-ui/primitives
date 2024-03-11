<script setup lang="ts">
import { type Ref, toRef } from 'vue'
import { Primitive } from '@oku-ui/primitive'
import { useDirection } from '@oku-ui/direction'
import { useId, useVModel } from '@oku-ui/use-composable'
import { type TabsEmits, type TabsProps, tabsProvider } from './Tabs'
import { TAB_NAME } from './constants'

defineOptions({
  name: TAB_NAME,
})

const props = withDefaults(defineProps<TabsProps>(), {
  orientation: 'horizontal',
  activationMode: 'automatic',
})
const emit = defineEmits<TabsEmits>()

const dir = useDirection(toRef(props, 'dir'))

const value = useVModel(props, 'value', emit, {
  defaultValue: props.defaultValue,
  passive: (props.value === undefined) as false,
}) as Ref<typeof props.defaultValue>

tabsProvider({
  scope: props.scopeOkuTabs,
  baseId: useId(),
  value,
  onValueChange(payload) {
    value.value = payload
  },
  orientation: toRef(props, 'orientation'),
  dir: toRef(props, 'dir'),
  activationMode: toRef(props, 'activationMode'),
})
</script>

<template>
  <Primitive
    :is="is"
    :dir="dir"
    :data-orientation="orientation"
    :as-child="asChild"
  >
    <slot />
  </Primitive>
</template>
