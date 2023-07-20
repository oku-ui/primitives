import {
  type MergeProps,
  Primitive,
  type PrimitiveProps,
} from '@oku-ui/primitive'
import type { PropType } from 'vue'
import { defineComponent, h, onMounted, toRefs } from 'vue'
import { useRef } from '@oku-ui/use-composable'
import type { Scope } from '@oku-ui/provide'
import { useTabsInject } from './tabs'

const TAB_LIST_NAME = 'OkuTabList' as const

interface TabListProps extends PrimitiveProps {
  loop?: boolean
}

const TabList = defineComponent({
  name: TAB_LIST_NAME,
  inheritAttrs: false,
  props: {
    loop: {
      type: Boolean as PropType<boolean>,
      default: true,
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
    const injectTabs = useTabsInject(TAB_LIST_NAME, scopeTabs.value)

    const { $el, newRef: parentElement }
      = useRef<HTMLElement>()

    onMounted(() => {
      injectTabs.value.parentElement.value = $el.value
      injectTabs.value.loop = props.loop
    })

    return () =>
      h(
        Primitive.div,
        {
          'role': 'tab-list',
          'ref': parentElement,
          'aria-orientation': injectTabs.value.orientation,
          'tabindex': 0,
          'data-orientation': injectTabs.value.orientation,
          'style': 'outline: none',
          'asChild': props.asChild,
        },
        {
          default: () => slots.default?.(),
        },
      )
  },
})

type _TabListProps = MergeProps<TabListProps, typeof TabList>

const OkuTabList = TabList as typeof TabList & (new () => { $props: _TabListProps })

export { OkuTabList }

export type { TabListProps }
