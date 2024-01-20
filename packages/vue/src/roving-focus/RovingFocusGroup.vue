<script setup lang="ts">
import { useComponentRef } from '@oku-ui/use-composable'
import OkuRovingFocusGroupImpl from './RovingFocusGroupImpl.vue'
import type { RovingFocusGroupProps } from './props'
import { CollectionProvider, CollectionSlot } from './props'

defineOptions({
  name: 'OkuRovingFocusGroup',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<RovingFocusGroupProps>(), {
  orientation: undefined,
  dir: undefined,
  loop: false,
})

const { componentRef, currentElement } = useComponentRef<HTMLInputElement | null>()

defineExpose({
  $el: currentElement,
})
</script>

<template>
  <CollectionProvider
    :scope="props.scopeOkuRovingFocusGroup"
  >
    <CollectionSlot
      :scope="props.scopeOkuRovingFocusGroup"
    >
      <OkuRovingFocusGroupImpl
        v-bind="$attrs"
        :is="props.is"
        ref="componentRef"
        :orientation="props.orientation"
        :dir="props.dir"
        :loop="props.loop"
        :as-child="props.asChild"
      >
        <slot />
      </OkuRovingFocusGroupImpl>
    </CollectionSlot>
  </CollectionProvider>
</template>
