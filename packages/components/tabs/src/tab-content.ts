import type { IPrimitiveProps, MergeProps } from '@oku-ui/primitive'
import { computed, defineComponent, ref, toRefs, watchEffect } from 'vue'
import type { PropType } from 'vue'
import type { ScopedPropsInterface } from './tabs'
import { ScopedProps, useTabsInject } from './tabs'
import { makeContentId, makeTriggerId } from './utils'

const TAB_CONTENT_NAME = 'OkuTabContent' as const

interface TabsContentProps extends ScopedPropsInterface<IPrimitiveProps> {
  value: string

  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true
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
    ...ScopedProps,
  },
  setup(props, { slots }) {
    const { scopeTabs, value } = toRefs(props)
    const injectTabs = useTabsInject(TAB_CONTENT_NAME, scopeTabs.value)

    const triggerId = makeTriggerId(injectTabs.value.baseId, value.value)
    const contentId = makeContentId(injectTabs.value.baseId, value.value)
    const isSelected = computed(() => value.value === injectTabs.value.value)

    const isMountAnimationPreventedRef = ref(isSelected.value)

    watchEffect((onClean) => {
      const rAF = requestAnimationFrame(() => (isMountAnimationPreventedRef.value = false))
      onClean(() => cancelAnimationFrame(rAF))
    })

    // TODO: presence
    // h(OkuPresence, {

    // }, {
    //   default: () => h(
    //     Primitive.div,
    //     {
    //       'role': 'tab-content',
    //       'data-orientation': injectTabs.value.orientation,
    //       'tabindex': '0',
    //       'asChild': props.asChild,
    //     },
    //     {
    //       default: () => slots.default?.(),
    //     },
    //   ),
    // })
  },
})

type _TabsProps = MergeProps<TabsContentProps, typeof TabContent>

const OkuTabContent = TabContent as typeof TabContent &
(new () => { $props: _TabsProps })

export { OkuTabContent }

export type { TabsContentProps }
