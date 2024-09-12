<script setup lang="ts">
import { isIndeterminate } from '../checkbox/index.ts'
import MenuItem from './MenuItem.vue'
import { provideItemIndicatorContext } from './MenuItemIndicator.ts'
import { getCheckedState } from './utils.ts'
import type { MenuCheckboxItemEmits, MenuCheckboxItemProps } from './MenuCheckboxItem.ts'

defineOptions({
  name: 'MenuCheckboxItem',
})

const props = withDefaults(defineProps<MenuCheckboxItemProps>(), {
  checked: false,
})

const emit = defineEmits<MenuCheckboxItemEmits>()

function onSelect() {
  emit('update:checked', isIndeterminate(props.checked) ? true : !props.checked)
}

provideItemIndicatorContext({
  checked() {
    return props.checked
  },
})
</script>

<template>
  <MenuItem
    role="menuitemcheckbox"
    :aria-checked="isIndeterminate(checked) ? 'mixed' : checked"
    :data-state="getCheckedState(checked)"
    @select="onSelect"
  >
    <slot />
  </MenuItem>
</template>
