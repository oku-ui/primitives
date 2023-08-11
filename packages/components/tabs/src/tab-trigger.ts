import { Primitive, PrimitiveProps } from '@oku-ui/primitive'
import type { ElementType, IPrimitiveProps, InstanceTypeRef, MergeProps } from '@oku-ui/primitive'
import { type PropType, computed, defineComponent, h, toRefs } from 'vue'
import { useForwardRef } from '@oku-ui/use-composable'
import { OkuRovingFocusGroupItem } from '@oku-ui/roving-focus'
import { composeEventHandlers } from '@oku-ui/utils'
import type { ScopedPropsInterface } from './tabs'
import { ScopedProps, useRovingFocusGroupScope, useTabsInject } from './tabs'
import { makeContentId, makeTriggerId } from './utils'

type TabsTriggerElement = ElementType<'button'>
export type _TabsTriggerEl = HTMLButtonElement

const TAB_TRIGGER_NAME = 'OkuTabTrigger' as const

interface TabsTriggerProps extends ScopedPropsInterface<IPrimitiveProps> {
  value: string
  disabled?: boolean
  onMousedown?: (event: MouseEvent) => void
  onKeydown?: (event: KeyboardEvent) => void
  onFocus?: (event: FocusEvent) => void
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
    onMousedown: Function as PropType<(e: MouseEvent) => void>,
    onKeydown: Function as PropType<(e: KeyboardEvent) => void>,
    onFocus: Function as PropType<(e: FocusEvent) => void>,
    ...ScopedProps,
    ...PrimitiveProps,
  },
  setup(props, { slots, attrs }) {
    const { scopeTabs, value, disabled } = toRefs(props)
    const { ...triggerAttrs } = attrs
    const injectedValue = useTabsInject(TAB_TRIGGER_NAME, scopeTabs.value)

    const forwardedRef = useForwardRef()

    const rovingFocusGroupScope = useRovingFocusGroupScope(scopeTabs.value)
    const triggerId = makeTriggerId(injectedValue.value.baseId, value.value)
    const contentId = makeContentId(injectedValue.value.baseId, value.value)
    const isSelected = computed(() => (value.value === injectedValue.value.value))
    console.log(rovingFocusGroupScope.value)
    return () =>
      h(OkuRovingFocusGroupItem, {
        asChild: true,
        ...rovingFocusGroupScope.value,
        active: isSelected.value,
        focusable: !disabled.value,
      }, {
        default: () => h(
          Primitive.button,
          {
            'type': 'button',
            'role': 'tab',
            'aria-selected': isSelected.value,
            'aria-controls': contentId,
            'data-state': isSelected.value ? 'active' : 'inactive',
            'disabled': disabled.value,
            'id': triggerId,
            ...triggerAttrs,
            'ref': forwardedRef,
            'onMousedown': composeEventHandlers(props.onMousedown, (event: MouseEvent) => {
              // only call handler if it's the left button (mousedown gets triggered by all mouse buttons)
              // but not when the control key is pressed (avoiding MacOS right click)
              if (!disabled.value && event.button === 0 && event.ctrlKey === false) {
                injectedValue.value.onValueChange(value.value)
              }
              else {
                // prevent focus to avoid accidental activation
                event.preventDefault()
              }
            }),
            'onKeydown': composeEventHandlers(props.onKeydown, (event: KeyboardEvent) => {
              if ([' ', 'Enter'].includes(event.key))
                injectedValue.value.onValueChange(value.value)
            }),
            'onFocus': composeEventHandlers(props.onFocus, () => {
              // handle "automatic" activation if necessary
              // ie. activate tab following focus
              const isAutomaticActivation = injectedValue.value.activationMode !== 'manual'
              if (!isSelected.value && !disabled.value && isAutomaticActivation)
                injectedValue.value.onValueChange(value.value)
            }),
          },
          {
            default: () => slots.default?.(),
          },
        ),
      })
  },
})

type _TabsProps = MergeProps<TabsTriggerProps, TabsTriggerElement>

export type InstanceTabsTriggerType = InstanceTypeRef<typeof TabTrigger, _TabsTriggerEl>

const OkuTabTrigger = TabTrigger as typeof TabTrigger & (new () => { $props: _TabsProps })

export { OkuTabTrigger }

export type { TabsTriggerProps }
