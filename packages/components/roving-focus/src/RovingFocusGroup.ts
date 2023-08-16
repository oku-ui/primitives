import { createProvideScope } from '@oku-ui/provide'
import type { CollectionPropsType } from '@oku-ui/collection'
import { createCollection } from '@oku-ui/collection'
import type { Scope } from '@oku-ui/provide'
import type { ComputedRef, PropType } from 'vue'
import { createVNode, defineComponent, h, mergeProps } from 'vue'
import { useForwardRef } from '@oku-ui/use-composable'
import type { MergeProps } from '@oku-ui/primitive'
import { IRovingFocusGroupImplProps, OkuRovingFocusGroupImpl } from './RovingFocusGroupImpl'
import type { RovingFocusGroupImplElement, RovingFocusGroupImplPropsType, RovingFocusGroupOptions } from './RovingFocusGroupImpl'

const GROUP_NAME = 'RovingFocusGroup'

export interface ItemData extends CollectionPropsType {
  id: string
  focusable: boolean
  active: boolean
}

export const { CollectionItemSlot, CollectionProvider, CollectionSlot, useCollection, createCollectionScope } = createCollection<
  HTMLSpanElement,
  ItemData
>(GROUP_NAME, {
  id: {
    type: String,
  },
  focusable: {
    type: Boolean,
  },
  active: {
    type: Boolean,
  },
})

export type ScopedPropsInterface<P> = P & { scopeRovingFocusGroup?: Scope }
export const ScopedProps = {
  scopeRovingFocusGroup: {
    type: Object as PropType<Scope>,
  },
}

const [createRovingFocusGroupProvide, createRovingFocusGroupScope] = createProvideScope(
  GROUP_NAME,
  [createCollectionScope],
)

type RovingContextValue = RovingFocusGroupOptions & {
  currentTabStopId: ComputedRef<string | null>
  onItemFocus(tabStopId: string): void
  onItemShiftTab(): void
  onFocusableItemAdd(): void
  onFocusableItemRemove(): void
}

export const [useRovingFocusProvider, useRovingFocusInject]
  = createRovingFocusGroupProvide<RovingContextValue>(GROUP_NAME)

type RovingFocusGroupElement = RovingFocusGroupImplElement
interface IRovingFocusGroup extends ScopedPropsInterface<RovingFocusGroupImplPropsType> { }

const RovingFocusGroupProps = {
  ...IRovingFocusGroupImplProps,
  ...ScopedProps,
}

const RovingFocusGroup = defineComponent({
  name: 'OkuRovingFocusGroup',
  components: {
    OkuRovingFocusGroupImpl,
    CollectionProvider,
    CollectionSlot,
    CollectionItemSlot,
  },
  inheritAttrs: false,
  props: RovingFocusGroupProps,
  setup(props, { slots, attrs }) {
    const forwardedRef = useForwardRef()
    return () => {
      const mergedProps = mergeProps(attrs, props)
      return h(CollectionProvider, {
        scope: props.scopeRovingFocusGroup,
      }, {
        default: () => h(CollectionSlot, {
          scope: props.scopeRovingFocusGroup,
        }, {
          default: () => createVNode(OkuRovingFocusGroupImpl, {
            ...mergedProps,
            ref: forwardedRef,
          }, slots),
        }),
      })
    }
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
type _RovingFocusGroupProps = MergeProps<IRovingFocusGroup, RovingFocusGroupElement>

const OkuRovingFocusGroup = RovingFocusGroup as typeof RovingFocusGroup & (new () => { $props: _RovingFocusGroupProps })

export {
  OkuRovingFocusGroup,
  createRovingFocusGroupScope,
}
