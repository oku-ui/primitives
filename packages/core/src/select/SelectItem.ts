import { createContext, useId, useRef } from '@oku-ui/hooks'
import { SELECTION_KEYS } from '@oku-ui/menu/MenuRoot'
import { mergePrimitiveAttrs, type PrimitiveElAttrs, type RadixPrimitiveReturns } from '@oku-ui/shared'
import { computed, type Ref, shallowRef, watchEffect } from 'vue'
import { useSelectContentContext } from './SelectContent'
import { Collection, type ItemData, useSelectContext } from './SelectRoot'

export interface SelectItemProps {
  value: string
  disabled?: boolean
  textValue?: string
}

export interface UseSelectItemProps {
  value: () => string
  disabled?: () => boolean | undefined
  textValue?: () => string | undefined
}

export interface SelectItemContextValue {
  value: () => string
  disabled: () => boolean | undefined
  textId: string
  isSelected: Ref<boolean>
  onItemTextChange: (node: HTMLElement | undefined) => void
}

export const [provideSelectItemContext, useSelectItemContext] = createContext<SelectItemContextValue>('SelectItem')

export function useSelectItem(props: UseSelectItemProps): RadixPrimitiveReturns {
  const { disabled = () => undefined, value } = props
  const context = useSelectContext('SelectItem')
  const contentContext = useSelectContentContext('SelectItem')
  const isSelected = computed(() => context.value.value === props.value())
  const isFocused = shallowRef(false)

  const itemData: ItemData['$select'] = { value: value(), disabled: disabled(), textValue: props.textValue?.() || '' }

  function setElRef(el: HTMLElement | undefined) {
    contentContext.itemRefCallback?.(el, value(), disabled() ?? false)
    Collection.useCollectionItem(el, itemData, '$select')
  }

  watchEffect(() => {
    itemData.value = value()
    itemData.disabled = props.disabled?.()
  })

  const textId = useId()
  const pointerTypeRef = useRef<PointerEvent['pointerType']>('touch')

  function handleSelect() {
    if (!disabled()) {
      context.onValueChange(value())
      context.onOpenChange(false)
    }
  }

  provideSelectItemContext({
    value,
    disabled,
    textId,
    isSelected,
    onItemTextChange(node) {
      if (!itemData.value && node) {
        itemData.value = itemData.value || (node?.textContent ?? '').trim()
      }
    },
  })

  // TODO: to container events
  function onFocus(event: FocusEvent) {
    if (event.defaultPrevented)
      return
    isFocused.value = true
  }

  function onBlur(event: FocusEvent) {
    if (event.defaultPrevented)
      return
    isFocused.value = false
  }

  function onClick(event: MouseEvent) {
    if (event.defaultPrevented)
      return
    // Open on click when using a touch or pen device
    if (pointerTypeRef.value !== 'mouse')
      handleSelect()
  }

  function onPointerup(event: PointerEvent) {
    if (event.defaultPrevented)
      return
    // Using a mouse you should be able to do pointer down, move through
    // the list, and release the pointer over the item to select it.
    if (pointerTypeRef.value === 'mouse')
      handleSelect()
  }

  function onPointerdown(event: PointerEvent) {
    if (event.defaultPrevented)
      return
    pointerTypeRef.value = event.pointerType
  }

  function onPointermove(event: PointerEvent) {
    if (event.defaultPrevented)
      return
    // Remember pointer type when sliding over to this item from another one
    pointerTypeRef.value = event.pointerType
    // TODO: fix this
    if (disabled()) {
      contentContext.onItemLeave?.()
    }
    else if (pointerTypeRef.value === 'mouse') {
      // even though safari doesn't support this option, it's acceptable
      // as it only means it might scroll a few pixels when using the pointer.
      (event.currentTarget as HTMLElement).focus({ preventScroll: true })
    }
  }

  function onPointerleave(event: PointerEvent) {
    if (event.defaultPrevented)
      return
    if (event.currentTarget === document.activeElement) {
      contentContext.onItemLeave?.()
    }
  }

  function onKeydown(event: KeyboardEvent) {
    if (event.defaultPrevented)
      return
    const isTypingAhead = contentContext.searchRef.value !== ''
    if (isTypingAhead && event.key === ' ')
      return
    if (SELECTION_KEYS.includes(event.key))
      handleSelect()
    // prevent page scroll if using the space key to select an item
    if (event.key === ' ')
      event.preventDefault()
  }

  return {
    attrs(extraAttrs) {
      const _isFocused = isFocused.value
      const _isSelected = isSelected.value
      const _disabled = disabled()

      const attrs: PrimitiveElAttrs = {
        'role': 'option',
        'aria-labelledby': textId,
        'data-highlighted': _isFocused ? '' : undefined,

        // `isFocused` caveat fixes stuttering in VoiceOver
        'aria-selected': _isSelected && _isFocused,
        'data-state': _isSelected ? 'checked' : 'unchecked',
        'aria-disabled': _disabled || undefined,
        'data-disabled': _disabled ? '' : undefined,
        'tabindex': _disabled ? undefined : -1,
        'elRef': setElRef,
        onFocus,
        onBlur,
        onClick,
        onPointerup,
        onPointerdown,
        onPointermove,
        onPointerleave,
        onKeydown,
      }

      if (extraAttrs && extraAttrs.length > 0) {
        mergePrimitiveAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}
