<script setup lang="ts">
import { useId, useRef } from '@oku-ui/hooks'
import { computed, shallowRef, watch } from 'vue'
import { provideMenuContext, provideMenuRootContext, useIsUsingKeyboard } from '../menu/index.ts'
import { type Measurable, providePopperContext } from '../popper/index.ts'
import { type MenubarMenuProps, provideMenubarMenuContext } from './MenubarMenu.ts'
import { useMenubarContext } from './MenubarRoot.ts'

defineOptions({
  name: 'MenubarMenu',
})
const props = defineProps<MenubarMenuProps>()

// We need to provide an initial deterministic value as `useId` will return
// empty string on the first render and we don't want to match our internal "closed" value.
const value = props.value || useId()
const context = useMenubarContext('MenubarMenu')
const triggerRef = useRef<HTMLButtonElement>()
const wasKeyboardTriggerOpenRef = useRef(false)
const open = computed(() => context.value.value === value)

watch(open, () => {
  if (!open.value)
    wasKeyboardTriggerOpenRef.value = false
})

provideMenubarMenuContext({
  value,
  triggerId: useId(),
  triggerRef,
  contentId: useId(),
  wasKeyboardTriggerOpenRef,
})

function onOpenChange(open: boolean) {
  // Menu only calls `onOpenChange` when dismissing so we
  // want to close our MenuBar based on the same events.
  if (!open)
    context.onMenuClose()
}

// COMP::MenuRoot

const isUsingKeyboardRef = useIsUsingKeyboard()

provideMenuContext({
  open() {
    return open.value
  },
  onOpenChange,
})

provideMenuRootContext({
  onClose() {
    onOpenChange(false)
  },
  isUsingKeyboardRef,
  dir: context.dir,
  modal: false,
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
