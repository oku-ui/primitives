import { type MergeProps, Primitive, type PrimitiveProps } from '@oku-ui/primitive'
import { type PropType, computed, defineComponent, h, toRefs } from 'vue'
import {
  useArrowNavigation, useRef,
} from '@oku-ui/use-composable'
import type { Scope } from '@oku-ui/provide'
import { useTabsInject } from './tabs'

const TAB_TRIGGER_NAME = 'OkuTabTrigger' as const

interface TabsTriggerProps extends PrimitiveProps {
  value: string
  disabled: boolean
}

const TabTrigger = defineComponent({
  name: TAB_TRIGGER_NAME,
  inheritAttrs: false,
  props: {
    value: {
      type: String as PropType<string>,
      required: true,
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false,
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
    const injectedValue = useTabsInject(TAB_TRIGGER_NAME, scopeTabs.value)

    const { $el, newRef: currentElement } = useRef<HTMLElement>()

    function changeTab(value: string) {
      injectedValue.value.changeModelValue(value)
    }

    function handleKeydown(e: KeyboardEvent) {
      if (!injectedValue.value.parentElement.value || $el.value)
        return
      const newSelectedElement = useArrowNavigation(
        e,
        $el.value,
        injectedValue.value.parentElement.value,
        {
          arrowKeyOptions: injectedValue.value.orientation,
          loop: injectedValue.value.loop,
        },
      )

      if (newSelectedElement) {
        newSelectedElement.focus()
        injectedValue.value.currentFocusedElement!.value = newSelectedElement

        if (injectedValue.value.activationMode === 'automatic') {
          changeTab(
            newSelectedElement.getAttribute('data-oku-ui-tab-value')!,
          )
        }
      }
    }

    const getTabIndex = computed(() => {
      if (!injectedValue.value.currentFocusedElement?.value) {
        return injectedValue.value.modelValue?.value === props.value ? '0' : '-1'
      }
      else {
        return injectedValue.value.currentFocusedElement?.value
          === $el.value
          ? '0'
          : '-1'
      }
    })

    return () =>
      h(
        Primitive.button,
        {
          'ref': currentElement,
          'type': Primitive.button,
          'role': 'tab',
          'aria-selected':
            injectedValue.value.modelValue?.value === props.value ? 'true' : 'false',
          'data-state':
            injectedValue.value.modelValue?.value === props.value
              ? 'active'
              : 'inactive',
          'disabled': props.disabled,
          'data-disabled': props.disabled ? '' : undefined,
          'tabindex': getTabIndex.value,
          'data-orientation': injectedValue.value.orientation,
          'data-oku-ui-collection-item': true,
          'data-oku-ui-tab-value': props.value,
          'onClick': () => changeTab(props.value!),
          'onKeydown': handleKeydown,
          'asChild': props.asChild,
        },
        {
          default: () => slots.default?.(),
        },
      )
  },
})

type _TabsProps = MergeProps<TabsTriggerProps, typeof TabTrigger>

const OkuTabTrigger = TabTrigger as typeof TabTrigger & (new () => { $props: _TabsProps })

export { OkuTabTrigger }

export type { TabsTriggerProps }
