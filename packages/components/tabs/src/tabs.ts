import type { MergeProps, PrimitiveProps } from '@oku-ui/primitive'
import { type PropType, defineComponent, h, ref } from 'vue'
import { OkuTabContent } from './tab-content'
import { OkuTabList } from './tab-list'

/* -------------------------------------------------------------------------------------------------
 * Tabs
 * ----------------------------------------------------------------------------------------------- */

const TAB_NAME = 'TAB' as const

interface TabsProps extends PrimitiveProps {
  /**
   * The default value of the tab.
   * @default 'tab1'
   * @type string
   * @example
   * ```vue
   * <OkuTabs defaultValue="tab1">
      // ...
   * </OkuTabs>
   * ```
   * @see link-to-oku-docs/tab
   */
  defaultValue?: string
  /**
   * The callback function that is called when the tab value changes.
   * @default () => {}
   * @type (value: string) => void
   * @example
   * ```vue
   * <OkuTabs onValueChange={(value) => console.log(value)}>
      //  ...
   * </OkuTabs>
   * */
  onValueChange?: (value: string) => void
  /**
   * The orientation of the tabs.
   * @default 'horizontal'
   * @type 'horizontal' | 'vertical'
   * @example
   * ```vue
   * <OkuTabs orientation="horizontal">
     // ...
   * </OkuTabs>
   * ```
   * @see link-to-oku-docs/tab
   * */
  orientation?: 'horizontal' | 'vertical'
}

const Tabs = defineComponent({
  name: TAB_NAME,
  inheritAttrs: false,
  props: {
    defaultValue: {
      type: String as PropType<string>,
      default: 'tab1',
    },
    onValueChange: {
      type: Function as PropType<(value: string) => void>,
      default: () => {},
    },
    orientation: {
      type: String as PropType<'horizontal' | 'vertical'>,
      default: 'horizontal',
    },
  },
  setup(props, { slots }) {
    const activeTab = ref(props.defaultValue)

    const handleTabChange = (value: string) => {
      activeTab.value = value
      props.onValueChange?.(value)
    }

    return () => {
      const tabListSlot = slots.default
        ? slots.default({ activeTab: activeTab.value })
        : []
      const tabContentSlot = slots.tabContent
        ? slots.tabContent({ activeTab: activeTab.value })
        : []

      return h('div', {}, [
        h(
          // TODO: fix this
          // @ts-expect-error
          OkuTabList,
          {
            activeTab: activeTab.value,
            onChange: handleTabChange,
          },
          tabListSlot,
        ),
        h(
          // TODO: fix this
          // @ts-expect-error
          OkuTabContent,
          {
            activeTab: activeTab.value,
          },
          tabContentSlot.map(contentVNode =>
            h(OkuTabContent, {
              activeTab: activeTab.value,
              value: contentVNode.props?.value,
            }),
          ),
        ),
      ])
    }
  },
})

type _TabsProps = MergeProps<TabsProps, typeof Tabs>

const OkuTabs = Tabs as typeof Tabs & (new () => { $props: _TabsProps })

export { OkuTabs }

export type { TabsProps }
