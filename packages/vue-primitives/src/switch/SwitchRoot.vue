<script setup lang="ts">
import { computed, shallowRef } from 'vue'
import { useControllableState, useForwardElement } from '../hooks/index.ts'
import { Primitive } from '../primitive/index.ts'
import { composeEventHandlers } from '../utils/vue.ts'
import BubbleInput from './BubbleInput.vue'
import { getState, provideSwitchContext, type SwitchRootEmits, type SwitchRootProps } from './SwitchRoot.ts'

defineOptions({
  name: 'SwitchRoot',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<SwitchRootProps>(), {
  as: 'button',
  checked: undefined,
  defaultChecked: false,
  value: 'on',
})
const emit = defineEmits<SwitchRootEmits>()
const $el = shallowRef<HTMLButtonElement>()
const forwardElement = useForwardElement($el)

const hasConsumerStoppedPropagation = shallowRef(false)

// We set this to true by default so that events bubble to forms without JS (SSR)
const isFormControl = computed(() => $el.value ? Boolean($el.value.closest('form')) : true)

const checked = useControllableState(props, v => emit('update:checked', v), 'checked', props.defaultChecked)

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
    hasConsumerStoppedPropagation.value = event.cancelBubble
    // if switch is in a form, stop propagation from the button so that we only propagate
    // one click event (from the input). We propagate changes from an input so that native
    // form validation works and form events reflect switch updates.
    if (!hasConsumerStoppedPropagation.value)
      event.stopPropagation()
  }
})

defineExpose({
  $el,
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
    v-bind="$attrs"
    @click="onClick"
  >
    <slot />
  </Primitive>
  <BubbleInput
    v-if="isFormControl"
    :control="$el"
    :bubbles="!hasConsumerStoppedPropagation"
    :name="name"
    :value="value"
    :checked="checked"
    :required="required"
    :disabled="disabled"
  />
</template>
