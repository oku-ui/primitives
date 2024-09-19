<script setup lang="ts">
import type { DropdownMenuContentEmits } from './DropdownMenuContent.ts'
import { MenuContent } from '../menu/index.ts'
import { composeEventHandlers } from '../shared/index.ts'
import { useDropdownMenuContext } from './DropdownMenuRoot.ts'

defineOptions({
  name: 'DropdownMenuContent',
})

const emit = defineEmits<DropdownMenuContentEmits>()

const context = useDropdownMenuContext('DropdownMenuContent')

let hasInteractedOutsideRef = false

const onCloseAutoFocus = composeEventHandlers((event) => {
  emit('closeAutoFocus', event)
}, (event) => {
  if (!hasInteractedOutsideRef) {
    context.triggerRef.current?.focus()
  }
  hasInteractedOutsideRef = false
  // Always prevent auto focus because we either focus manually or want user agent focus
  event.preventDefault()
})

const onInteractOutside = composeEventHandlers<DropdownMenuContentEmits['interactOutside'][0]>((event) => {
  emit('interactOutside', event)
}, (event) => {
  const originalEvent = event.detail.originalEvent as PointerEvent
  const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true
  const isRightClick = originalEvent.button === 2 || ctrlLeftClick
  if (!context.modal || isRightClick)
    hasInteractedOutsideRef = true
})

const style = {
  '--radix-dropdown-menu-content-transform-origin': 'var(--radix-popper-transform-origin)',
  '--radix-dropdown-menu-content-available-width': 'var(--radix-popper-available-width)',
  '--radix-dropdown-menu-content-available-height': 'var(--radix-popper-available-height)',
  '--radix-dropdown-menu-trigger-width': 'var(--radix-popper-anchor-width)',
  '--radix-dropdown-menu-trigger-height': 'var(--radix-popper-anchor-height)',
}
</script>

<template>
  <MenuContent
    :id="context.contentId"
    :aria-labelledby="context.triggerId"
    :style="style"
    @close-auto-focus="onCloseAutoFocus"
    @interact-outside="onInteractOutside"
  >
    <slot />
  </MenuContent>
</template>
