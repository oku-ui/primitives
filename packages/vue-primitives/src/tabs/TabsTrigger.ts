import type { PrimitiveProps } from '../primitive/index.ts'
import type { RadixPrimitiveReturns } from '../shared/index.ts'
import { computed } from 'vue'
import { useRovingFocusGroupItem } from '../roving-focus/RovingFocusGroupItem.ts'
import { mergePrimitiveAttrs } from '../shared/index.ts'
import { useTabsContext } from './TabsRoot.ts'
import { makeContentId, makeTriggerId } from './utils.ts'

export interface TabsTriggerProps {
  as?: PrimitiveProps['as']
  value: string
  disabled?: boolean
}

export interface UseTabsTriggerProps {
  value: () => string
  disabled?: () => boolean | undefined
}

export function useTabsTrigger(props: UseTabsTriggerProps): RadixPrimitiveReturns {
  const { disabled = () => false } = props

  const context = useTabsContext('TabsTrigger')
  const triggerId = computed(() => makeTriggerId(context.baseId, props.value()))
  const contentId = computed(() => makeContentId(context.baseId, props.value()))
  const isSelected = computed(() => context.value.value === props.value())

  function onMousedown(event: MouseEvent) {
    if (event.defaultPrevented)
      return
    // only call handler if it's the left button (mousedown gets triggered by all mouse buttons)
    // but not when the control key is pressed (avoiding MacOS right click)
    if (!disabled() && event.button === 0 && event.ctrlKey === false) {
      context.onValueChange(props.value())
    }
    else {
      // prevent focus to avoid accidental activation
      event.preventDefault()
    }
  }

  function onKeydown(event: KeyboardEvent) {
    if (event.defaultPrevented)
      return
    if ([' ', 'Enter'].includes(event.key))
      context.onValueChange(props.value())
  }

  function onFocus(event: FocusEvent) {
    if (event.defaultPrevented)
      return
    // handle "automatic" activation if necessary
    // ie. activate tab following focus
    const isAutomaticActivation = context.activationMode !== 'manual'
    if (!isSelected.value && !disabled() && isAutomaticActivation) {
      context.onValueChange(props.value())
    }
  }

  const rovingFocusGroupItem = useRovingFocusGroupItem({
    focusable() {
      return !disabled()
    },
    active() {
      return isSelected.value
    },
  })

  return {
    attrs(extraAttrs = []) {
      const _disabled = disabled()

      const attrs = {
        'id': triggerId.value,
        'type': 'button',
        'role': 'tab',
        'aria-selected': isSelected.value,
        'aria-controls': contentId.value,
        'data-state': isSelected.value ? 'active' : 'inactive',
        'data-disabled': _disabled ? '' : undefined,
        'disabled': _disabled,
        onMousedown,
        onKeydown,
        onFocus,
      }

      mergePrimitiveAttrs(attrs, [rovingFocusGroupItem.attrs(), ...extraAttrs])

      return attrs
    },
  }
}
