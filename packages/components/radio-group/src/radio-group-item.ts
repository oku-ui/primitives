import { computed, defineComponent, h, mergeProps, onBeforeUnmount, onMounted, reactive, ref, toRefs } from 'vue'
import { reactiveOmit, useComposedRefs, useForwardRef, useListeners } from '@oku-ui/use-composable'
import { OkuRovingFocusGroupItem } from '@oku-ui/roving-focus'
import { composeEventHandlers } from '@oku-ui/utils'
import { ARROW_KEYS } from './utils'
import { OkuRadio } from './Radio'
import { RADIO_GROUP_ITEM_NAME, radioGroupItemProps, scopeRadioGroupProps, useRadioGroupInject, useRadioScope, useRovingFocusGroupScope } from './props'
import type { RadioElement, RadioGroupItemEmits, RadioGroupItemNativeElement } from './props'

const radioGroupItem = defineComponent({
  name: RADIO_GROUP_ITEM_NAME,
  components: {
    OkuRovingFocusGroupItem,
    OkuRadio,
  },
  inheritAttrs: false,
  props: {
    ...radioGroupItemProps.props,
    ...scopeRadioGroupProps,
  },
  emits: radioGroupItemProps.emits,
  setup(props, { slots, emit, attrs }) {
    const {
      scopeOkuRadioGroup,
      disabled,
      ...itemProps
    } = toRefs(props)

    const _reactive = reactive(itemProps)
    const otherProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()
    const emits = useListeners()

    const inject = useRadioGroupInject(RADIO_GROUP_ITEM_NAME, scopeOkuRadioGroup.value)

    const isDisabled = computed(() => inject.disabled.value || disabled.value)
    const rovingFocusGroupScope = useRovingFocusGroupScope(scopeOkuRadioGroup.value)
    const radioScope = useRadioScope(scopeOkuRadioGroup.value)

    const radioRef = ref<RadioElement | null>(null)
    const composedRefs = useComposedRefs(forwardedRef, radioRef)

    const checked = computed(() => inject.value?.value === itemProps.value.value)
    const isArrowKeyPressedRef = ref(false)

    const handleKeyDown = (event: KeyboardEvent) => {
      if (ARROW_KEYS.includes(event.key))
        isArrowKeyPressedRef.value = true
    }
    const handleKeyUp = () => isArrowKeyPressedRef.value = false

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
    }, () => h(OkuRadio, {
      disabled: isDisabled.value,
      required: inject.required.value,
      checked: checked.value,
      ...radioScope,
      ...mergeProps(attrs, otherProps, emits),
      ref: composedRefs,
      onCheck: () => inject.onValueChange(itemProps.value.value),
      onKeydown: composeEventHandlers<RadioGroupItemEmits['keydown'][0]>((event) => {
        emit('keydown', event)
      }, (event) => {
        // According to WAI ARIA, radio groups don't activate items on enter keypress
        if (event.key === 'Enter')
          event.preventDefault()
      }),
      onFocus: composeEventHandlers<RadioGroupItemEmits['focus'][0]>((event) => {
        emit('focus', event)
      }, () => {
        /**
         * Our `RovingFocusGroup` will focus the radio when navigating with arrow keys
         * and we need to "check" it in that case. We click it to "check" it (instead
         * of updating `context.value`) so that the radio change event fires.
         */
        if (isArrowKeyPressedRef.value)
          radioRef.value?.click()
      }),
    }, () => slots.default?.()))
  },
})

export const OkuRadioGroupItem = radioGroupItem as typeof radioGroupItem & (new () => { $props: RadioGroupItemNativeElement })
