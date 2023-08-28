import { Primitive, primitiveProps } from '@oku-ui/primitive'
import type {
  ElementType,
  PrimitiveProps,
} from '@oku-ui/primitive'
import type { PropType } from 'vue'
import { defineComponent, h, toRefs } from 'vue'
import { useForwardRef } from '@oku-ui/use-composable'
import { OkuRovingFocusGroup, createRovingFocusGroupScope } from '@oku-ui/roving-focus'
import { useTabsInject } from './tabs'
import type { ScopeTabs } from './utils'
import { scopeTabsProps } from './utils'

export type TabListElementIntrinsicElement = ElementType<'div'>
export type TabListElement = HTMLDivElement

const TAB_LIST_NAME = 'OkuTabList' as const

export interface TabListProps extends PrimitiveProps {
  loop?: boolean
}

export const tabListProps = {
  props: {
    loop: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    ...primitiveProps,
  },
}
const useRovingFocusGroupScope = createRovingFocusGroupScope()

const TabList = defineComponent({
  name: TAB_LIST_NAME,
  inheritAttrs: false,
  props: {
    ...tabListProps.props,
    ...scopeTabsProps,
  },
  setup(props, { slots, attrs }) {
    const { loop } = toRefs(props)
    const { ...listAttrs } = attrs

    const injectTabs = useTabsInject(TAB_LIST_NAME, props.scopeOkuTabs)
    const forwardedRef = useForwardRef()

    const rovingFocusGroupScope = useRovingFocusGroupScope(props.scopeOkuTabs)

    return () =>
      h(OkuRovingFocusGroup, {
        asChild: true,
        ...rovingFocusGroupScope.value,
        dir: injectTabs.dir?.value,
        loop: loop.value,
        orientation: injectTabs.orientation?.value,
      }, {
        default: () => h(
          Primitive.div,
          {
            'role': 'tablist',
            'aria-orientation': injectTabs.orientation?.value,
            'asChild': props.asChild,
            ...listAttrs,
            'ref': forwardedRef,
          },
          {
            default: () => slots.default?.(),
          },
        ),
      })
  },
})

export const OkuTabList = TabList as typeof TabList &
(new () => {
  $props: ScopeTabs<Partial<TabListElement>>
})
