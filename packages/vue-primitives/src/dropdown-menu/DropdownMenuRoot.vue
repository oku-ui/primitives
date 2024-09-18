<script setup lang="ts">
import { shallowRef } from 'vue'
import { useDirection } from '../direction/index.ts'
import { useControllableState, useId, useRef } from '../hooks/index.ts'
import { provideMenuContext, provideMenuRootContext, useIsUsingKeyboard } from '../menu/index.ts'
import { type Measurable, providePopperContext } from '../popper/index.ts'
import { type DropdownMenuRootEmits, type DropdownMenuRootProps, provideDropdownMenuContext } from './DropdownMenuRoot.ts'

defineOptions({
  name: 'DropdownMenuRoot',
})

const props = withDefaults(defineProps<DropdownMenuRootProps>(), {
  open: undefined,
  defaultOpen: false,
  modal: true,
})
const emit = defineEmits<DropdownMenuRootEmits>()

const triggerRef = useRef<HTMLButtonElement>()

const open = useControllableState(props, 'open', v => emit('update:open', v), props.defaultOpen)

provideDropdownMenuContext({
  triggerId: useId(),
  triggerRef,
  contentId: useId(),
  open() {
    return open.value
  },
  onOpenChange(value) {
    open.value = value
  },
  onOpenToggle() {
    open.value = !open.value
  },
  modal: props.modal,
})

// COMP::MenuRoot

const isUsingKeyboardRef = useIsUsingKeyboard()
const direction = useDirection(() => props.dir)

provideMenuContext({
  open() {
    return open.value
  },
  onOpenChange(value) {
    open.value = value
  },
})

provideMenuRootContext({
  onClose() {
    open.value = false
  },
  isUsingKeyboardRef,
  dir: direction,
  modal: props.modal,
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
