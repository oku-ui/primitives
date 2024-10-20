import type { PrimitiveProps } from '../primitive'
import { onMounted } from 'vue'
import { usePopperContext } from '../popper/index.ts'
import { mergePrimitiveAttrs, type PrimitiveDefaultProps, type PrimitiveElAttrs, type RadixPrimitiveReturns } from '../shared/index.ts'
import { useDropdownMenuContext } from './DropdownMenuRoot.ts'

export interface DropdownMenuTriggerProps {
  as?: PrimitiveProps['as']
  disabled?: boolean
}

export const DEFAULT_DROPDOWN_MENU_TRIGGER_PROPS = {
  as: 'button',
  disabled: undefined,
} satisfies PrimitiveDefaultProps<DropdownMenuTriggerProps>

export interface UseDropdownMenuTriggerProps {
  disabled?: () => boolean | undefined
}

export function useDropdownMenuTrigger(props: UseDropdownMenuTriggerProps = {}): RadixPrimitiveReturns {
  const context = useDropdownMenuContext('DropdownMenuTrigger')
  const popperContext = usePopperContext('DropdownMenuTrigger')

  function onPointerdown(event: PointerEvent) {
    if (event.defaultPrevented)
      return
    // only call handler if it's the left button (mousedown gets triggered by all mouse buttons)
    // but not when the control key is pressed (avoiding MacOS right click)
    if (event.button === 0 && event.ctrlKey === false) {
      const isOpen = context.open()
      context.onOpenToggle()
      // prevent trigger focusing when opening
      // this allows the content to be given focus without competition
      if (!isOpen)
        event.preventDefault()
    }
  }

  function onKeydown(event: KeyboardEvent) {
    if (event.defaultPrevented)
      return
    if (['Enter', ' '].includes(event.key))
      context.onOpenToggle()
    if (event.key === 'ArrowDown')
      context.onOpenChange(true)
    // prevent keydown from scrolling window / first focused item to execute
    // that keydown (inadvertently closing the menu)
    if (['Enter', ' ', 'ArrowDown'].includes(event.key))
      event.preventDefault()
  }

  // COMP::MenuAnchor COMP::PopperAnchor

  function setTemplateEl(el: HTMLElement | undefined) {
    context.triggerRef.value = el
  }

  onMounted(() => {
    popperContext.onAnchorChange(context.triggerRef.value)
  })

  return {
    attrs(extraAttrs) {
      const _open = context.open()
      const _disabled = props.disabled?.()
      const attrs: PrimitiveElAttrs = {
        'elRef': setTemplateEl,
        'id': context.triggerId,
        'type': 'button',
        'aria-haspopup': 'menu',
        'aria-expanded': _open,
        'aria-controls': _open ? context.contentId : undefined,
        'data-disabled': _disabled ? '' : undefined,
        'disabled': _disabled,
        onPointerdown,
        onKeydown,
      }

      if (extraAttrs && extraAttrs.length > 0)
        mergePrimitiveAttrs(attrs, extraAttrs)

      return attrs
    },
  }
}
