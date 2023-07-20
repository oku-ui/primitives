import { type MergeProps, Primitive, type PrimitiveProps } from '@oku-ui/primitive'
import { type PropType, computed, defineComponent, h, toRefs } from 'vue'
import type { Scope } from '@oku-ui/provide'
import { useTabsInject } from './tabs'

const TAB_CONTENT_NAME = 'OkuTabContent' as const

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
    asChild: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    scopeTabs: {
      type: Object as unknown as PropType<Scope>,
      required: false,
      default: undefined,
    },
  },
  setup(props, { slots }) {
    const { scopeTabs } = toRefs(props)
    const injectTabs = useTabsInject(TAB_CONTENT_NAME, scopeTabs.value)

    const dataState = computed<'active' | 'inactive'>(() => {
      return injectTabs.value.modelValue?.value === props.value
        ? 'active'
        : 'inactive'
    })

    const shouldRender = computed(() => {
      return (
        injectTabs.value.modelValue?.value === props.value || props.forceMount
      )
    })

    return () =>
      h('div', [
        shouldRender.value
          ? h(
            Primitive.div,
            {
              'vIf': injectTabs.value.modelValue?.value === props.value,
              'role': 'tab-content',
              'data-state': dataState.value,
              'data-orientation': injectTabs.value.orientation,
              'tabindex': '0',
              'asChild': props.asChild,
            },
            {
              default: () => slots.default?.(),
            },
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
