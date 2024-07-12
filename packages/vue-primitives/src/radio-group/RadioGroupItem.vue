<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, shallowRef, useAttrs } from 'vue'
import { RovingFocusGroupItem } from '../roving-focus/index.ts'
import { composeEventHandlers, forwardRef } from '../utils/vue.ts'
import { isFunction } from '../utils/is.ts'
import { useRadioGroupContext } from './RadioGroup.ts'
import { ARROW_KEYS, type RadioGroupItem } from './RadioGroupItem.ts'
import Radio from './Radio.vue'

defineOptions({
  name: 'RadioGroupItem',
  inheritAttrs: false,
})

const props = defineProps<RadioGroupItem>()
const attrs = useAttrs()
const $el = shallowRef<HTMLElement>()
const forwardedRef = forwardRef($el)

const context = useRadioGroupContext()

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

function onKeyDown(event: KeyboardEvent) {
  // According to WAI ARIA, radio groups don't activate items on enter keypress
  if (event.key === 'Enter')
    event.preventDefault()
}

const onFocus = composeEventHandlers<FocusEvent>((event) => {
  isFunction(attrs.onFocus) && attrs.onFocus(event)
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
      :ref="forwardedRef"
      :as="as"
      :as-child="asChild"
      :checked="checked"
      :required="context.required()"
      :disabled="isDisabled"
      :name="context.name()"
      :value="value"
      v-bind="{
        ...attrs,
        onKeyDown,
        onFocus,
      }"
      @update:checked="onCheck"
    >
      <slot />
    </Radio>
  </RovingFocusGroupItem>
</template>
