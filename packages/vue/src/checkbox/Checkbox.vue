<script lang="ts">
import { createProvideScope } from '@oku-ui/provide'
import type { PrimitiveProps } from '@oku-ui/primitive'

export interface ScopeCheckbox {
  scopeOkuCheckbox?: any
}

export type CheckedState = boolean | 'indeterminate'

export type CheckboxProvide = {
  _names: 'OkuCheckbox'
  state: Ref<CheckedState>
  disabled?: Ref<boolean | undefined>
}

export interface CheckboxProps extends PrimitiveProps {
  scopeOkuCheckbox?: any
  checked?: CheckedState
  defaultChecked?: CheckedState
  required?: boolean
  name?: string
  disabled?: boolean
  value?: string
}

export type CheckboxEmits = {
  'update:modelValue': [checked: CheckedState]
  'checkedChange': [checked: CheckedState]
  'keydown': [event: KeyboardEvent]
  'click': [event: MouseEvent]
}

export const { composeProviderScopes, createProvide } = createProvideScope<CheckboxProvide['_names']>('OkuCheckbox')

export const { useInject, useProvider }
    = createProvide<Omit<CheckboxProvide, '_names'>>('OkuCheckbox')

</script>

<script setup lang="ts">
import type { Ref } from 'vue'
import { computed, defineOptions, defineProps, onMounted, ref, toRef, watchEffect, withDefaults } from 'vue'
import { useComponentRef, useControllable, useVModel } from '@oku-ui/use-composable'
import { Primitive } from '@oku-ui/primitive'
import { composeEventHandlers } from '@oku-ui/utils'
import OkuBubbleInput from './BubbleInput.vue'
import { getState, isIndeterminate } from './utils'

defineOptions({
  name: 'OkuCheckbox',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<CheckboxProps>(), {
  is: 'button',
  value: 'on',
  checked: undefined,
  defaultChecked: undefined,
})
const emits = defineEmits<CheckboxEmits>()

const { componentRef, currentElement } = useComponentRef<HTMLButtonElement | null>()

const hasConsumerStoppedPropagationRef = ref(false)
// We set this to true by default so that events bubble to forms without JS (SSR)
const isFormControl = ref<boolean>(false)

onMounted(() => {
  isFormControl.value = currentElement.value
    ? typeof currentElement.value.closest === 'function'
    && Boolean(currentElement.value.closest('form'))
    : true
})

const modelValue = useVModel(props, 'checked', emits, {
  defaultValue: props.defaultChecked,
  passive: (props.checked === undefined) as false,
})

const [checked, setChecked] = useControllable({
  prop: computed(() => modelValue.value),
  defaultProp: computed(() => props.defaultChecked),
  onChange: (result: any) => {
    emits('checkedChange', result)
    emits('update:modelValue', result)
  },
  initialValue: false,
})

const initialCheckedStateRef = ref(checked.value)

watchEffect((onInvalidate) => {
  const form = currentElement.value?.form
  if (form) {
    const reset = () => setChecked(initialCheckedStateRef.value)
    form.addEventListener('reset', reset)

    onInvalidate(() => form.removeEventListener('reset', reset))
  }
})

useProvider({
  scope: props.scopeOkuCheckbox,
  state: checked,
  disabled: toRef(props, 'disabled'),
})

</script>

<template>
  <Primitive
    :is="props.is"
    v-bind="$attrs"
    ref="componentRef"
    type="button"
    :as-child="props.asChild"
    role="checkbox"
    :aria-checked="isIndeterminate(checked) ? 'mixed' : checked"
    :aria-required="props.required"
    :data-state="getState(checked)"
    :data-disabled="props.disabled ? '' : undefined"
    :disabled="props.disabled"
    :value="props.value"
    @keydown="composeEventHandlers<CheckboxEmits['keydown'][0]>((event) => {
      emits('keydown', event)
    }, (event) => {
      // According to WAI ARIA, Checkboxes don't activate on enter keypress
      if (event.key === 'Enter')
        event.preventDefault()
    })($event)"
    @click="composeEventHandlers<CheckboxEmits['click'][0]>(
      (event) => {
        emits('click', event)
      }, (event) => {
        setChecked(isIndeterminate(checked) ? true : !checked)
        if (isFormControl) {
          // TODO: isPropagationStopped() is not supported in vue
          // hasConsumerStoppedPropagationRef.value = event.isPropagationStopped()

          // if checkbox is in a form, stop propagation from the button so that we only propagate
          // one click event (from the input). We propagate changes from an input so that native
          // form validation works and form events reflect checkbox updates.
          if (!hasConsumerStoppedPropagationRef)
            event.stopPropagation()
        }
      })($event)"
  >
    <slot />
  </Primitive>

  <OkuBubbleInput
    v-if="isFormControl"
    :control="currentElement"
    :bubbles="!hasConsumerStoppedPropagationRef"
    :name="props.name"
    :checked="!!checked"
    :value="props.value"
    :required="props.required"
    :disabled="props.disabled"
    :style="{
      // We transform because the input is absolutely positioned but we have
      // rendered it **after** the button. This pulls it back to sit on top
      // of the button.
      transform: 'translateX(-100%)',
    }"
  />
</template>
