import { Primitive, primitiveProps } from '@oku-ui/primitive'
import type { ElementType, PrimitiveProps } from '@oku-ui/primitive'
import { computed, defineComponent, h, ref, toRefs, watchEffect } from 'vue'
import type { ComputedRef, PropType, StyleValue } from 'vue'
import { OkuPresence } from '@oku-ui/presence'
import { useForwardRef } from '@oku-ui/use-composable'
import { useTabsInject } from './tabs'
import { makeContentId, makeTriggerId, scopeTabsProps } from './utils'

const TAB_CONTENT_NAME = 'OkuTabContent' as const

export type TabsContentIntrinsicElement = ElementType<'div'>
export type TabsContentElement = HTMLDivElement

export interface TabsContentProps extends PrimitiveProps {
  value: string

  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true
}

export const tabsContentProps = {
  props: {
    value: {
      type: String as PropType<string>,
      required: true,
    },
    forceMount: {
      type: Boolean as PropType<true | undefined>,
      default: false,
    },
    ...primitiveProps,
  },
}

const tabsContent = defineComponent({
  name: TAB_CONTENT_NAME,
  inheritAttrs: false,
  props: {
    ...tabsContentProps.props,
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
        'data-orientation': injectTabs.orientation?.value,
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

export const OkuTabsContent = tabsContent as typeof tabsContent &
(new () => {
  $props: Partial<TabsContentElement> & {
    style?: StyleValue
  }
})
