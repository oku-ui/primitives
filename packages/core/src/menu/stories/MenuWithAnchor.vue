<script setup lang="ts">
import { MenuAnchor, MenuPortal, MenuRoot } from '../index.ts'
import MenuContent from '../MenuContent.vue'

defineOptions({
  inheritAttrs: false,
})

withDefaults(defineProps<{
  open?: boolean
}>(), {
  open: true,
})

const emit = defineEmits<{
  'update:open': [open: boolean]
}>()

function change(open: boolean) {
  emit('update:open', open)
}

function preventDefault(event: Event) {
  event.preventDefault()
}
</script>

<template>
  <MenuRoot
    :open="open"
    :modal="false"
    @update:open="change"
  >
    <MenuAnchor :style="{ display: 'inline-block' }" />
    <MenuPortal>
      <MenuContent
        class="menu_contentClass"
        align="start"
        v-bind="$attrs"
        @close-auto-focus="preventDefault"
      >
        <slot />
      </MenuContent>
    </MenuPortal>
  </MenuRoot>
</template>
