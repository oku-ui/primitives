<script setup lang="ts">
import type { MenuRadioItemProps } from './MenuRadioItem.ts'
import { computed } from 'vue'
import MenuItem from './MenuItem.vue'
import { provideItemIndicatorContext } from './MenuItemIndicator.ts'
import { useRadioGroupContext } from './MenuRadioGroup.ts'
import { getCheckedState } from './utils.ts'

defineOptions({
  name: 'MenuRadioItem',
})

const props = defineProps<MenuRadioItemProps>()

const context = useRadioGroupContext('MenuRadioItem')

const checked = computed(() => props.value === context.value())

function onSelects() {
  context.onValueChange(props.value)
}

provideItemIndicatorContext({
  checked() {
    return checked.value
  },
})
</script>

<template>
  <MenuItem
    role="menuitemradio"
    :aria-checked="checked"
    :data-state="getCheckedState(checked)"
    @select="onSelects"
  >
    <slot />
  </MenuItem>
</template>
