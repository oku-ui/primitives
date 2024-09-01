<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, shallowRef } from 'vue'
import { RovingFocusGroupItem } from '../roving-focus/index.ts'
import { composeEventHandlers } from '../utils/vue.ts'
import { useForwardElement } from '../hooks/index.ts'
import { useRadioGroupContext } from './RadioGroupRoot.ts'
import { ARROW_KEYS, type RadioGroupItemEmits, type RadioGroupItemProps } from './RadioGroupItem.ts'
import Radio from './Radio.vue'

defineOptions({
  name: 'RadioGroupItem',
  inheritAttrs: false,
})

const props = defineProps<RadioGroupItemProps>()
const emit = defineEmits<RadioGroupItemEmits>()
const $el = shallowRef<HTMLElement>()
const forwardElement = useForwardElement($el)

const context = useRadioGroupContext('RadioGroupItem')

const isDisabled = computed(() => context.disabled() || props.disabled)
const checked = computed(() => context.value.value === props.value)

let isArrowKeyPressed: boolean = false

function handleKeyDown(event: KeyboardEvent) {
  if (ARROW_KEYS.includes(event.key)) {
    isArrowKeyPressed = true
  }
}

function handleKeyUp() {
  isArrowKeyPressed = false
}

onMounted(() => {
  document.addEventListener('keydown', handleKeyDown)
  document.addEventListener('keyup', handleKeyUp)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeyDown)
  document.removeEventListener('keyup', handleKeyUp)
})

function onCheck() {
  context.onValueChange(props.value)
}

const onKeydown = composeEventHandlers<KeyboardEvent>((event) => {
  emit('keydown', event)
}, (event) => {
  // According to WAI ARIA, radio groups don't activate items on enter keypress
  if (event.key === 'Enter')
    event.preventDefault()
})

const onFocus = composeEventHandlers<FocusEvent>((event) => {
  emit('focus', event)
}, () => {
  /**
   * Our `RovingFocusGroup` will focus the radio when navigating with arrow keys
   * and we need to "check" it in that case. We click it to "check" it (instead
   * of updating `context.value`) so that the radio change event fires.
   */
  if (isArrowKeyPressed)
    $el.value?.click()
})

defineExpose({
  $el,
})
</script>

<template>
  <RovingFocusGroupItem
    as-child
    :focusable="!isDisabled"
    :active="checked"
  >
    <Radio
      :ref="forwardElement"
      :checked="checked"
      :required="context.required()"
      :disabled="isDisabled"
      :name="context.name()"
      :value="value"
      v-bind="$attrs"
      @focus="onFocus"
      @keydown="onKeydown"
      @update:checked="onCheck"
    >
      <slot />
    </Radio>
  </RovingFocusGroupItem>
</template>
