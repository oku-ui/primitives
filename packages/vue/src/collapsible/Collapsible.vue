<script setup lang="ts">
import { useId, usePrimitiveElement, useVModel } from '@oku-ui/use-composable'
import { Primitive } from '@oku-ui/primitive'
import { collapsibleProvider } from './Collapsible'
import type { CollapsibleEmits, CollapsibleProps } from './Collapsible'
import { getState } from './utils'
import { COLLAPSIBLE_NAME } from './constants'
import { type Ref, computed } from 'vue'

defineOptions({
  name: COLLAPSIBLE_NAME,
})

const props = withDefaults(defineProps<CollapsibleProps>(), {
  open: undefined,
})
const emit = defineEmits<CollapsibleEmits>()

const [$el, set$el] = usePrimitiveElement()

const open = useVModel(props, 'open', emit, {
  defaultValue: props.defaultOpen,
  passive: (props.open === undefined) as false,
}) as Ref<boolean>

collapsibleProvider({
  contentId: useId(),
  disabled: computed(() => props.disabled),
  onOpenToggle() {
    open.value = !open.value
  },
  scope: props.scopeOkuCollapsible,
  open,
})

defineExpose({
  $el,
})
</script>

<template>
  <Primitive :is="is" :ref="set$el" :as-child="asChild" :data-state="getState(open)" :data-disabled="disabled ? '' : undefined">
    <slot />
  </Primitive>
</template>
