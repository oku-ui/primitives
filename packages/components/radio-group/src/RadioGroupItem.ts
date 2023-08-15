import type { InstanceTypeRef, MergeProps } from '@oku-ui/primitive'
import type { PropType } from 'vue'
import { computed, defineComponent, h, ref, toRefs, watchEffect } from 'vue'
import { useComposedRefs, useForwardRef } from '@oku-ui/use-composable'

import { OkuRovingFocusGroupItem } from '@oku-ui/roving-focus'
import { composeEventHandlers } from '@oku-ui/utils'
import { scopedRadioGroupProps, useRadioGroupInject, useRovingFocusGroupScope } from './RadioGroup'
import type { RadioGroupIntrinsicElement, ScopedRadioGroupType } from './RadioGroup'
import type { RadioElement, RadioProps } from './Radio'
import { OkuRadio, radioPropsObject, useRadioScope } from './Radio'
import { ARROW_KEYS } from './utils'

const ITEM_NAME = 'OkuRadioGroupItem'

type RadioGroupItemIntrinsicElement = RadioGroupIntrinsicElement
export type RadioGroupItemElement = HTMLDivElement

interface RadioGroupItemProps extends Omit<RadioProps, 'onCheck' | 'name'>, ScopedRadioGroupType<any> {
  value: string
}

// eslint-disable-next-line unused-imports/no-unused-vars
const { onCheck, name, ...radioProps } = radioPropsObject

const RadioGroupItemPropsObject = {
  ...radioProps,
  ...scopedRadioGroupProps,
  onFocus: {
    type: Function as PropType<(event: FocusEvent) => void>,
    default: undefined,
  },
}

const RadioGroupItem = defineComponent({
  name: ITEM_NAME,
  inheritAttrs: false,
  props: RadioGroupItemPropsObject,
  emits: ['update:modelValue'],
  setup(props, { slots, emit, attrs }) {
    const {
      disabled,
      asChild,
      checked: checkedProp,
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

    const checked = computed(() => inject.value?.value === props.value)
    const isArrowKeyPressedRef = ref(false)

    watchEffect((onClean) => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (ARROW_KEYS.includes(event.key))
          isArrowKeyPressedRef.value = true
      }
      const handleKeyUp = () => (isArrowKeyPressedRef.value = false)
      document.addEventListener('keydown', handleKeyDown)
      document.addEventListener('keyup', handleKeyUp)
      onClean(() => {
        document.removeEventListener('keydown', handleKeyDown)
        document.removeEventListener('keyup', handleKeyUp)
      })
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
        checked: checked.value || checkedProp.value,
        ...radioScope,
        ...attrs,
        value: value.value,
        name: inject.name?.value || 'on',
        ref: composedRefs,
        onCheck: () => inject.onValueChange(value.value),
        onKeydown: composeEventHandlers((event: any) => {
          // According to WAI ARIA, radio groups don't activate items on enter keypress
          if (event.key === 'Enter')
            event.preventDefault()
        }),
        onFocus: composeEventHandlers(props.onFocus, () => {
          /**
           * Our `RovingFocusGroup` will focus the radio when navigating with arrow keys
           * and we need to "check" it in that case. We click it to "check" it (instead
           * of updating `context.value`) so that the radio change event fires.
           */
          if (isArrowKeyPressedRef.value)
            rootRef.value?.click()
        }),

      }, {
        default: () => slots.default?.(),
      }),
    })
  },
})

type _RadioGroupItemProps = MergeProps<RadioGroupItemProps, Partial<RadioGroupItemIntrinsicElement>>

export type IstanceRadioGroupItemType = InstanceTypeRef<typeof RadioGroupItem, RadioGroupItemElement>

const OkuRadioGroupItem = RadioGroupItem as typeof RadioGroupItem & (new () => { $props: _RadioGroupItemProps })

export { OkuRadioGroupItem }

export type { RadioGroupItemProps }
