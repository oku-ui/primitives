<script setup lang="ts">
import type { FocusOutsideEvent } from '../dismissable-layer/index.ts'
import { hideOthers } from 'aria-hidden'
import { onBeforeUnmount } from 'vue'
import { useComposedElements } from '../hooks/index.ts'
import MenuContentImpl from './MenuContentImpl.vue'
import { useMenuContext } from './MenuRoot.ts'

defineOptions({
  name: 'MenuRootContentModal',
})

const context = useMenuContext('MenuRootContentModal')
let elRef: HTMLElement | undefined
const forwardElement = useComposedElements((v) => {
  elRef = v
})

// Hide everything from ARIA except the `MenuContent`
onBeforeUnmount(() => {
  if (elRef)
    hideOthers(elRef)
})

// When focus is trapped, a `focusout` event may still happen.
// We make sure we don't trigger our `onDismiss` in such case.
function onFocusOutside(event: FocusOutsideEvent) {
  event.preventDefault()
}

function onDismiss() {
  context.onOpenChange(false)
}
</script>

<template>
  <MenuContentImpl
    :ref="forwardElement"
    :trap-focus="context.open()"
    :disable-outside-pointer-events="context.open()"
    disable-outside-scroll
    @focus-outside="onFocusOutside"
    @dismiss="onDismiss"
  >
    <slot />
  </MenuContentImpl>
</template>
