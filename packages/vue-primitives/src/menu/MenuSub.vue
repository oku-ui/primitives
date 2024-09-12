<script setup lang="ts">
import { shallowRef, watchEffect } from 'vue'
import { useId, useRef } from '../hooks/index.ts'
import { type Measurable, providePopperContext } from '../popper/index.ts'
import { provideMenuContext, useMenuContext } from './MenuRoot.ts'
import { type MenuSubEmits, type MenuSubProps, provideMenuSubContext } from './MenuSub.ts'

defineOptions({
  name: 'MenuSub',
})

const props = withDefaults(defineProps<MenuSubProps>(), {
  open: false,
})
const emit = defineEmits<MenuSubEmits>()

const parentMenuContext = useMenuContext('MenuSub')
const trigger = useRef<HTMLDivElement>()

// Prevent the parent menu from reopening with open submenus.
watchEffect((onCleanup) => {
  if (parentMenuContext.open() === false)
    emit('update:open', false)

  onCleanup(() => {
    emit('update:open', false)
  })
})

provideMenuContext({
  open() {
    return props.open
  },
  onOpenChange(open) {
    emit('update:open', open)
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
  onAnchorChange(newAnchor: Measurable | undefined) {
    anchor.value = newAnchor
  },
})
</script>

<template>
  <slot />
</template>
