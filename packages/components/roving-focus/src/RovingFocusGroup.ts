import { createProvideScope } from '@oku-ui/provide'
import type { CollectionPropsType } from '@oku-ui/collection'
import { createCollection } from '@oku-ui/collection'
import type { ComputedRef } from 'vue'
import { computed, defineComponent, h, mergeProps } from 'vue'
import { useForwardRef } from '@oku-ui/use-composable'
import type { MergeProps } from '@oku-ui/primitive'
import { OkuRovingFocusGroupImpl, rovingFocusGroupImplProps } from './RovingFocusGroupImpl'
import type { RovingFocusGroupImplElement, RovingFocusGroupImplPropsType, RovingFocusGroupOptions } from './RovingFocusGroupImpl'
import type { ScopedPropsInterface } from './types'
import { scopedProps } from './types'

const GROUP_NAME = 'OkuRovingFocusGroup'

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
export interface RovingFocusGroupPropsType extends ScopedPropsInterface<RovingFocusGroupImplPropsType> { }

const RovingFocusGroupProps = {
  ...rovingFocusGroupImplProps,
  ...scopedProps,
}

const RovingFocusGroup = defineComponent({
  name: GROUP_NAME,
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
      const mergedProps = computed(() => mergeProps(attrs, props))
      return h(CollectionProvider, {
        scope: props.scopeOkuRovingFocusGroup,
      }, {
        default: () => h(CollectionSlot, {
          scope: props.scopeOkuRovingFocusGroup,
        }, {
          default: () => h(OkuRovingFocusGroupImpl, {
            ...mergedProps.value,
            ref: forwardedRef,
          }, slots),
        }),
      })
    }
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
type _RovingFocusGroupProps = MergeProps<RovingFocusGroupPropsType, Partial<RovingFocusGroupElement>>

const OkuRovingFocusGroup = RovingFocusGroup as typeof RovingFocusGroup & (new () => { $props: _RovingFocusGroupProps })

export {
  OkuRovingFocusGroup,
  createRovingFocusGroupScope,
}
