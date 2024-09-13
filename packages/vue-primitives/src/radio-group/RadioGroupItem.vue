<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, shallowRef } from 'vue'
import { DATA_COLLECTION_ITEM } from '../collection/index.ts'
import { useComposedElements, useRef } from '../hooks/index.ts'
import { Primitive } from '../primitive/index.ts'
import { useRovingFocusGroupItem } from '../roving-focus/index.ts'
import { composeEventHandlers } from '../utils/vue.ts'
import { getState, provideRadioContext } from './Radio.ts'
import { ARROW_KEYS, type RadioGroupItemEmits, type RadioGroupItemProps, type RadioGroupItemSlots } from './RadioGroupItem.ts'
import { useRadioGroupContext } from './RadioGroupRoot.ts'

defineOptions({
  name: 'RadioGroupItem',
})

const props = withDefaults(defineProps<RadioGroupItemProps>(), {
  as: 'button',
})
const emit = defineEmits<RadioGroupItemEmits>()
defineSlots<RadioGroupItemSlots>()

const control = shallowRef<HTMLButtonElement>()

const context = useRadioGroupContext('RadioGroupItem')

const disabled = computed(() => context.disabled() || props.disabled)
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
    control.value?.click()
})

const rovingFocusGroupItem = useRovingFocusGroupItem({
  focusable() {
    return !disabled.value
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
  control.value = v
  rovingFocusGroupItem.useCollectionItem(v, rovingFocusGroupItem.itemData, rovingFocusGroupItem.collectionKey)
})

// COMP::Radio
const bubbles = useRef(true)
// We set this to true by default so that events bubble to forms without JS (SSR)
const isFormControl = computed(() => control.value ? Boolean(control.value.closest('form')) : true)

const onClick = composeEventHandlers<MouseEvent>((event) => {
  emit('click', event)
}, (event) => {
  // radios cannot be unchecked so we only communicate a checked state
  if (!checked.value)
    onCheck()
  if (isFormControl.value) {
    bubbles.current = !event.cancelBubble
    // if radio is in a form, stop propagation from the button so that we only propagate
    // one click event (from the input). We propagate changes from an input so that native
    // form validation works and form events reflect radio updates.
    if (bubbles.current)
      event.stopPropagation()
  }
})

provideRadioContext({
  checked() {
    return checked.value
  },
  disabled() {
    return disabled.value
  },
})

defineExpose({
  $el: control,
})
</script>

<template>
  <Primitive
    :ref="forwardElement"
    :as="as"
    :[DATA_COLLECTION_ITEM]="true"

    :tabindex="rovingFocusGroupItem.tabindex()"
    :data-orientation="rovingFocusGroupItem.orientation()"

    type="button"
    role="radio"
    :aria-checked="checked"
    :data-state="getState(checked)"
    :data-disabled="disabled ? '' : undefined"
    :disabled="disabled"
    :value="value"

    @mousedown="rovingFocusGroupItem.onMousedown"
    @focus="rovingFocusGroupItem.onFocus"
    @keydown="rovingFocusGroupItem.onKeydown"

    @click="onClick"
  >
    <slot
      :is-form-control="isFormControl"
      :input="{
        control,
        bubbles,
        name: context.name(),
        value,
        checked,
        required: context.required(),
        disabled,
      }"
    />
  </Primitive>
</template>
