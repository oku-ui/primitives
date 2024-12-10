import type { CollectionItemWithData } from '../collection'
import type { PrimitiveProps } from '../primitive'
import { useRef } from '../hooks'
import { usePopperContext } from '../popper'
import { mergePrimitiveAttrs, type PrimitiveDefaultProps, type PrimitiveElAttrs, type RadixPrimitiveReturns } from '../shared'
import { computed, onMounted } from 'vue'
import { type ItemData, useCollection, useSelectContext } from './SelectRoot'
import { findNextItem, shouldShowPlaceholder, useTypeaheadSearch } from './utils'

export interface SelectTriggerProps {
  as?: PrimitiveProps['as']
  disabled?: boolean
}

export const DEFAULT_SELECT_TRIGGER_PROPS = {
  as: 'button',
  disabled: undefined,
} satisfies PrimitiveDefaultProps<SelectTriggerProps>

const OPEN_KEYS = [' ', 'Enter', 'ArrowUp', 'ArrowDown']

export interface UseSelectTriggerProps {
  disabled?: () => boolean | undefined
}

export function useSelectTrigger(props: UseSelectTriggerProps): RadixPrimitiveReturns {
  const context = useSelectContext('SelectTrigger')
  const disabled = computed(() => context.disabled?.() ?? props.disabled?.())

  const getItems = useCollection()

  let pointerTypeRef: PointerEvent['pointerType'] = 'touch'

  const [searchRef, handleTypeaheadSearch, resetTypeahead] = useTypeaheadSearch((search) => {
    const enabledItems: Array<CollectionItemWithData<HTMLElement, ItemData>> = []
    let currentItem: CollectionItemWithData<HTMLElement, ItemData> | undefined
    const _value = context.value.value

    for (const item of getItems()) {
      const data = item.$$rcid.$select

      if (!data.disabled) {
        enabledItems.push(item)

        if (data.value === _value) {
          currentItem = item
        }
      }
    }

    const nextItem = findNextItem(enabledItems, search, currentItem)

    if (nextItem !== undefined) {
      context.onValueChange(nextItem.$$rcid.$select.value)
    }
  })

  function handleOpen(pointerEvent?: MouseEvent | PointerEvent) {
    if (!disabled.value) {
      context.onOpenChange(true)
      // reset typeahead when we open
      resetTypeahead()
    }

    if (pointerEvent) {
      context.triggerPointerDownPosRef.value = {
        x: Math.round(pointerEvent.pageX),
        y: Math.round(pointerEvent.pageY),
      }
    }
  };

  // Enable compatibility with native label or custom `Label` "click" for Safari:
  function onClick(event: MouseEvent) {
    if (event.defaultPrevented) {
      return
    }
    // Whilst browsers generally have no issue focusing the trigger when clicking
    // on a label, Safari seems to struggle with the fact that there's no `onClick`.
    // We force `focus` in this case. Note: this doesn't create any other side-effect
    // because we are preventing default in `onPointerDown` so effectively
    // this only runs for a label "click"
    const target = event.currentTarget as HTMLElement
    target.focus()

    // Open on click when using a touch or pen device
    if (pointerTypeRef !== 'mouse') {
      handleOpen(event)
    }
  }

  function onPointerdown(event: PointerEvent) {
    if (event.defaultPrevented) {
      return
    }
    pointerTypeRef = event.pointerType

    // prevent implicit pointer capture
    // https://www.w3.org/TR/pointerevents3/#implicit-pointer-capture
    const target = event.target as HTMLElement
    if (target.hasPointerCapture(event.pointerId)) {
      target.releasePointerCapture(event.pointerId)
    }

    // only call handler if it's the left button (mousedown gets triggered by all mouse buttons)
    // but not when the control key is pressed (avoiding MacOS right click); also not for touch
    // devices because that would open the menu on scroll. (pen devices behave as touch on iOS).
    if (event.button === 0 && event.ctrlKey === false && event.pointerType === 'mouse') {
      handleOpen(event)
      // prevent trigger from stealing focus from the active item after opening.
      event.preventDefault()
    }
  }

  function onKeydown(event: KeyboardEvent) {
    if (event.defaultPrevented) {
      return
    }
    const isTypingAhead = searchRef.value !== ''
    const isModifierKey = event.ctrlKey || event.altKey || event.metaKey
    if (!isModifierKey && event.key.length === 1)
      handleTypeaheadSearch(event.key)
    if (isTypingAhead && event.key === ' ')
      return
    if (OPEN_KEYS.includes(event.key)) {
      handleOpen()
      event.preventDefault()
    }
  }

  // COMP::PopperAnchor

  const popperContext = usePopperContext('HoverCardTrigger')

  const el = useRef<HTMLElement>()
  function setElRef(v: HTMLElement | undefined) {
    el.value = v
  }

  onMounted(() => {
    popperContext.onAnchorChange(el.value)
  })

  return {
    attrs(extraAttrs) {
      const _open = context.open.value
      const _disabled = disabled.value
      const attrs: PrimitiveElAttrs = {
        'elRef': setElRef,
        'type': 'button',
        'role': 'combobox',
        'aria-controls': context.contentId,
        'aria-expanded': _open,
        'aria-required': context.required?.(),
        'aria-autocomplete': 'none',
        'dir': context.dir.value,
        'data-state': _open ? 'open' : 'closed',
        'disabled': _disabled,
        'data-disabled': _disabled ? '' : undefined,
        'data-placeholder': shouldShowPlaceholder(context.value.value) ? '' : undefined,
        onClick,
        onPointerdown,
        onKeydown,
      }

      if (extraAttrs && extraAttrs.length > 0) {
        mergePrimitiveAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}
