import {
  computed,
  defineComponent,
  h,
  mergeProps,
  reactive,
  ref,
  toRefs,
} from 'vue'
import {
  reactiveOmit,
  useComposedRefs,
  useForwardRef,
} from '@oku-ui/use-composable'
import { OkuPopperAnchor } from '@oku-ui/popper'
import { Primitive } from '@oku-ui/primitive'
import { composeEventHandlers } from '@oku-ui/utils'
import {
  TRIGGER_NAME,
  scopeSelectProps,
  selectTriggerProps,
  useCollection,
  usePopperScope,
  useSelectInject,
} from './props'
import { useTypeaheadSearch } from './useTypeAheadSearch'
import { OPEN_KEYS, findNextItem, shouldShowPlaceholder } from './utils'
import type { ItemData } from './types'

const SelectTrigger = defineComponent({
  name: TRIGGER_NAME,
  inheritAttrs: false,
  props: {
    ...selectTriggerProps.props,
    ...scopeSelectProps,
  },
  emits: {
    ...selectTriggerProps.emits,
  },
  setup(props, { attrs, slots, emit }) {
    const { disabled, scopeOkuSelect, ...selectTriggerPropsRefs }
      = toRefs(props)
    const selectTriggerRef = ref<HTMLButtonElement | null>(null)

    const {
      contentId,
      disabled: selectContextDisabled,
      value: contextValueProp,
      onValueChange,
      open,
      required,
      onOpenChange,
      dir,
      ...selectContext
    } = useSelectInject(TRIGGER_NAME, scopeOkuSelect.value)
    const popperScope = usePopperScope(scopeOkuSelect)
    const getItems = useCollection(scopeOkuSelect)

    const forwardedRef = useForwardRef()

    const composedRefs = useComposedRefs(forwardedRef, selectTriggerRef)

    const _reactive = reactive(selectTriggerPropsRefs)
    const _selectTriggerProps = reactiveOmit(
      _reactive,
      (key, _value) => key === undefined,
    )

    const isDisabled = computed(
      () => selectContextDisabled?.value || disabled.value,
    )

    const [searchRef, handleTypeaheadSearch, resetTypeahead]
      = useTypeaheadSearch((search) => {
        const enabledItems = getItems()?.filter(
          (item: ItemData) => !item.disabled,
        )
        const currentItem = enabledItems.find(
          (item: ItemData) => item.value === contextValueProp?.value,
        )
        const nextItem = findNextItem(enabledItems, search, currentItem)
        if (nextItem !== undefined)
          onValueChange(nextItem.value)
      })

    const handleOpen = () => {
      if (!isDisabled.value) {
        onOpenChange(true)
        // reset typeahead when we open
        resetTypeahead.value?.()
      }
    }

    return () =>
      h(
        OkuPopperAnchor,
        {
          asChild: true,
          ...popperScope,
        },
        {
          default: () =>
            h(
              Primitive.button,
              {
                'ref': composedRefs,
                'type': 'button',
                'role': 'combobox',
                'aria-controls': contentId,
                'aria-expanded': open.value,
                'aria-required': required?.value,
                'aria-autocomplete': 'none',
                'dir': dir.value,
                'data-state': open.value ? 'open' : 'closed',
                'disabled': isDisabled.value,
                'data-disabled': isDisabled.value ? '' : undefined,
                'data-placeholder': shouldShowPlaceholder(
                  contextValueProp?.value,
                )
                  ? ''
                  : undefined,
                ...mergeProps(attrs, _selectTriggerProps),
                // Enable compatibility with native label or custom `Label` "click" for Safari:
                'onClick': composeEventHandlers((event: Event) => {
                  emit('click', event);
                  // Whilst browsers generally have no issue focusing the trigger when clicking
                  // on a label, Safari seems to struggle with the fact that there's no `onClick`.
                  // We force `focus` in this case. Note: this doesn't create any other side-effect
                  // because we are preventing default in `onPointerDown` so effectively
                  // this only runs for a label "click"
                  (event.currentTarget as HTMLButtonElement)?.focus()
                }),
                'onPointerDown': composeEventHandlers((event: PointerEvent) => {
                  emit('pointerdown', event)

                  // prevent implicit pointer capture
                  // https://www.w3.org/TR/pointerevents3/#implicit-pointer-capture
                  const target = event.target as HTMLElement
                  if (target.hasPointerCapture(event.pointerId))
                    target.releasePointerCapture(event.pointerId)

                  // only call handler if it's the left button (mousedown gets triggered by all mouse buttons)
                  // but not when the control key is pressed (avoiding MacOS right click)
                  if (event.button === 0 && event.ctrlKey === false) {
                    handleOpen()
                    selectContext.triggerPointerDownPosRef.value = {
                      x: Math.round(event.pageX),
                      y: Math.round(event.pageY),
                    }
                    // prevent trigger from stealing focus from the active item after opening.
                    event.preventDefault()
                  }
                }),
                'onKeyDown': composeEventHandlers((event: KeyboardEvent) => {
                  emit('keydown', event)

                  const isTypingAhead = searchRef.value !== ''
                  const isModifierKey
                    = event.ctrlKey || event.altKey || event.metaKey

                  if (!isModifierKey && event.key.length === 1)
                    handleTypeaheadSearch.value?.(event.key)
                  if (isTypingAhead && event.key === ' ')
                    return

                  if (OPEN_KEYS.includes(event.key)) {
                    handleOpen()
                    event.preventDefault()
                  }
                }),
              },
              slots,
            ),
        },
      )
  },
})
