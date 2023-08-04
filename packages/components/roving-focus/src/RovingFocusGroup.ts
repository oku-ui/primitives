import { createProvideScope } from '@oku-ui/provide'
import { createCollection } from '@oku-ui/collection'
import type { Scope } from '@oku-ui/provide'
import type { PropType } from 'vue'
import { defineComponent, h } from 'vue'
import { useForwardRef } from '@oku-ui/use-composable'
import { IRovingFocusGroupImplProps, OkuRovingFocusGroupImpl, type RovingFocusGroupImplElement, type RovingFocusGroupImplProps, type RovingFocusGroupOptions } from './RovingFocusGroupImpl'

const GROUP_NAME = 'RovingFocusGroup'

type ItemData = { id: string; focusable: boolean; active: boolean }
export const { CollectionItemSlot, CollectionProvider, CollectionSlot, useCollection, createCollectionScope } = createCollection<
  HTMLSpanElement,
  ItemData
>(GROUP_NAME)

type ScopedPropsInterface<P> = P & { scopeRovingFocusGroup?: Scope }
export const ScopedProps = {
  scopeRovingFocusGroup: Object as unknown as PropType<Scope>,
}

const [createRovingFocusGroupProvide, createRovingFocusGroupScope] = createProvideScope(
  GROUP_NAME,
  [createCollectionScope],
)

type RovingContextValue = RovingFocusGroupOptions & {
  currentTabStopId: string | null
  onItemFocus(tabStopId: string): void
  onItemShiftTab(): void
  onFocusableItemAdd(): void
  onFocusableItemRemove(): void
}

export const [RovingFocusProvider, useRovingFocusInject]
  = createRovingFocusGroupProvide<RovingContextValue>(GROUP_NAME)

type RovingFocusGroupElement = RovingFocusGroupImplElement
interface IRovingFocusGroup extends RovingFocusGroupImplProps { }

const RovingFocusGroupProps = {
  ...IRovingFocusGroupImplProps,
  ...ScopedProps,
}

const OkuRovingFocusGroup = defineComponent({
  name: 'OkuRovingFocusGroup',
  inheritAttrs: false,
  props: RovingFocusGroupProps,
  setup(props, context) {
    const forwardedRef = useForwardRef()
    return () =>
      h(CollectionProvider, {
        scope: props.scopeRovingFocusGroup,
      }, {
        default: () =>
          h(CollectionSlot, {
            scope: props.scopeRovingFocusGroup,
          }, {
            default: () => h(OkuRovingFocusGroupImpl, {
              ...props,
              ref: forwardedRef,
            }),
          }),
      })
  },
})
