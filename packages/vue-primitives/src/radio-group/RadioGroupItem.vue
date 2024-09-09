<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, shallowRef } from 'vue'
import { ITEM_DATA_ATTR } from '../collection/index.ts'
import { useComposedElements } from '../hooks/index.ts'
import { Primitive } from '../primitive/index.ts'
import { useRovingFocusGroupItem } from '../roving-focus/index.ts'
import { composeEventHandlers } from '../utils/vue.ts'
import BubbleInput from './BubbleInput.vue'
import { getState, provideRadioContext } from './Radio.ts'
import { ARROW_KEYS, type RadioGroupItemEmits, type RadioGroupItemProps } from './RadioGroupItem.ts'
import { useRadioGroupContext } from './RadioGroupRoot.ts'

defineOptions({
  name: 'RadioGroupItem',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<RadioGroupItemProps>(), {
  as: 'button',
})
const emit = defineEmits<RadioGroupItemEmits>()

const $el = shallowRef<HTMLButtonElement>()

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

const rovingFocusGroupItem = useRovingFocusGroupItem({
  focusable() {
    return !isDisabled.value
  },
  active() {
    return checked.value
  },
}, {
  onMousedown(event) {
    emit('mousedown', event)
  },
  onKeydown,
  onFocus,
})

const forwardElement = useComposedElements<HTMLButtonElement>((v) => {
  $el.value = v
  rovingFocusGroupItem.useCollectionItem(v, rovingFocusGroupItem.itemData)
})

// Radio
const hasConsumerStoppedPropagation = shallowRef(false)
// We set this to true by default so that events bubble to forms without JS (SSR)
const isFormControl = computed(() => $el.value ? Boolean($el.value.closest('form')) : true)

const onClick = composeEventHandlers<MouseEvent>((event) => {
  emit('click', event)
}, (event) => {
  // radios cannot be unchecked so we only communicate a checked state
  if (!checked.value)
    onCheck()
  if (isFormControl.value) {
    hasConsumerStoppedPropagation.value = event.cancelBubble
    // if radio is in a form, stop propagation from the button so that we only propagate
    // one click event (from the input). We propagate changes from an input so that native
    // form validation works and form events reflect radio updates.
    if (!hasConsumerStoppedPropagation.value)
      event.stopPropagation()
  }
})

provideRadioContext({
  checked() {
    return checked.value
  },
  disabled() {
    return isDisabled.value
  },
})

defineExpose({
  $el,
})
</script>

<template>
  <Primitive
    :ref="forwardElement"
    :as="as"
    :tabindex="rovingFocusGroupItem.tabindex()"
    :data-orientation="rovingFocusGroupItem.orientation()"
    :[ITEM_DATA_ATTR]="true"
    type="button"
    role="radio"
    :aria-checked="checked"
    :data-state="getState(checked)"
    :data-disabled="isDisabled ? '' : undefined"
    :disabled="isDisabled"
    :value="value"
    v-bind="$attrs"
    @click="onClick"
    @mousedown="rovingFocusGroupItem.onMousedown"
    @keydown="rovingFocusGroupItem.onKeydown"
    @focus="rovingFocusGroupItem.onFocus"
  >
    <slot />
  </Primitive>

  <BubbleInput
    v-if="isFormControl"
    :control="$el"
    :bubbles="!hasConsumerStoppedPropagation"
    :name="context.name()"
    :value="value"
    :checked="checked"
    :required="context.required()"
    :disabled="isDisabled"
  />
</template>
