import { computed, defineComponent, h, mergeProps, onBeforeUnmount, onMounted, ref, toRefs } from 'vue'
import { useComposedRefs, useForwardRef } from '@oku-ui/use-composable'

import { OkuRovingFocusGroupItem } from '@oku-ui/roving-focus'
import { composeEventHandlers } from '@oku-ui/utils'
import { propsOmit } from '@oku-ui/primitive'
import { useRadioGroupInject, useRovingFocusGroupScope } from './RadioGroup'
import type { RadioGroupNaviteElement } from './RadioGroup'
import type { RadioElement, RadioEmits, RadioProps } from './Radio'
import { OkuRadio, radioProps, useRadioScope } from './Radio'
import { ARROW_KEYS, scopeRadioGroupProps } from './utils'

const ITEM_NAME = 'OkuRadioGroupItem'

export type RadioGroupItemNaviteElement = RadioGroupNaviteElement
export type RadioGroupItemElement = HTMLDivElement

export interface RadioGroupItemProps extends Omit<RadioProps, | 'name'> {
  value: string
}

export type RadioGroupItemEmits = Omit<RadioEmits, 'check'> & {
  'update:modelValue': [value: string]
  focus: [event: FocusEvent]
}

export const radioGroupItemProps = {
  props: {
    ...propsOmit(radioProps.props, ['name']),
  },
  emits: {
    ...propsOmit(radioProps.emits, ['check']),
    // eslint-disable-next-line unused-imports/no-unused-vars
    'update:modelValue': (value: string) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    'focus': (event: FocusEvent) => true,
  },
}

const RadioGroupItem = defineComponent({
  name: ITEM_NAME,
  inheritAttrs: false,
  props: {
    ...radioGroupItemProps.props,
    ...scopeRadioGroupProps,
  },
  emits: radioGroupItemProps.emits,
  setup(props, { slots, emit, attrs }) {
    const {
      disabled,
      required,
      value,
    } = toRefs(props)

    const inject = useRadioGroupInject(ITEM_NAME, props.scopeOkuRadioGroup)

    const isDisabled = computed(() => disabled.value || inject.disabled.value)
    const rovingFocusGroupScope = useRovingFocusGroupScope(props.scopeOkuRadioGroup)
    const radioScope = useRadioScope(props.scopeOkuRadioGroup)

    const rootRef = ref<RadioElement | null>(null)
    const forwardedRef = useForwardRef()
    const composedRefs = useComposedRefs(rootRef, forwardedRef)

    const checked = computed(() => inject.value?.value === value.value)
    const isArrowKeyPressedRef = ref(false)

    const handleKeyDown = (event: KeyboardEvent) => {
      if (ARROW_KEYS.includes(event.key))
        isArrowKeyPressedRef.value = true
    }
    const handleKeyUp = () => {
      isArrowKeyPressedRef.value = false
    }

    onMounted(() => {
      document.addEventListener('keydown', handleKeyDown)
      document.addEventListener('keyup', handleKeyUp)
    })

    onBeforeUnmount(() => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    })

    return () => h(OkuRovingFocusGroupItem, {
      asChild: true,
      ...rovingFocusGroupScope,
      focusable: !isDisabled.value,
      active: checked.value,
    }, {
      default: () => h(OkuRadio, {
        disabled: isDisabled.value,
        required: inject.required.value || required.value,
        checked: checked.value,
        ...radioScope,
        ...mergeProps(attrs),
        asChild: props.asChild,
        value: value.value,
        name: inject.name?.value,
        ref: composedRefs,
        onCheck: () => {
          return inject.onValueChange(props.value)
        },
        onKeydown: composeEventHandlers((event: any) => {
          // According to WAI ARIA, radio groups don't activate items on enter keypress
          if (event.key === 'Enter')
            event.preventDefault()
        }),
        onFocus: composeEventHandlers<FocusEvent>((e) => {
          emit('focus', e)
        },
        () => {
          /**
           * Our `RovingFocusGroup` will focus the radio when navigating with arrow keys
           * and we need to "check" it in that case. We click it to "check" it (instead
           * of updating `context.value`) so that the radio change event fires.
           */

          setTimeout(() => {
            if (isArrowKeyPressedRef.value)
              rootRef.value?.click()
          }, 0)
        }),

      }, {
        default: () => slots.default?.(),
      }),
    })
  },
})

export const OkuRadioGroupItem = RadioGroupItem as typeof RadioGroupItem &
(new () => {
  $props: RadioGroupItemNaviteElement
})
