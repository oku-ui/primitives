import { Primitive, primitiveProps } from '@oku-ui/primitive'
import type {
  OkuElement,
  PrimitiveProps,
} from '@oku-ui/primitive'
import type { PropType } from 'vue'
import { computed, defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
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
      default: undefined,
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
    const { loop: asLoop, scopeOkuTabs, ...listprops } = toRefs(props)
    const loop = computed(() => asLoop?.value ?? true)

    const _reactive = reactive(listprops)
    const reactiveListProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const injectTabs = useTabsInject(TAB_LIST_NAME, scopeOkuTabs.value)
    const forwardedRef = useForwardRef()

    const rovingFocusGroupScope = useRovingFocusGroupScope(scopeOkuTabs.value)

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
            ...mergeProps(attrs, reactiveListProps),
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
