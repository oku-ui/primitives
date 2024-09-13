<script setup lang="ts">
import type { DismissableLayerEmits } from '../dismissable-layer/index.ts'
import type { ContextMenuContentEmits, ContextMenuContentProps } from './ContextMenuContent.ts'
import { MenuRootContentModal, MenuRootContentNonModal, useMenuContext, useMenuRootContext } from '../menu/index.ts'
import { usePopperContext } from '../popper/index.ts'
import { usePresence } from '../presence/index.ts'
import { useContextMenuContext } from './ContextMenuRoot.ts'

defineOptions({
  name: 'ContextMenuContent',
})

const props = defineProps<ContextMenuContentProps>()
const emit = defineEmits<ContextMenuContentEmits>()

const context = useContextMenuContext('ContextMenuContent')
let hasInteractedOutsideRef = false

function onCloseAutoFocus(event: Event) {
  emit('closeAutoFocus', event)

  if (!event.defaultPrevented && hasInteractedOutsideRef) {
    event.preventDefault()
  }

  hasInteractedOutsideRef = false
}

function onInteractOutside(event: DismissableLayerEmits['interactOutside'][0]) {
  emit('interactOutside', event)

  if (!event.defaultPrevented && !context.modal)
    hasInteractedOutsideRef = true
}

// COMP::MenuContent

const menuContext = useMenuContext('MenuContent')
const rootContext = useMenuRootContext('MenuContent')
const popperContext = usePopperContext('MenuContent')

const isPresent = usePresence(popperContext.content, () => props.forceMount || menuContext.open())

const Comp = rootContext.modal ? MenuRootContentModal : MenuRootContentNonModal
</script>

<template>
  <Comp
    v-if="isPresent"
    :style="{
      '--radix-context-menu-content-transform-origin': 'var(--radix-popper-transform-origin)',
      '--radix-context-menu-content-available-width': 'var(--radix-popper-available-width)',
      '--radix-context-menu-content-available-height': 'var(--radix-popper-available-height)',
      '--radix-context-menu-trigger-width': 'var(--radix-popper-anchor-width)',
      '--radix-context-menu-trigger-height': 'var(--radix-popper-anchor-height)',
    }"
    side="right"
    :side-offset="2"
    align="start"
    @close-auto-focus="onCloseAutoFocus"
    @interact-outside="onInteractOutside"
  >
    <slot />
  </Comp>
</template>
