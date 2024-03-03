<script setup lang="ts">
import { collapsibleProvider } from './Collapsible.js'
import type { CollapsibleEmits, CollapsibleProps } from './Collapsible.js'
import { useControllable, useForwardRef, useId } from '@oku-ui/use-composable'
import { Primitive } from '@oku-ui/primitive'
import { computed } from 'vue'
import { getState } from './utils.js'
import { COLLAPSIBLE_NAME } from './constants.js'

defineOptions({
  name: COLLAPSIBLE_NAME,
})

const props = defineProps<CollapsibleProps>()
const emit = defineEmits<CollapsibleEmits>()

const forwardedRef = useForwardRef()

const computedOpen = computed(() => props.modelValue !== undefined
  ? props.modelValue
  : props.open !== undefined ? props.open : undefined)

const [state, updateValue] = useControllable({
  prop: computedOpen,
  defaultProp: computed(() => props.defaultOpen),
  onChange: (open) => {
    emit('openChange', open)
    emit('update:modelValue', open)
  },
  initialValue: false,
})

collapsibleProvider({
  contentId: useId(),
  disabled: computed(() => props.disabled),
  onOpenToggle() {
    updateValue(!state.value)
  },
  scope: props.scopeOkuCollapsible,
  open: state,
})
</script>

<template>
  <Primitive :is="is" :ref="forwardedRef" :as-child="asChild" :data-state="getState(state)" :data-disabled="disabled ? '' : undefined">
    <slot />
  </Primitive>
</template>
