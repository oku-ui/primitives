import { type MergeProps, Primitive, type PrimitiveProps } from '@oku-ui/primitive'
import { type PropType, computed, defineComponent, h, inject } from 'vue'
import {
  useArrowNavigation,
  usePrimitiveElement,
} from '@oku-ui/use-composable'
import type { TabsProvideValue } from './tabs'
import { TABS_INJECTION_KEY } from './tabs'

/* -------------------------------------------------------------------------------------------------
 * TabTrigger
 * ----------------------------------------------------------------------------------------------- */

const TAB_TRIGGER_NAME = 'TabTrigger' as const

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
  },
  setup(props, { slots }) {
    const injectedValue = inject<TabsProvideValue>(TABS_INJECTION_KEY)
    const { primitiveElement, currentElement } = usePrimitiveElement()

    function changeTab(value: string) {
      injectedValue?.changeModelValue(value)
    }

    function handleKeydown(e: KeyboardEvent) {
      if (!injectedValue?.parentElement.value || !currentElement.value)
        return
      const newSelectedElement = useArrowNavigation(
        e,
        currentElement.value,
        injectedValue?.parentElement.value,
        {
          arrowKeyOptions: injectedValue?.orientation,
          loop: injectedValue?.loop,
        },
      )

      if (newSelectedElement) {
        newSelectedElement.focus()
        injectedValue!.currentFocusedElement!.value = newSelectedElement

        if (injectedValue?.activationMode === 'automatic') {
          changeTab(
            newSelectedElement.getAttribute('data-oku-ui-tab-value')!,
          )
        }
      }
    }

    const getTabIndex = computed(() => {
      if (!injectedValue?.currentFocusedElement?.value) {
        return injectedValue?.modelValue?.value === props.value ? '0' : '-1'
      }
      else {
        return injectedValue?.currentFocusedElement?.value
          === currentElement.value
          ? '0'
          : '-1'
      }
    })

    return () =>
      h(
        Primitive.button,
        {
          'ref': primitiveElement,
          'type': Primitive.button,
          'role': 'tab',
          'aria-selected':
            injectedValue?.modelValue?.value === props.value ? 'true' : 'false',
          'data-state':
            injectedValue?.modelValue?.value === props.value
              ? 'active'
              : 'inactive',
          'disabled': props.disabled,
          'data-disabled': props.disabled ? '' : undefined,
          'tabindex': getTabIndex.value,
          'data-orientation': injectedValue?.orientation,
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
