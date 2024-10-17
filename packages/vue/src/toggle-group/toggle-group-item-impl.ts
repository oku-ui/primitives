import type { ToggleGroupItemImplNativeElement } from './props'
import { OkuToggle } from '@oku-ui/toggle'
import { reactiveOmit, useForwardRef, useListeners } from '@oku-ui/use-composable'
import { computed, defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { scopeToggleGroupProps, TOGGLE_GROUP_ITEM_IMPL_NAME, toggleGroupItemImplProps, useToggleGroupValueInject } from './props'

const toggleGroupItemImpl = defineComponent({
  name: TOGGLE_GROUP_ITEM_IMPL_NAME,
  components: {
    OkuToggle,
  },
  inheritAttrs: false,
  props: {
    ...toggleGroupItemImplProps.props,
    ...scopeToggleGroupProps,
  },
  emits: toggleGroupItemImplProps.emits,
  setup(props, { slots, attrs }) {
    const { scopeOkuToggleGroup, value, ...itemProps } = toRefs(props)

    const _reactive = reactive(itemProps)
    const otherProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()
    const emits = useListeners()

    const valueInject = useToggleGroupValueInject(TOGGLE_GROUP_ITEM_IMPL_NAME, scopeOkuToggleGroup.value)
    const singleProps = computed(() => ({ 'role': 'radio', 'aria-checked': props.pressed, 'aria-pressed': undefined }))
    const typeProps = computed(() => valueInject.type === 'single' ? singleProps.value : undefined)

    return () => h(OkuToggle, {
      ...typeProps.value,
      ...mergeProps(attrs, otherProps, emits),
      ref: forwardedRef,
      onPressedChange: (pressed) => {
        if (pressed)
          valueInject.onItemActivate(value.value!)
        else
          valueInject.onItemDeactivate(value.value!)
      },
    }, () => slots.default?.())
  },
})

export const OkuToggleGroupItemImpl = toggleGroupItemImpl as typeof toggleGroupItemImpl & (new () => { $props: ToggleGroupItemImplNativeElement })
