<script setup lang="ts">
import type { MenubarContentEmits, MenubarContentProps } from './MenubarContent.ts'
import { MenuContent } from '../menu/index.ts'
import { wrapArray } from '../shared/index.ts'
import { composeEventHandlers } from '../shared/index.ts'
import { useMenubarMenuContext } from './MenubarMenu.ts'
import { useCollection, useMenubarContext } from './MenubarRoot.ts'

defineOptions({
  name: 'MenubarContent',
})

withDefaults(defineProps<MenubarContentProps>(), {
  align: 'start',
})
const emit = defineEmits<MenubarContentEmits>()

const context = useMenubarContext('MenubarContent')
const menuContext = useMenubarMenuContext('MenubarContent')
const getItems = useCollection()
let hasInteractedOutsideRef = false

const onCloseAutoFocus = composeEventHandlers((event) => {
  emit('closeAutoFocus', event)
}, (event) => {
  const menubarOpen = Boolean(context.value.value)
  if (!menubarOpen && !hasInteractedOutsideRef) {
    menuContext.triggerRef.current?.focus()
  }

  hasInteractedOutsideRef = false
  // Always prevent auto focus because we either focus manually or want user agent focus
  event.preventDefault()
})

const onFocusOutside = composeEventHandlers<MenubarContentEmits['focusOutside'][0]>((event) => {
  emit('focusOutside', event)
}, (event) => {
  const target = event.target as HTMLElement
  const isMenubarTrigger = getItems().some(item => item?.contains(target))
  if (isMenubarTrigger)
    event.preventDefault()
})

const onInteractOutside = composeEventHandlers<MenubarContentEmits['interactOutside'][0]>((event) => {
  emit('interactOutside', event)
}, () => {
  hasInteractedOutsideRef = true
})

function onEntryFocus(event: Event) {
  if (!menuContext.wasKeyboardTriggerOpenRef.current)
    event.preventDefault()
}

const onKeydown = composeEventHandlers<KeyboardEvent>(
  (event) => {
    emit('keydown', event)
  },
  (event) => {
    if (['ArrowRight', 'ArrowLeft'].includes(event.key)) {
      const target = event.target as HTMLElement
      const targetIsSubTrigger = target.hasAttribute('data-radix-menubar-subtrigger')
      const isKeyDownInsideSubMenu
                = target.closest('[data-radix-menubar-content]') !== event.currentTarget

      const prevMenuKey = context.dir.value === 'rtl' ? 'ArrowRight' : 'ArrowLeft'
      const isPrevKey = prevMenuKey === event.key
      const isNextKey = !isPrevKey

      // Prevent navigation when we're opening a submenu
      if (isNextKey && targetIsSubTrigger)
        return
      // or we're inside a submenu and are moving backwards to close it
      if (isKeyDownInsideSubMenu && isPrevKey)
        return

      let candidateValues: string[] = []

      for (const item of getItems()) {
        if (item.$$rcid.$menubar.disabled)
          continue
        candidateValues.push(item.$$rcid.$menubar.value)
      }

      if (isPrevKey)
        candidateValues.reverse()

      const currentIndex = candidateValues.indexOf(menuContext.value)

      candidateValues = context.loop()
        ? wrapArray(candidateValues, currentIndex + 1)
        : candidateValues.slice(currentIndex + 1)

      const [nextValue] = candidateValues
      if (nextValue)
        context.onMenuOpen(nextValue)
    }
  },
  { checkForDefaultPrevented: false },
)

const style = {
  // re-namespace exposed content custom properties
  '--radix-menubar-content-transform-origin': 'var(--radix-popper-transform-origin)',
  '--radix-menubar-content-available-width': 'var(--radix-popper-available-width)',
  '--radix-menubar-content-available-height': 'var(--radix-popper-available-height)',
  '--radix-menubar-trigger-width': 'var(--radix-popper-anchor-width)',
  '--radix-menubar-trigger-height': 'var(--radix-popper-anchor-height)',
}
</script>

<template>
  <MenuContent
    :id="menuContext.contentId"
    :aria-labelledby="menuContext.triggerId"
    data-radix-menubar-content=""
    :align="align"
    :style="style"
    @close-auto-focus="onCloseAutoFocus"
    @focus-outside="onFocusOutside"
    @interact-outside="onInteractOutside"
    @entry-focus="onEntryFocus"
    @keydown="onKeydown"
  >
    <slot />
  </MenuContent>
</template>
