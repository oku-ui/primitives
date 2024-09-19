<script setup lang="ts">
import type { FocusOutsideEvent } from '../dismissable-layer/index.ts'
import type { MenuSubContentEmits, MenuSubContentProps } from './MenuSubContent.ts'
import { usePopperContext } from '../popper/index.ts'
import { usePresence } from '../presence/index.ts'
import { composeEventHandlers } from '../shared/index.ts'
import MenuContentImpl from './MenuContentImpl.vue'
import { SUB_CLOSE_KEYS, useMenuContext, useMenuRootContext } from './MenuRoot.ts'
import { useMenuSubContext } from './MenuSub.ts'

defineOptions({
  name: 'MenuSubContent',
})

const props = defineProps<MenuSubContentProps>()
const emit = defineEmits<MenuSubContentEmits>()

const context = useMenuContext('MenuSubContent')
const rootContext = useMenuRootContext('MenuSubContent')
const subContext = useMenuSubContext('MenuSubContent')
const popperContext = usePopperContext('MenuSubContent')

const isPresent = usePresence(popperContext.content, () => props.forceMount || context.open())

function onOpenAutoFocus(event: Event) {
  // when opening a submenu, focus content for keyboard users only
  if (rootContext.isUsingKeyboardRef.current) {
    popperContext.content.value?.focus()
  }
  event.preventDefault()
}
// The menu might close because of focusing another menu item in the parent menu. We
// don't want it to refocus the trigger in that case so we handle trigger focus ourselves.
function onCloseAutoFocus(event: Event) {
  event.preventDefault()
}
const onFocusOutside = composeEventHandlers<FocusOutsideEvent>((event) => {
  emit('focusOutside', event)
}, (event) => {
  // We prevent closing when the trigger is focused to avoid triggering a re-open animation
  // on pointer interaction.
  if (event.target !== subContext.trigger.current) {
    context.onOpenChange(false)
  }
})
const onEscapeKeydown = composeEventHandlers<KeyboardEvent>((event) => {
  emit('keydown', event)
}, (event) => {
  rootContext.onClose()
  // ensure pressing escape in submenu doesn't escape full screen mode
  event.preventDefault()
})

const onKeydown = composeEventHandlers<KeyboardEvent>((event) => {
  emit('keydown', event)
}, (event) => {
  // Submenu key events bubble through portals. We only care about keys in this menu.
  const isKeyDownInside = (event.currentTarget as HTMLElement).contains(event.target as HTMLElement)
  const isCloseKey = SUB_CLOSE_KEYS[rootContext.dir.value].includes(event.key)
  if (isKeyDownInside && isCloseKey) {
    context.onOpenChange(false)
    // We focus manually because we prevented it in `onCloseAutoFocus`

    subContext.trigger.current?.focus()
    // prevent window from scrolling
    event.preventDefault()
  }
})
</script>

<template>
  <MenuContentImpl
    v-if="isPresent"
    :id="subContext.contentId"
    :aria-labelledby="subContext.triggerId"
    align="start"
    :side="rootContext.dir.value === 'rtl' ? 'left' : 'right'"
    :disable-outside-pointer-events="false"
    :disable-outside-scroll="false"
    :trap-focus="false"
    @open-auto-focus="onOpenAutoFocus"
    @close-auto-focus="onCloseAutoFocus"
    @focus-outside="onFocusOutside"
    @escape-keydown="onEscapeKeydown"
    @keydown="onKeydown"
  >
    <slot />
  </MenuContentImpl>
</template>
