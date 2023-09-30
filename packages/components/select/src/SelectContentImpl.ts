import type { Ref } from 'vue'
import {
  defineComponent,
  h,
  mergeProps,
  ref,
  toRefs,
  watch,
  watchEffect,
} from 'vue'
import { hideOthers } from 'aria-hidden'

import {
  useComposedRefs,
  useForwardRef,
} from '@oku-ui/use-composable'
import { useFocusGuards } from '@oku-ui/focus-guards'
import { OkuFocusScope } from '@oku-ui/focus-scope'
import { composeEventHandlers } from '@oku-ui/utils'
import { OkuDismissableLayer } from '@oku-ui/dismissable-layer'
import { findNextItem } from './utils'
import type {
  ItemData,
  SelectContentImplElement,
  SelectContentImplEmits,
  SelectItemElement,
  SelectItemTextElement,
  SelectViewportElement,
} from './types'
import { useTypeaheadSearch } from './useTypeAheadSearch'
import {
  CONTENT_IMPL_NAME,
  CONTENT_NAME,
  SelectContentProvider,
  scopeSelectProps,
  selectContentImplProps,
  useCollection,
  useSelectInject,
} from './props'

import { OkuSelectPopperPosition } from './SelectPopperPosition'
import { OkuSelectItemAlignedPosition } from './SelectItemAlignedPosition'

const SelectContentImpl = defineComponent({
  name: CONTENT_IMPL_NAME,
  inheritAttrs: false,
  props: {
    ...selectContentImplProps.props,
    ...scopeSelectProps,
  },
  emits: {
    ...selectContentImplProps.emits,
  },
  setup(props, { emit, slots, attrs }) {
    const {
      scopeOkuSelect,
      position,
      side,
      sideOffset,
      align,
      alignOffset,
      arrowPadding,
      collisionBoundary,
      collisionPadding,
      sticky,
      hideWhenDetached,
      avoidCollisions,
      ...selectContentProps
    } = toRefs(props)

    const selectInject = useSelectInject(CONTENT_NAME, scopeOkuSelect.value)

    const content = ref<SelectContentImplElement | null>(null)
    const viewport = ref<SelectViewportElement | null>(null)
    const selectedItem = ref<SelectItemElement | null>(null)
    const selectedItemText = ref<SelectItemTextElement | null>(null)

    const isPositioned = ref<boolean>(false)
    const firstValidItemFoundRef = ref<boolean>(false)

    const forwardedRef = useForwardRef()
    const composedRefs = useComposedRefs(forwardedRef, content)

    const getItems = useCollection(scopeOkuSelect)

    // aria-hide everything except the content (better supported equivalent to setting aria-modal)
    watch(content, () => {
      if (content.value)
        hideOthers(content.value)
    })

    // Make sure the whole tree has focus guards as our `Select` may be
    // the last element in the DOM (because of the `Portal`)
    useFocusGuards()

    const focusFirst
      = (candidates: Array<Ref<HTMLElement | null>>) => {
        const [firstItem, ...restItems] = getItems()
        const [lastItem] = restItems.slice(-1)

        const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement

        for (const candidate of candidates) {
          // if focus is already where we want to go, we don't want to keep going through the candidates
          if (candidate.value === PREVIOUSLY_FOCUSED_ELEMENT)
            return
          candidate.value?.scrollIntoView({ block: 'nearest' })
          // viewport might have padding so scroll to its edges when focusing first/last items.
          if (candidate === firstItem && viewport.value)
            viewport.value.scrollTop = 0
          if (candidate === lastItem && viewport.value)
            viewport.value.scrollTop = viewport.value.scrollHeight
          candidate.value?.focus()
          if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT)
            return
        }
      }

    const focusSelectedItem = () =>
      focusFirst([selectedItem, content])

    // Since this is not dependent on layout, we want to ensure this runs at the same time as
    // other effects across components. Hence why we don't call `focusSelectedItem` inside `position`.
    watchEffect(() => {
      if (isPositioned.value)
        focusSelectedItem()
    })

    // prevent selecting items on `pointerup` in some cases after opening from `pointerdown`
    // and close on `pointerup` outside.
    const {
      onOpenChange,
      triggerPointerDownPosRef,
      value: selectValue,
    } = selectInject

    watchEffect((onInvalidate) => {
      if (content.value) {
        let pointerMoveDelta = { x: 0, y: 0 }

        const handlePointerMove = (event: PointerEvent) => {
          pointerMoveDelta = {
            x: Math.abs(
              Math.round(event.pageX) - (triggerPointerDownPosRef.value?.x ?? 0),
            ),
            y: Math.abs(
              Math.round(event.pageY) - (triggerPointerDownPosRef.value?.y ?? 0),
            ),
          }
        }

        const handlePointerUp = (event: PointerEvent) => {
          // If the pointer hasn't moved by a certain threshold then we prevent selecting item on `pointerup`.
          if (pointerMoveDelta.x <= 10 && pointerMoveDelta.y <= 10) {
            event.preventDefault()
          }
          else {
            // otherwise, if the event was outside the content, close.
            if (!content.value.contains(event.target as HTMLElement))
              onOpenChange(false)
          }
          document.removeEventListener('pointermove', handlePointerMove)
          triggerPointerDownPosRef.value = null
        }

        if (triggerPointerDownPosRef.value !== null) {
          document.addEventListener('pointermove', handlePointerMove)
          document.addEventListener('pointerup', handlePointerUp, {
            capture: true,
            once: true,
          })
        }

        onInvalidate(() => {
          document.removeEventListener('pointermove', handlePointerMove)
          document.removeEventListener('pointerup', handlePointerUp, {
            capture: true,
          })
        })
      }
    })

    watchEffect((onInvalidate) => {
      const close = () => onOpenChange(false)

      window.addEventListener('blur', close)
      window.addEventListener('resize', close)

      onInvalidate(() => {
        window.removeEventListener('blur', close)
        window.removeEventListener('resize', close)
      })
    })

    const [searchRef, handleTypeaheadSearch] = useTypeaheadSearch((search) => {
      const enabledItems = getItems().filter(
        (item: ItemData) => !item.disabled,
      )
      const currentItem = enabledItems.find(
        (item: ItemData) => item === document.activeElement,
      )
      const nextItem = findNextItem(enabledItems, search, currentItem)

      if (nextItem) {
        /**
         * Imperative focus during keydown is risky so we prevent React's batching updates
         * to avoid potential bugs. See: https://github.com/facebook/react/issues/20332
         */
        setTimeout(() => (nextItem as HTMLElement).focus())
      }
    })

    const itemRefCallback
      = (node: SelectItemElement | null, value: string, disabled: boolean) => {
        const isFirstValidItem = !firstValidItemFoundRef.value && !disabled

        const isSelectedItem
          = selectValue?.value !== undefined && selectValue.value === value
        if (isSelectedItem || isFirstValidItem) {
          selectedItem.value = node

          if (isFirstValidItem)
            firstValidItemFoundRef.value = true
        }
      }

    const handleItemLeave = () => content.value?.focus()

    const itemTextRefCallback
      = (
        node: SelectItemTextElement | null,
        value: string,
        disabled: boolean,
      ) => {
        const isFirstValidItem = !firstValidItemFoundRef.value && !disabled
        const isSelectedItem
          = selectValue?.value !== undefined && selectValue.value === value

        if (isSelectedItem || isFirstValidItem)
          selectedItem.value = node
      }

    const SelectPosition
      = position.value === 'popper'
        ? OkuSelectPopperPosition
        : OkuSelectItemAlignedPosition

    // Silently ignore props that are not supported by `SelectItemAlignedPosition`
    const popperContentProps
      = SelectPosition === OkuSelectPopperPosition
        ? {
            side: side.value,
            sideOffset: sideOffset.value,
            align: align.value,
            alignOffset: alignOffset.value,
            arrowPadding: arrowPadding.value,
            collisionBoundary: collisionBoundary.value,
            collisionPadding: collisionPadding.value,
            sticky: sticky.value,
            hideWhenDetached: hideWhenDetached.value,
            avoidCollisions: avoidCollisions.value,
          }
        : {}

    SelectContentProvider({
      scope: scopeOkuSelect.value,
      content,
      viewport,
      onViewportChange: (node: SelectViewportElement | null) => {
        viewport.value = node
      },
      itemRefCallback: itemRefCallback.value,
      selectedItem,
      onItemLeave: handleItemLeave.value,
      itemTextRefCallback: itemTextRefCallback.value,
      focusSelectedItem: focusSelectedItem.value,
      selectedItemText,
      position,
      isPositioned,
      searchRef,
    })

    return () =>
      h(
        OkuFocusScope,
        {
          asChild: true,
          // we make sure we're not trapping once it's been closed
          // (closed !== unmounted when animating out),
          trapped: selectInject.open.value,
          onMountAutoFocus: (event: Event) => {
            // we prevent open autofocus because we manually focus the selected item
            event.preventDefault()
          },
          onUnmountAutoFocus: composeEventHandlers<
            SelectContentImplEmits['closeAutoFocus'][0]
          >((event: Event) => {
            emit('closeAutoFocus', event)

            selectInject.trigger?.value?.focus!({ preventScroll: true })
            event.preventDefault()
          }),
        },
        {
          default: () =>
            h(
              OkuDismissableLayer,
              {
                asChild: true,
                disableOutsidePointerEvents: true,
                onEscapeKeyDown: (event: Event) => emit('escapeKeyDown', event),
                onPointerdownOutside: (event: Event) =>
                  emit('pointerdownOutside', event),
                onFocusoutside: (event: Event) => event.preventDefault(),
                onDismiss: () => selectInject.onOpenChange(false),
              },
              {
                default: () =>
                  h(
                    SelectPosition,
                    {
                      'role': 'listbox',
                      'id': selectInject.contentId,
                      'data-state': selectInject.open.value ? 'open' : 'closed',
                      'dir': selectInject.dir.value,
                      'onContextMenu': (event: Event) => event.preventDefault(),
                      ...mergeProps(attrs, selectContentProps),
                      ...popperContentProps,
                      'onPlaced': () => (isPositioned.value = true),
                      'ref': composedRefs,
                      'style': {
                        // flex layout so we can place the scroll buttons properly
                        'display': 'flex',
                        'flex-direction': 'column',
                        // reset the outline by default as the content MAY get focused
                        'outline': 'none',
                        ...selectContentProps.style,
                      },
                      'onKeyDown': composeEventHandlers(
                        (event: KeyboardEvent) => {
                          emit('escapeKeyDown', event)

                          const isModifierKey
                            = event.ctrlKey || event.altKey || event.metaKey

                          // select should not be navigated using tab key so we prevent it
                          if (event.key === 'Tab')
                            event.preventDefault()

                          if (!isModifierKey && event.key.length === 1)
                            handleTypeaheadSearch.value(event.key)

                          if (
                            ['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(
                              event.key,
                            )
                          ) {
                            const items = getItems().filter(
                              (item: ItemData) => !item.disabled,
                            )
                            let candidateNodes = items.map(
                              (item: ItemData) => item.ref.current!,
                            )

                            if (['ArrowUp', 'End'].includes(event.key))
                              candidateNodes = candidateNodes.slice().reverse()

                            if (['ArrowUp', 'ArrowDown'].includes(event.key)) {
                              const currentElement
                                = event.target as SelectItemElement
                              const currentIndex
                                = candidateNodes.indexOf(currentElement)
                              candidateNodes = candidateNodes.slice(
                                currentIndex + 1,
                              )
                            }

                            /**
                             * Imperative focus during keydown is risky so we prevent React's batching updates
                             * to avoid potential bugs. See: https://github.com/facebook/react/issues/20332
                             */
                            setTimeout(() => focusFirst.value(candidateNodes))

                            event.preventDefault()
                          }
                        },
                      ),
                    },
                    slots,
                  ),
              },
            ),
        },
      )
  },
})

export const OkuSelectContentImpl
  = SelectContentImpl as typeof SelectContentImpl &
  (new () => {
    $props: SelectContentImplElement
  })
