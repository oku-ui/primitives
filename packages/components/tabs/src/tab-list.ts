import {
  type MergeProps,
  Primitive,
  type PrimitiveProps,
} from '@oku-ui/primitive'
import type { PropType } from 'vue'
import { defineComponent, h, inject, onMounted } from 'vue'
import { usePrimitiveElement } from '@oku-ui/use-composable'
import type { TabsProvideValue } from './tabs'
import { TABS_INJECTION_KEY } from './tabs'

/* -------------------------------------------------------------------------------------------------
 * TabList
 * ----------------------------------------------------------------------------------------------- */

const TAB_LIST_NAME = 'TabList' as const

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
  },
  setup(props, { slots }) {
    const injectedValue = inject<TabsProvideValue>(TABS_INJECTION_KEY)
    const { primitiveElement, currentElement: parentElement }
      = usePrimitiveElement()

    onMounted(() => {
      injectedValue!.parentElement.value = parentElement.value
      injectedValue!.loop = props.loop
    })

    return () =>
      h(
        Primitive.div,
        {
          'role': 'tab-list',
          'ref': primitiveElement,
          'aria-orientation': injectedValue?.orientation,
          'tabindex': 0,
          'data-orientation': injectedValue?.orientation,
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
