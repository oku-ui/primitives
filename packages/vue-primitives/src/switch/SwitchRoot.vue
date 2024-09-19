<script setup lang="ts">
import { computed, shallowRef } from 'vue'
import { useControllableState, useForwardElement, useRef } from '../hooks/index.ts'
import { Primitive } from '../primitive/index.ts'
import { composeEventHandlers } from '../shared/index.ts'
import { getState, provideSwitchContext, type SwitchRootEmits, type SwitchRootProps, type SwitchRootSlots } from './SwitchRoot.ts'

defineOptions({
  name: 'SwitchRoot',
})

const props = withDefaults(defineProps<SwitchRootProps>(), {
  as: 'button',
  checked: undefined,
  defaultChecked: false,
  value: 'on',
})
const emit = defineEmits<SwitchRootEmits>()
defineSlots<SwitchRootSlots>()

const control = shallowRef<HTMLButtonElement>()
const forwardElement = useForwardElement(control)

const bubbles = useRef(true)

// We set this to true by default so that events bubble to forms without JS (SSR)
const isFormControl = computed(() => control.value ? Boolean(control.value.closest('form')) : true)

const checked = useControllableState(props, 'checked', v => emit('update:checked', v), props.defaultChecked)

provideSwitchContext({
  checked,
  disabled() {
    return props.disabled
  },
})

const onClick = composeEventHandlers<MouseEvent>((event) => {
  emit('click', event)
}, (event) => {
  checked.value = !checked.value

  if (isFormControl.value) {
    bubbles.current = !event.cancelBubble
    // if switch is in a form, stop propagation from the button so that we only propagate
    // one click event (from the input). We propagate changes from an input so that native
    // form validation works and form events reflect switch updates.
    if (bubbles.current)
      event.stopPropagation()
  }
})
</script>

<template>
  <Primitive
    :ref="forwardElement"
    :as="as"
    type="button"
    role="switch"
    :aria-checked="checked"
    :aria-required="required"
    :data-state="getState(checked)"
    :data-disabled="disabled ? '' : undefined"
    :disabled="disabled"
    :value="value"
    @click="onClick"
  >
    <slot
      :is-form-control="isFormControl"
      :input="{
        control,
        bubbles,
        name,
        value,
        checked,
        required,
        disabled,
      }"
    />
  </Primitive>
</template>
