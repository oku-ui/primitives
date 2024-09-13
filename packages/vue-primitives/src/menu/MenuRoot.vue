<script setup lang="ts">
import type { Measurable } from '../popper/index.ts'
import { shallowRef } from 'vue'
import { useDirection } from '../direction/Direction.ts'
import { providePopperContext } from '../popper/index.ts'
import {
  type MenuRootEmits,
  type MenuRootProps,
  provideMenuContext,
  provideMenuRootContext,
  useIsUsingKeyboard,
} from './MenuRoot.ts'

defineOptions({
  name: 'MenuRoot',
})

const props = withDefaults(defineProps<MenuRootProps>(), {
  open: false,
  modal: true,
})

const emit = defineEmits<MenuRootEmits>()

const isUsingKeyboardRef = useIsUsingKeyboard()
const direction = useDirection(() => props.dir)

provideMenuContext({
  open() {
    return props.open
  },
  onOpenChange(open) {
    emit('update:open', open)
  },
})

provideMenuRootContext({
  onClose() {
    emit('update:open', false)
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
