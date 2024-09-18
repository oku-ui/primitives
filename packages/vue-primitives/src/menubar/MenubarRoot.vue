<script setup lang="ts">
import { shallowRef } from 'vue'
import { useDirection } from '../direction/index.ts'
import { useComposedElements, useControllableState, useRef } from '../hooks/index.ts'
import { Primitive } from '../primitive/index.ts'
import { useRovingFocusGroupRoot } from '../roving-focus/RovingFocusGroupRoot.ts'
import { Collection, type MenubarRootEmits, type MenubarRootProps, provideMenubarContext } from './MenubarRoot.ts'

defineOptions({
  name: 'MenubarRoot',
})

const props = withDefaults(defineProps<MenubarRootProps>(), {
  value: undefined,
  loop: true,
  defaultValue: '',
})
const emit = defineEmits<MenubarRootEmits>()

const direction = useDirection(() => props.dir)
const value = useControllableState(props, 'value', v => emit('update:value', v), props.defaultValue)

// We need to manage tab stop id manually as `RovingFocusGroup` updates the stop
// based on focus, and in some situations our triggers won't ever be given focus
// (e.g. click to open and then outside to close)
const currentTabStopId = shallowRef<string>()

provideMenubarContext({
  value,
  onMenuOpen(id) {
    value.value = id
    currentTabStopId.value = id
  },
  onMenuClose() {
    value.value = ''
  },
  onMenuToggle(id) {
    value.value = (value.value ? '' : id)
    // `openMenuOpen` and `onMenuToggle` are called exclusively so we
    // need to update the id in either case
    currentTabStopId.value = id
  },
  dir: direction,
  loop() {
    return props.loop
  },
})

const $el = shallowRef<HTMLElement>()
const elRef = useRef<HTMLElement>()
const forwardedRef = useComposedElements((v) => {
  $el.value = v
  elRef.current = v
})

Collection.provideCollectionContext(elRef)

// Comp::RovingFocusGroupRoot
const rovingFocusGroupRoot = useRovingFocusGroupRoot(elRef, {
  orientation() {
    return 'horizontal'
  },
  loop() {
    return props.loop
  },
  dir: direction,
  currentTabStopId() {
    return currentTabStopId.value
  },
}, {
  updateCurrentTabStopId(tabStopId) {
    currentTabStopId.value = tabStopId
  },
})
</script>

<template>
  <Primitive
    :ref="forwardedRef"

    role="menubar"

    :dir="dir"
    :tabindex="rovingFocusGroupRoot.tabindex()"
    data-orientation="horizontal"
    style="outline: none;"

    @mousedown="rovingFocusGroupRoot.onMousedown"
    @focus="rovingFocusGroupRoot.onFocus"
    @focusout="rovingFocusGroupRoot.onFocusout"
  >
    <slot />
  </Primitive>
</template>
