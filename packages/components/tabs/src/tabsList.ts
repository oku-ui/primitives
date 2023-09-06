import { Primitive, primitiveProps } from '@oku-ui/primitive'
import type {
  OkuElement,
  PrimitiveProps,
} from '@oku-ui/primitive'
import type { PropType } from 'vue'
import { defineComponent, h, toRefs } from 'vue'
import { useForwardRef } from '@oku-ui/use-composable'
import { OkuRovingFocusGroup, createRovingFocusGroupScope } from '@oku-ui/roving-focus'
import { useTabsInject } from './tabs'
import { scopeTabsProps } from './utils'

export type TabsListElementNaviteElement = OkuElement<'div'>
export type TabsListElement = HTMLDivElement

const TAB_LIST_NAME = 'OkuTabsList' as const

export interface TabsListProps extends PrimitiveProps {
  loop?: boolean
}

export const tabsListProps = {
  props: {
    loop: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    ...primitiveProps,
  },
}
const useRovingFocusGroupScope = createRovingFocusGroupScope()

const tabsList = defineComponent({
  name: TAB_LIST_NAME,
  inheritAttrs: false,
  props: {
    ...tabsListProps.props,
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

export const OkuTabsList = tabsList as typeof tabsList &
(new () => {
  $props: TabsListElementNaviteElement
})
