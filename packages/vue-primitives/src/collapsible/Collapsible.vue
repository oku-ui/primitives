<script setup lang="ts">
import { toRef } from 'vue'
import { type CollapsibleEmits, type CollapsibleProps, provideCollapsibleContext } from './Collapsible.ts'
import { getState } from './utils.ts'
import { Primitive } from '~/primitive/index.ts'
import { useControllableState } from '~/hooks/useControllableState.ts'
import { useId } from '~/hooks/useId.ts'

defineOptions({
  name: 'Collapsible',
})

const props = withDefaults(defineProps<CollapsibleProps>(), {
  open: undefined,
  defaultOpen: false,
})
const emit = defineEmits<CollapsibleEmits>()

const open = useControllableState(props, emit, 'open', props.defaultOpen)

provideCollapsibleContext({
  contentId: useId(),
  disabled: toRef(props, 'disabled'),
  open,
  onOpenToggle() {
    open.value = !open.value
  },
})
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :data-state="getState(open)"
    :data-disabled="disabled ? '' : undefined"
  >
    <slot />
  </Primitive>
</template>
