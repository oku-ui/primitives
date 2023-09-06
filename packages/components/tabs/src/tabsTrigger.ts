import { Primitive, primitiveProps } from '@oku-ui/primitive'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { computed, defineComponent, h, toRefs } from 'vue'
import type { PropType } from 'vue'
import { useForwardRef } from '@oku-ui/use-composable'
import { OkuRovingFocusGroupItem } from '@oku-ui/roving-focus'
import { composeEventHandlers } from '@oku-ui/utils'
import { useRovingFocusGroupScope, useTabsInject } from './tabs'
import { makeContentId, makeTriggerId, scopeTabsProps } from './utils'

export type TabsTriggerElementNaviteElement = OkuElement<'button'>
export type TabsTriggerElement = HTMLButtonElement

const TAB_TRIGGER_NAME = 'OkuTabsTrigger' as const

export interface TabsTriggerProps extends PrimitiveProps {
  value: string
  disabled?: boolean
}

export type TabsTriggerEmits = {
  'mousedown': [event: MouseEvent]
  'keydown': [event: KeyboardEvent]
  'focus': [event: FocusEvent]
}

export const tabsTriggerProps = {
  props: {
    value: {
      type: String as PropType<string>,
      required: true,
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    ...primitiveProps,
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    mousedown: (e: MouseEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    keydown: (e: KeyboardEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    focus: (e: FocusEvent) => true,
  },
}

const tabsTrigger = defineComponent({
  name: TAB_TRIGGER_NAME,
  inheritAttrs: false,
  props: {
    ...tabsTriggerProps.props,
    ...scopeTabsProps,
  },
  emits: tabsTriggerProps.emits,
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

export const OkuTabsTrigger = tabsTrigger as typeof tabsTrigger &
(new () => {
  $props: TabsTriggerElementNaviteElement
})
