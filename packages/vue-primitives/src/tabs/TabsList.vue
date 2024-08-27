<script setup lang="ts">
import { shallowRef } from 'vue'
import { Primitive } from '../primitive/index.ts'
import { RovingFocusGroupRoot } from '../roving-focus/index.ts'
import { forwardRef } from '../utils/vue.ts'
import type { TabsListProps } from './TabsList.ts'
import { useTabsContext } from './TabsRoot.ts'

defineOptions({
  name: 'TabsList',
  inheritAttrs: false,
})

withDefaults(defineProps<TabsListProps>(), {
  loop: true,
})
const $el = shallowRef<HTMLElement>()
const forwardedRef = forwardRef($el)

const context = useTabsContext('TabsList')

defineExpose({
  $el,
})
</script>

<template>
  <RovingFocusGroupRoot
    as-child
    :orientation="context.orientation"
    :dir="context.dir.value"
    :loop="loop"
  >
    <Primitive
      :ref="forwardedRef"
      v-bind="$attrs"
      role="tablist"
      :aria-orientation="context.orientation"
    >
      <slot />
    </Primitive>
  </RovingFocusGroupRoot>
</template>
