<script setup lang="ts">
import { useControllableState, useId } from '../hooks/index.ts'
import { Primitive } from '../primitive/index.ts'
import { type CollapsibleRootEmits, type CollapsibleRootProps, provideCollapsibleContext } from './CollapsibleRoot.ts'
import { getState } from './utils.ts'

defineOptions({
  name: 'CollapsibleRoot',
})

const props = withDefaults(defineProps<CollapsibleRootProps>(), {
  open: undefined,
  defaultOpen: false,
})
const emit = defineEmits<CollapsibleRootEmits>()

const open = useControllableState(props, v => emit('update:open', v), 'open', props.defaultOpen)

provideCollapsibleContext({
  contentId: useId(),
  disabled() {
    return props.disabled
  },
  open,
  onOpenToggle() {
    open.value = !open.value
  },
})
</script>

<template>
  <Primitive
    :data-state="getState(open)"
    :data-disabled="disabled ? '' : undefined"
  >
    <slot />
  </Primitive>
</template>
