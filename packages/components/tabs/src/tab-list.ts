import type { MergeProps, PrimitiveProps } from '@oku-ui/primitive'
import { type PropType, defineComponent, h } from 'vue'

/* -------------------------------------------------------------------------------------------------
 * TabList
 * ----------------------------------------------------------------------------------------------- */

const TAB_LIST_NAME = 'TabList' as const

interface TabListProps extends PrimitiveProps {
  /**
   * The active tab value.
   * @default 'tab1'
   * @type string
   * @example
   * ```vue
   * <OkuTabs defaultValue="tab1">
   * <OkuTabList activeTab="tab1">
   * // ...
   * </OkuTabList>
   * </OkuTabs>
   * ```
   * @see link-to-oku-docs/tab
   * */
  activeTab: string
  /**
   * The callback function that is called when the tab value changes.
   * @default () => {}
   * @type (value: string) => void
   * @example
   * ```vue
   * <OkuTabs onValueChange={(value) => console.log(value)}>
   * <OkuTabList onChange={(value) => console.log(value)}>
    // ...
   * </OkuTabList>
   * </OkuTabs>
   * ```
   * @see link-to-oku-docs/tab
   * */
  onChange: (value: string) => void
}

const TabList = defineComponent({
  name: TAB_LIST_NAME,
  inheritAttrs: false,
  props: {
    activeTab: {
      type: String as PropType<string>,
      required: true,
    },
    onChange: {
      type: Function as PropType<(value: string) => void>,
      required: true,
    },
  },
  setup(_, { slots }) {
    const slot = slots.default ? slots.default() : []

    return () => h('div', { 'data-attr': 'tab-list' }, slot)
  },
})

type _TabListProps = MergeProps<TabListProps, typeof TabList>

const OkuTabList = TabList as typeof TabList & (new () => { $props: _TabListProps })

export { OkuTabList }

export type { TabListProps }
