<script setup lang="ts">
import type { ContextMenuSubEmits, ContextMenuSubProps } from './ContextMenuSub.ts'
import { onWatcherCleanup, shallowRef, watchEffect } from 'vue'
import { useControllableState, useId, useRef } from '../hooks/index.ts'
import { provideMenuContext, provideMenuSubContext, useMenuContext } from '../menu/index.ts'
import { type Measurable, providePopperContext } from '../popper/index.ts'

defineOptions({
  name: 'ContextMenuSub',
})

const props = withDefaults(defineProps<ContextMenuSubProps>(), {
  open: undefined,
  defaultOpen: false,
})

const emit = defineEmits<ContextMenuSubEmits>()

const open = useControllableState(props, 'open', v => emit('update:open', v), props.defaultOpen)

// COMP::MenuSub

const parentMenuContext = useMenuContext('MenuSub')
const trigger = useRef<HTMLDivElement>()

// Prevent the parent menu from reopening with open submenus.
watchEffect(() => {
  if (parentMenuContext.open() === false)
    open.value = false

  onWatcherCleanup(() => {
    open.value = false
  })
})

provideMenuContext({
  open() {
    return open.value
  },
  onOpenChange(v) {
    open.value = v
  },
})

provideMenuSubContext({
  contentId: useId(),
  triggerId: useId(),
  trigger,
  onTriggerChange(el) {
    trigger.current = el
  },
})

// COMP::PopperRoot

const anchor = shallowRef<Measurable>()

providePopperContext({
  content: shallowRef(),
  anchor,
  onAnchorChange(newAnchor) {
    anchor.value = newAnchor
  },
})
</script>

<template>
  <slot />
</template>
