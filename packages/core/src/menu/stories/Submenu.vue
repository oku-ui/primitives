<script setup lang="ts">
import { MenuPortal, MenuSub, MenuSubContent, MenuSubTrigger } from '../index.ts'

defineOptions({
  inheritAttrs: false,
})

withDefaults(defineProps<{
  heading?: string
  open?: boolean
  disabled?: boolean
  animated?: boolean
}>(), {
  heading: 'Submenu',
  open: true,
  disabled: undefined,
  animated: false,
})

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

function onOpenChange(value: boolean) {
  emit('update:open', value)
}
</script>

<template>
  <MenuSub :open="open" @update:open="onOpenChange">
    <MenuSubTrigger class="menu_subTriggerClass" :disabled="disabled">
      {{ heading }} →
    </MenuSubTrigger>
    <MenuPortal>
      <MenuSubContent
        :class="animated ? 'menu_animatedContentClass' : 'menu_contentClass'"
        v-bind="$attrs"
      >
        <slot />
      </MenuSubContent>
    </MenuPortal>
  </MenuSub>
</template>
