import { type MergeProps, Primitive, type PrimitiveProps } from '@oku-ui/primitive'
import { type PropType, computed, defineComponent, h, inject } from 'vue'
import type { TabsProvideValue } from './tabs'
import { TABS_INJECTION_KEY } from './tabs'

/* -------------------------------------------------------------------------------------------------
 * TabTrigger
 * ----------------------------------------------------------------------------------------------- */

const TAB_CONTENT_NAME = 'TabContent' as const

interface TabsContentProps extends PrimitiveProps {
  value?: string
  forceMount?: boolean
}

const TabContent = defineComponent({
  name: TAB_CONTENT_NAME,
  inheritAttrs: false,
  props: {
    value: {
      type: String as PropType<string>,
      required: true,
    },
    forceMount: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup(props, { slots }) {
    const injectedValue = inject<TabsProvideValue>(TABS_INJECTION_KEY)

    const dataState = computed<'active' | 'inactive'>(() => {
      return injectedValue?.modelValue?.value === props.value
        ? 'active'
        : 'inactive'
    })

    const shouldRender = computed(() => {
      return (
        injectedValue?.modelValue?.value === props.value || props.forceMount
      )
    })

    return () =>
      h('div', [
        shouldRender.value
          ? h(
            Primitive.div,
            {
              'vIf': injectedValue?.modelValue?.value === props.value,
              'role': 'tab-content',
              'data-state': dataState.value,
              'data-orientation': injectedValue?.orientation,
              'tabindex': '0',
            },
            slots.default && slots.default(),
          )
          : null,
      ])
  },
})

type _TabsProps = MergeProps<TabsContentProps, typeof TabContent>

const OkuTabContent = TabContent as typeof TabContent &
(new () => { $props: _TabsProps })

export { OkuTabContent }

export type { TabsContentProps }
