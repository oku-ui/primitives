<script setup lang="ts">
import type { RadioGroupItemEmits, RadioGroupItemProps } from './RadioGroupItem'
import type { RadioElement } from './types'
import { OkuRovingFocusGroupItem } from '@oku-ui/roving-focus'
import { usePrimitiveElement } from '@oku-ui/use-composable'
import { composeEventHandlers } from '@oku-ui/utils'
import { computed, onBeforeUnmount, onMounted, shallowRef } from 'vue'
import { RADIO_GROUP_ITEM_NAME } from './constants'
import { useRadioScope } from './Radio'
import Radio from './Radio.vue'
import { useRadioGroupContext, useRovingFocusGroupScope } from './RadioGroup'
import { ARROW_KEYS } from './utils'

defineOptions({
  name: RADIO_GROUP_ITEM_NAME,
  inheritAttrs: false,
})

const props = defineProps<RadioGroupItemProps>()
const emit = defineEmits<RadioGroupItemEmits>()

const context = useRadioGroupContext(RADIO_GROUP_ITEM_NAME, props.scopeOkuRadioGroup)

const isDisabled = computed(() => context.disabled.value || props.disabled)
const rovingFocusGroupScope = useRovingFocusGroupScope(props.scopeOkuRadioGroup)
const radioScope = useRadioScope(props.scopeOkuRadioGroup)

const [rootRef, setForwardRef] = usePrimitiveElement<RadioElement>()

const checked = computed(() => context.value.value === props.value)
const isArrowKeyPressed = shallowRef(false)

function handleKeyDown(event: KeyboardEvent) {
  if (ARROW_KEYS.includes(event.key))
    isArrowKeyPressed.value = true
}

function handleKeyUp() {
  isArrowKeyPressed.value = false
}

function handleCheck() {
  context.onValueChange(props.value)
}

const handleKeydown = composeEventHandlers((event: KeyboardEvent) => {
  // According to WAI ARIA, radio groups don't activate items on enter keypress
  if (event.key === 'Enter')
    event.preventDefault()
})

const handleFocus = composeEventHandlers<FocusEvent>((e) => {
  emit('focus', e)
}, () => {
  /**
   * Our `RovingFocusGroup` will focus the radio when navigating with arrow keys
   * and we need to "check" it in that case. We click it to "check" it (instead
   * of updating `context.value`) so that the radio change event fires.
   */

  setTimeout(() => {
    if (isArrowKeyPressed.value)
      rootRef.value?.click()
  }, 0)
})

onMounted(() => {
  document.addEventListener('keydown', handleKeyDown)
  document.addEventListener('keyup', handleKeyUp)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeyDown)
  document.removeEventListener('keyup', handleKeyUp)
})

defineExpose({
  $el: rootRef,
})
</script>

<template>
  <OkuRovingFocusGroupItem
    :is="is"
    as-child
    :focusable="!isDisabled"
    :active="checked"
    v-bind="rovingFocusGroupScope"
  >
    <Radio
      :is="is"
      :ref="setForwardRef"
      :as-child="asChild"
      :disabled="isDisabled"
      :required="context.required.value"
      :checked="checked"
      :name="context.name.value"
      :value="value"
      v-bind="{
        ...radioScope,
        ...$attrs,
      }"
      @check="handleCheck"
      @keydown="handleKeydown"
      @focus="handleFocus"
    >
      <slot />
    </Radio>
  </OkuRovingFocusGroupItem>
</template>
