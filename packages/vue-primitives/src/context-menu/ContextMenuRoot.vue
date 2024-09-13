<script setup lang="ts">
import { shallowRef } from 'vue'
import { useDirection } from '../direction/index.ts'
import { provideMenuContext, provideMenuRootContext, useIsUsingKeyboard } from '../menu/index.ts'
import { type Measurable, providePopperContext } from '../popper/index.ts'
import { type ContextMenuRootEmits, type ContextMenuRootProps, provideContextMenuContext } from './ContextMenuRoot.ts'

defineOptions({
  name: 'ContextMenuRoot',
})

const props = withDefaults(defineProps<ContextMenuRootProps>(), {
  modal: true,
})
const emit = defineEmits<ContextMenuRootEmits>()

const open = shallowRef(false)

function onOpenChange(v: boolean) {
  open.value = v
  emit('update:open', v)
}

provideContextMenuContext({
  open,
  onOpenChange,
  modal: props.modal,
})

// COMP::MenuRoot

const isUsingKeyboardRef = useIsUsingKeyboard()
const direction = useDirection(() => props.dir)

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
