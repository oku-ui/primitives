import { Primitive, primitiveProps } from '@oku-ui/primitive'
import type { ElementType, PrimitiveProps } from '@oku-ui/primitive'
import { type PropType, computed, defineComponent, h, toRefs } from 'vue'
import { useForwardRef } from '@oku-ui/use-composable'
import { OkuRovingFocusGroupItem } from '@oku-ui/roving-focus'
import { composeEventHandlers } from '@oku-ui/utils'
import { useRovingFocusGroupScope, useTabsInject } from './tabs'
import type { ScopeTabs } from './utils'
import { makeContentId, makeTriggerId, scopeTabsProps } from './utils'

export type TabsTriggerElementIntrinsicElement = ElementType<'button'>
export type TabsTriggerElement = HTMLButtonElement

const TAB_TRIGGER_NAME = 'OkuTabTrigger' as const

interface TabsTriggerProps extends PrimitiveProps {
  value: string
  disabled?: boolean
  onMousedown?: (event: MouseEvent) => void
  onKeydown?: (event: KeyboardEvent) => void
  onFocus?: (event: FocusEvent) => void
}

const tabsTriggerProps = {
  value: {
    type: String as PropType<string>,
    required: true,
  },
  disabled: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
}

const TabTrigger = defineComponent({
  name: TAB_TRIGGER_NAME,
  inheritAttrs: false,
  props: {
    ...tabsTriggerProps,
    ...scopeTabsProps,
    ...primitiveProps,
  },
  emits: {
    mousedown: (e: MouseEvent) => true,
    keydown: (e: KeyboardEvent) => true,
    focus: (e: FocusEvent) => true,
  },
  setup(props, { slots, attrs, emit }) {
    const { scopeOkuTabs, value, disabled } = toRefs(props)
    const { ...triggerAttrs } = attrs
    const injectTabs = useTabsInject(TAB_TRIGGER_NAME, scopeOkuTabs.value)

    const forwardedRef = useForwardRef()

    const rovingFocusGroupScope = useRovingFocusGroupScope(scopeOkuTabs.value)
    const triggerId = computed(() => makeTriggerId(injectTabs.baseId.value, value.value!))
    const contentId = makeContentId(injectTabs.baseId.value, value.value!)
    const isSelected = computed(() => (value.value === injectTabs.value?.value))

    return () =>
      h(OkuRovingFocusGroupItem, {
        asChild: true,
        ...rovingFocusGroupScope,
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
            'data-disabled': disabled.value ? '' : undefined,
            'disabled': disabled.value,
            'id': triggerId.value,
            ...triggerAttrs,
            'ref': forwardedRef,
            'onMousedown': composeEventHandlers<MouseEvent>((e) => {
              emit('mousedown', e)
            }, (event) => {
              // only call handler if it's the left button (mousedown gets triggered by all mouse buttons)
              // but not when the control key is pressed (avoiding MacOS right click)
              if (!disabled.value && event.button === 0 && event.ctrlKey === false) {
                injectTabs.onValueChange(value.value!)
              }
              else {
                // prevent focus to avoid accidental activation
                event.preventDefault()
              }
            }),
            'onKeydown': composeEventHandlers<KeyboardEvent>((e) => {
              emit('keydown', e)
            }, (event) => {
              if ([' ', 'Enter'].includes(event.key))
                injectTabs.onValueChange(value.value!)
            }),
            'onFocus': composeEventHandlers<FocusEvent>((e) => {
              emit('focus', e)
            }, () => {
              // handle "automatic" activation if necessary
              // ie. activate tab following focus
              const isAutomaticActivation = injectTabs.activationMode?.value !== 'manual'
              if (!isSelected.value && !disabled.value && isAutomaticActivation)
                injectTabs.onValueChange(value.value!)
            }),
          },
          {
            default: () => slots.default?.(),
          },
        ),
      })
  },
})

export const OkuTabTrigger = TabTrigger as typeof TabTrigger &
(new () => {
  $props: ScopeTabs<Partial<TabsTriggerElement>>
})

export type { TabsTriggerProps }
