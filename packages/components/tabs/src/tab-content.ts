import { Primitive, PrimitiveProps } from '@oku-ui/primitive'
import type { ElementType, IPrimitiveProps, InstanceTypeRef, MergeProps } from '@oku-ui/primitive'
import { computed, defineComponent, h, ref, toRefs, watchEffect } from 'vue'
import type { ComputedRef, PropType } from 'vue'
import { OkuPresence } from '@oku-ui/presence'
import { useForwardRef } from '@oku-ui/use-composable'
import type { ScopedPropsInterface } from './tabs'
import { ScopedProps, useTabsInject } from './tabs'
import { makeContentId, makeTriggerId } from './utils'

const TAB_CONTENT_NAME = 'OkuTabContent' as const

type TabsContentElement = ElementType<'div'>
export type _TabsContentEl = HTMLDivElement

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
    ...PrimitiveProps,
    ...ScopedProps,
  },
  setup(props, { slots, attrs }) {
    const { value } = toRefs(props)
    const { ...ContentAttrs } = attrs
    const injectTabs = useTabsInject(TAB_CONTENT_NAME, props.scopeTabs)

    const triggerId = makeTriggerId(injectTabs.baseId, value.value)
    const contentId = makeContentId(injectTabs.baseId, value.value)
    const isSelected = computed(() => value.value === injectTabs.value?.value)

    const forwardedRef = useForwardRef()
    const isMountAnimationPreventedRef = ref(isSelected.value)

    watchEffect((onClean) => {
      const rAF = requestAnimationFrame(() => (isMountAnimationPreventedRef.value = false))
      onClean(() => cancelAnimationFrame(rAF))
    })

    return () => h(OkuPresence, {
      present: isSelected.value || props.forceMount,
    }, {
      default: ({ isPresent }: { isPresent: ComputedRef<boolean> }) => h(Primitive.div, {
        'data-state': isSelected.value ? 'active' : 'inactive',
        'data-orientation': injectTabs.orientation,
        'role': 'tabpanel',
        'aria-labelledby': triggerId,
        'hidden': !isPresent,
        'id': contentId,
        'tabindex': '0',
        ...ContentAttrs,
        'ref': forwardedRef,
        'style': {
          ...attrs.style ?? {},
          animationDuration: isMountAnimationPreventedRef.value ? '0s' : undefined,
        },
      }, {
        default: () => isPresent ? slots.default?.() : null,
      }),
    })
  },
})

type _TabsProps = MergeProps<TabsContentProps, TabsContentElement>

type InstanceTabsContent = InstanceTypeRef<typeof TabContent, _TabsContentEl>

const OkuTabContent = TabContent as typeof TabContent &
(new () => { $props: _TabsProps })

export { OkuTabContent }

export type { TabsContentProps, InstanceTabsContent }
