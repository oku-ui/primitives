import {
  computed,
  defineComponent,
  h,
  mergeProps,
  nextTick,
  onMounted,
  ref,
  toRefs,
} from 'vue'
import {
  useComposedRefs,
  useForwardRef,
  useId,
} from '@oku-ui/use-composable'
import { Primitive } from '@oku-ui/primitive'
import { composeEventHandlers } from '@oku-ui/utils'
import type { SelectItemElement, SelectItemTextElement } from './types'
import {
  CollectionItemSlot,
  ITEM_NAME,
  SelectItemProvider,
  scopeSelectProps,
  selectItemProps,
  useSelectContentInject,
  useSelectInject,
} from './props'
import { SELECTION_KEYS } from './utils'

const SelectItem = defineComponent({
  name: ITEM_NAME,
  inheritAttrs: false,
  props: {
    ...selectItemProps.props,
    ...scopeSelectProps,
  },
  setup(props, { attrs, emit }) {
    const {
      scopeOkuSelect,
      value: itemValue,
      disabled,
      textValue: textValueProp,
      ...selectItemProps
    } = toRefs(props)

    const selectInject = useSelectInject(ITEM_NAME, scopeOkuSelect.value)
    const contentInject = useSelectContentInject(
      ITEM_NAME,
      scopeOkuSelect.value,
    )

    const textValue = ref(textValueProp ?? '')
    const isFocused = ref<boolean>(false)

    const selectItemRef = ref<HTMLDivElement | null>(null)

    const forwardedRef = useForwardRef()
    const composedRefs = useComposedRefs(forwardedRef, selectItemRef)

    const isSelected = computed(
      () => selectInject.value?.value === itemValue.value,
    )

    const textId = useId()

    onMounted(() => {
      nextTick(() => {
        contentInject?.itemRefCallback?.(
          selectItemRef.value as unknown as SelectItemElement,
          itemValue.value,
          disabled.value,
        )
      })
    })

    const handleSelect = () => {
      if (!disabled.value) {
        selectInject.onValueChange(itemValue.value)
        selectInject.onOpenChange(false)
      }
    }

    if (itemValue.value === '') {
      throw new Error(
        'A <SelectItem /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.',
      )
    }

    SelectItemProvider({
      scope: scopeOkuSelect.value,
      value: itemValue,
      disabled,
      textId,
      isSelected,
      onItemTextChange: (node: SelectItemTextElement | null) => {
        textValue.value = textValue.value || (node?.textContent ?? '').trim()
      },
    })

    return () =>
      h(
        CollectionItemSlot,
        {
          scope: scopeOkuSelect.value,
          value: itemValue.value,
          disabled: disabled.value,
          textValue: textValue.value,
        },
        {
          default: () =>
            h(Primitive.div, {
              'role': 'option',
              'aria-labelledby': textId,
              'data-highlighted': isFocused.value ? '' : undefined,
              // `isFocused` caveat fixes stuttering in VoiceOver
              'aria-selected': isSelected.value && isFocused.value,
              'data-state': isSelected.value ? 'checked' : 'unchecked',
              'aria-disabled': disabled.value || undefined,
              'data-disabled': disabled.value ? '' : undefined,
              'tabindex': disabled.value ? undefined : '-1',
              ...mergeProps(attrs, selectItemProps),
              'ref': composedRefs,
              'onFocus': composeEventHandlers((event: FocusEvent) => {
                emit('focus', event)

                isFocused.value = true
              }),
              'onBlur': composeEventHandlers((event: FocusEvent) => {
                emit('blur', event)

                isFocused.value = false
              }),
              'onPointerUp': composeEventHandlers((event: PointerEvent) => {
                emit('pointerup', event)
                handleSelect()
              }),
              'onPointerMove': composeEventHandlers((event: PointerEvent) => {
                emit('pointermove', event)

                if (disabled.value) {
                  contentInject.onItemLeave?.()
                }
                else {
                  // even though safari doesn't support this option, it's acceptable
                  // as it only means it might scroll a few pixels when using the pointer.
                  (event.currentTarget as HTMLElement).focus({
                    preventScroll: true,
                  })
                }
              }),
              'onPointerLeave': composeEventHandlers((event: PointerEvent) => {
                emit('pointerleave', event)

                if (event.currentTarget === document.activeElement)
                  contentInject.onItemLeave?.()
              }),
              'onKeyDown': composeEventHandlers((event: KeyboardEvent) => {
                emit('keydown', event)

                const isTypingAhead = contentInject.searchRef?.value !== ''

                if (isTypingAhead && event.key === ' ')
                  return
                if (SELECTION_KEYS.includes(event.key))
                  handleSelect()
                // prevent page scroll if using the space key to select an item
                if (event.key === ' ')
                  event.preventDefault()
              }),
            }),
        },
      )
  },
})

export const OkuSelectItem = SelectItem as typeof SelectItem &
(new () => {
  $props: SelectItemElement
})
