import { Primitive, primitiveProps } from '@oku-ui/primitive'
import type { ElementType, PrimitiveProps } from '@oku-ui/primitive'
import { computed, defineComponent, h, ref, toRefs, watchEffect } from 'vue'
import type { ComputedRef, PropType } from 'vue'
import { OkuPresence } from '@oku-ui/presence'
import { useForwardRef } from '@oku-ui/use-composable'
import { useTabsInject } from './tabs'
import type { ScopeTabs } from './utils'
import { makeContentId, makeTriggerId, scopeTabsProps } from './utils'

const TAB_CONTENT_NAME = 'OkuTabContent' as const

export type TabsContentIntrinsicElement = ElementType<'div'>
export type TabsContentElement = HTMLDivElement

interface TabsContentProps extends PrimitiveProps {
  value: string

  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true
}

const tabsContentProps = {
  value: {
    type: String as PropType<string>,
    required: true,
  },
  forceMount: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
}

const TabContent = defineComponent({
  name: TAB_CONTENT_NAME,
  inheritAttrs: false,
  props: {
    ...tabsContentProps,
    ...primitiveProps,
    ...scopeTabsProps,
  },
  setup(props, { slots, attrs }) {
    const { value } = toRefs(props)
    const { ...ContentAttrs } = attrs
    const injectTabs = useTabsInject(TAB_CONTENT_NAME, props.scopeOkuTabs)

    const triggerId = makeTriggerId(injectTabs.baseId.value, value.value!)
    const contentId = makeContentId(injectTabs.baseId.value, value.value!)
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
          ...ContentAttrs.style ?? {} as any,
          animationDuration: isMountAnimationPreventedRef.value ? '0s' : undefined,
        },
      }, {
        default: () => isPresent ? slots.default?.() : null,
      }),
    })
  },
})

export const OkuTabContent = TabContent as typeof TabContent &
(new () => {
  $props: ScopeTabs<Partial<TabsContentElement>>
})

export type { TabsContentProps }
