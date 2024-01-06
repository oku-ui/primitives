import { computed, defineComponent, h, mergeProps, reactive, ref } from 'vue'
import { reactiveOmit, useForwardRef, useListeners } from '@oku-ui/use-composable'
import { OkuRovingFocusGroupItem } from '@oku-ui/roving-focus'
import { OkuToggleGroupItemImpl } from './toggle-group-item-impl'
import { TOGGLE_GROUP_ITEM_NAME, scopeToggleGroupProps, toggleGroupItemProps, useRovingFocusGroupScope, useToggleGroupInject, useToggleGroupValueInject } from './props'
import type { ToggleGroupItemNativeElement } from './props'

const toggleGroupItem = defineComponent({
  name: TOGGLE_GROUP_ITEM_NAME,
  components: {
    OkuRovingFocusGroupItem,
    OkuToggleGroupItemImpl,
  },
  inheritAttrs: false,
  props: {
    ...toggleGroupItemProps.props,
    ...scopeToggleGroupProps,
  },
  emits: toggleGroupItemProps.emits,
  setup(props, { slots, attrs }) {
    const valueInject = useToggleGroupValueInject(TOGGLE_GROUP_ITEM_NAME, props.scopeOkuToggleGroup)
    const inject = useToggleGroupInject(TOGGLE_GROUP_ITEM_NAME, props.scopeOkuToggleGroup)
    const rovingFocusGroupScope = useRovingFocusGroupScope(props.scopeOkuToggleGroup)
    const pressed = computed(() => valueInject.value.value.includes(props.value!))
    const disabled = computed(() => inject.disabled.value || props.disabled)
    const commonProps = { ...props, pressed, disabled }

    const _reactive = reactive(commonProps)
    const otherProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()
    const emits = useListeners()

    const toggleGroupItemRef = ref<HTMLDivElement | null>(null)

    return () => [inject.rovingFocus.value
      ? h(OkuRovingFocusGroupItem, {
        asChild: true,
        ...rovingFocusGroupScope,
        focusable: !disabled.value,
        active: pressed.value,
        ref: toggleGroupItemRef,
      }, () => h(OkuToggleGroupItemImpl, {
        ...mergeProps(attrs, otherProps, emits),
        ref: forwardedRef,
      }, () => slots.default?.()))
      : h(OkuToggleGroupItemImpl, {
        ...mergeProps(attrs, otherProps, emits),
        ref: forwardedRef,
      }, () => slots.default?.()),
    ]
  },
})

export const OkuToggleGroupItem = toggleGroupItem as typeof toggleGroupItem & (new () => { $props: ToggleGroupItemNativeElement })
