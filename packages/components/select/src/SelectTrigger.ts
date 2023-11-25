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
import type { SelectTriggerNativeElement } from './props'

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

    const inject = useSelectInject(TRIGGER_NAME, scopeOkuSelect.value)
    const popperScope = usePopperScope(scopeOkuSelect.value)
    const getItems = useCollection(scopeOkuSelect)

    const forwardedRef = useForwardRef()

    const composedRefs = useComposedRefs(forwardedRef, selectTriggerRef)

    const _reactive = reactive(selectTriggerPropsRefs)
    const _selectTriggerProps = reactiveOmit(
      _reactive,
      (key, _value) => key === undefined,
    )

    const isDisabled = computed(
      () => inject.disabled?.value || disabled.value || false,
    )

    const [searchRef, handleTypeaheadSearch, resetTypeahead]
      = useTypeaheadSearch((search) => {
        const enabledItems = getItems()?.filter(
          item => !item.disabled,
        )
        const currentItem = enabledItems.find(
          item => item.value === inject?.value?.value,
        )
        const nextItem = findNextItem(enabledItems, search, currentItem)
        if (nextItem !== undefined)
          inject.onValueChange(nextItem.value)
      })

    const handleOpen = () => {
      if (!isDisabled.value) {
        inject.onOpenChange(true)
        // reset typeahead when we open
        resetTypeahead?.()
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
                'type': 'button',
                'role': 'combobox',
                'aria-controls': inject.contentId,
                'aria-expanded': inject.open.value,
                'aria-required': inject.required?.value,
                'aria-autocomplete': 'none',
                'dir': inject.dir.value,
                'data-state': inject.open.value ? 'open' : 'closed',
                'disabled': isDisabled.value,
                'data-disabled': isDisabled.value ? '' : undefined,
                'data-placeholder': shouldShowPlaceholder(
                  inject.value?.value,
                )
                  ? ''
                  : undefined,
                ...mergeProps(attrs, _selectTriggerProps),
                'ref': composedRefs,
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
                'onPointerdown': composeEventHandlers(
                  event => emit('pointerdown', event),
                  (event: PointerEvent) => {
                    // prevent implicit pointer capture
                    // https://www.w3.org/TR/pointerevents3/#implicit-pointer-capture
                    const target = event.target as HTMLElement
                    if (target.hasPointerCapture(event.pointerId))
                      target.releasePointerCapture(event.pointerId)

                    // only call handler if it's the left button (mousedown gets triggered by all mouse buttons)
                    // but not when the control key is pressed (avoiding MacOS right click)
                    if (event.button === 0 && event.ctrlKey === false) {
                      handleOpen()
                      inject.triggerPointerDownPosRef.value = {
                        x: Math.round(event.pageX),
                        y: Math.round(event.pageY),
                      }
                      // prevent trigger from stealing focus from the active item after opening.
                      event.preventDefault()
                    }
                  }),
                'onKeydown': composeEventHandlers(
                  event => emit('keydown', event),
                  (event: KeyboardEvent) => {
                    const isTypingAhead = searchRef.value !== ''
                    const isModifierKey
                    = event.ctrlKey || event.altKey || event.metaKey

                    if (!isModifierKey && event.key.length === 1)
                      handleTypeaheadSearch?.(event.key)
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

export const OkuSelectTrigger = SelectTrigger as typeof SelectTrigger &
(new () => {
  $props: SelectTriggerNativeElement
})
