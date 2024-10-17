<script lang="ts">
import type { PrimitiveProps } from '@oku-ui/primitive'

export interface ScopeSwitch {
  scopeOkuSwitch?: any
}

export interface SwitchProps extends PrimitiveProps {
  scopeOkuSwitch?: any
  checked?: boolean
  defaultChecked?: boolean
  value?: string
  required?: boolean
  name?: string
  disabled?: boolean
}

export type SwitchEmits = {
  'update:checked': [checked: boolean]
  'checkedChange': [checked: boolean]
  'click': [event: MouseEvent]
}

</script>

<script setup lang="ts">
import type { Ref } from 'vue'
import { Primitive } from '@oku-ui/primitive'
import { useComponentRef, useVModel } from '@oku-ui/use-composable'
import { composeEventHandlers } from '@oku-ui/utils'
import { onMounted, ref, toRef } from 'vue'
import OkuBubbleInput from './BubbleInput.vue'
import { getState, useSwitchProvide } from './utils'

defineOptions({
  name: 'OkuSwitch',
})

const props = withDefaults(defineProps<SwitchProps>(), {
  checked: undefined,
  defaultChecked: undefined,
  value: 'on',
  is: 'button',
})

const emits = defineEmits<SwitchEmits>()

const { componentRef, currentElement } = useComponentRef<HTMLButtonElement | null>()

const hasConsumerStoppedPropagationRef = ref<boolean>(false)

// We set this to true by default so that events bubble to forms without JS (SSR)
const isFormControl = ref<boolean>(false)
onMounted(() => {
  isFormControl.value = currentElement.value
    ? typeof currentElement.value.closest === 'function'
    && Boolean(currentElement.value.closest('form'))
    : true
})

const checked = useVModel(props, 'checked', emits, {
  defaultValue: props.defaultChecked,
  passive: (props.checked === undefined) as false,
  shouldEmit(v: any) {
    emits('checkedChange', v)
    return true
  },
}) as unknown as Ref<boolean>

useSwitchProvide({
  scope: props.scopeOkuSwitch,
  checked,
  disabled: toRef(props, 'disabled'),
})

defineExpose({
  $el: currentElement,
})
</script>

<template>
  <Primitive
    :is="props.is"
    v-bind="$attrs"
    ref="componentRef"
    :as-child="props.asChild"
    type="button"
    role="switch"
    :aria-checked="!!checked"
    :aria-required="props.required"
    :data-state="getState(checked)"
    :data-disabled="props.disabled ? '' : undefined"
    :disabled="props.disabled"
    :value="props.value"
    @click="composeEventHandlers<SwitchEmits['click'][0]>((event) => {
      emits('click', event)
    }, (event) => {
      checked = !checked
      if (isFormControl) {
        // TODO: isPropagationStopped() is not supported in vue
        // hasConsumerStoppedPropagationRef.value = event.isPropagationStopped()

        // if switch is in a form, stop propagation from the button so that we only propagate
        // one click event (from the input). We propagate changes from an input so that native
        // form validation works and form events reflect switch updates.
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
    :value="props.value"
    :checked="!!checked"
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
