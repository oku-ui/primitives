import { Primitive, primitiveProps } from '@oku-ui/primitive'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { computed, defineComponent, h, mergeProps, onBeforeUnmount, onMounted, reactive, ref, toRefs } from 'vue'
import type { ComputedRef, PropType } from 'vue'
import { OkuPresence } from '@oku-ui/presence'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { useTabsInject } from './tabs'
import { makeContentId, makeTriggerId, scopeTabsProps } from './utils'

const TAB_CONTENT_NAME = 'OkuTabsContent' as const

export type TabsContentNaviteElement = OkuElement<'div'>
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
      default: undefined,
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
    const { scopeOkuTabs, value, forceMount, ...contentProps } = toRefs(props)
    const _reactive = reactive(contentProps)
    const reactiveContentProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const injectTabs = useTabsInject(TAB_CONTENT_NAME, scopeOkuTabs.value)

    const triggerId = makeTriggerId(injectTabs.baseId.value, value.value!)
    const contentId = makeContentId(injectTabs.baseId.value, value.value!)
    const isSelected = computed(() => value.value === injectTabs.value?.value)

    const forwardedRef = useForwardRef()
    const isMountAnimationPreventedRef = ref(isSelected.value)

    const rAf = ref()

    onMounted(() => {
      rAf.value = requestAnimationFrame(() => (isMountAnimationPreventedRef.value = false))
    })

    onBeforeUnmount(() => {
      cancelAnimationFrame(rAf.value)
    })

    const present = computed(() => forceMount.value || isSelected.value)

    return () => h(OkuPresence, {
      present: present.value,
    }, {
      default: ({ isPresent }: { isPresent: ComputedRef<boolean> }) => h(Primitive.div, {
        'data-state': isSelected.value ? 'active' : 'inactive',
        'data-orientation': injectTabs.orientation?.value,
        'role': 'tabpanel',
        'aria-labelledby': triggerId,
        'hidden': !isPresent.value,
        'id': contentId,
        'tabindex': '0',
        ...mergeProps(attrs, reactiveContentProps),
        'ref': forwardedRef,
        'style': {
          ...attrs.style ?? {} as any,
          animationDuration: isMountAnimationPreventedRef.value ? '0s' : undefined,
        },
      }, {
        default: () => isPresent.value ? slots.default?.() : null,
      }),
    })
  },
})

export const OkuTabsContent = tabsContent as typeof tabsContent &
  (new () => {
    $props: TabsContentNaviteElement
  })
