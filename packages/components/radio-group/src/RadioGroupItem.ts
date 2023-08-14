import type { InstanceTypeRef, MergeProps } from '@oku-ui/primitive'
import { computed, defineComponent, toRefs } from 'vue'
import { useForwardRef } from '@oku-ui/use-composable'

import { scopedRadioGroupProps, useRadioGroupInject, useRovingFocusGroupScope } from './RadioGroup'
import type { RadioGroupElement, ScopedRadioGroupType } from './RadioGroup'
import type { RadioProps } from './Radio'
import { RadioPropsObject } from './Radio'

const ITEM_NAME = 'OkuRadioGroupItem'

type RadioGroupItemElement = RadioGroupElement
export type _RadioGroupItemEl = HTMLDivElement

interface RadioGroupItemProps extends Omit<RadioProps, 'onCheck' | 'name'>, ScopedRadioGroupType<any> {
  value: string
}

// eslint-disable-next-line unused-imports/no-unused-vars
const { onCheck, name, ...radioPropsObject } = RadioPropsObject

const RadioGroupItemPropsObject = {
  ...radioPropsObject,
  ...scopedRadioGroupProps,
}

const RadioGroupItem = defineComponent({
  name: ITEM_NAME,
  inheritAttrs: false,
  props: RadioGroupItemPropsObject,
  emits: ['update:modelValue'],
  setup(props, { slots, emit, attrs }) {
    const {
      disabled,
      ...itemProps
    } = toRefs(props)

    const inject = useRadioGroupInject(ITEM_NAME, props.scopeRadioGroup)
    const isDisabled = computed(() => disabled.value || inject.disabled.value)
    const rovingFocusGroupScope = useRovingFocusGroupScope(props.scopeRadioGroup)
    const radioScope = useRadioGroupInject(ITEM_NAME, props.scopeRadioGroup)

    const forwardedRef = useForwardRef()
  },
})

type _RadioGroupItemProps = MergeProps<RadioGroupItemProps, RadioGroupItemElement>
export type IstanceRadioGroupItemType = InstanceTypeRef<typeof RadioGroupItem, _RadioGroupItemEl>

const OkuRadioGroupItem = RadioGroupItem as typeof RadioGroupItem & (new () => { $props: _RadioGroupItemProps })

export { OkuRadioGroupItem }

export type { RadioGroupItemProps }
