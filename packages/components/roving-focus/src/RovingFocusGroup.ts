import { createProvideScope } from '@oku-ui/provide'
import type { CollectionPropsType } from '@oku-ui/collection'
import { createCollection } from '@oku-ui/collection'
import type { Ref } from 'vue'
import { defineComponent, h, toRefs } from 'vue'
import { useForwardRef } from '@oku-ui/use-composable'
import { primitiveProps } from '@oku-ui/primitive'
import { OkuRovingFocusGroupImpl, rovingFocusGroupImplProps } from './RovingFocusGroupImpl'
import type { RovingFocusGroupImplElement, RovingFocusGroupImplIntrinsicElement, RovingFocusGroupImplProps } from './RovingFocusGroupImpl'
import type { ScopedPropsInterface } from './types'
import { scopedProps } from './types'
import type { Direction, Orientation } from './utils'

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

// RovingFocusGroupOptions extends
type RovingProvideValue = {
  /**
 * The orientation of the group.
 * Mainly so arrow navigation is done accordingly (left & right vs. up & down)
 */
  orientation?: Ref<Orientation | undefined>
  /**
   * The direction of navigation between items.
   */
  dir?: Ref<Direction | undefined>
  /**
   * Whether keyboard navigation should loop around
   * @defaultValue false
   */
  loop?: Ref<boolean | undefined>
  currentTabStopId: Ref<string>
  onItemFocus(tabStopId: string): void
  onItemShiftTab(): void
  onFocusableItemAdd(): void
  onFocusableItemRemove(): void
}

export const [rovingFocusProvider, useRovingFocusInject]
  = createRovingFocusGroupProvide<RovingProvideValue>(GROUP_NAME)

export type RovingFocusGroupIntrinsicElement = RovingFocusGroupImplIntrinsicElement
export type RovingFocusGroupElement = RovingFocusGroupImplElement

export interface RovingFocusGroupProps extends ScopedPropsInterface<RovingFocusGroupImplProps> { }

const rovingFocusGroupProps = {
  ...rovingFocusGroupImplProps,
}

const rovingFocusGroup = defineComponent({
  name: GROUP_NAME,
  components: {
    OkuRovingFocusGroupImpl,
    CollectionProvider,
    CollectionSlot,
    CollectionItemSlot,
  },
  inheritAttrs: false,
  props: {
    ...rovingFocusGroupProps,
    ...scopedProps,
    ...primitiveProps,
  },
  setup(props, { slots, attrs }) {
    const { currentTabStopId, dir, loop, orientation, defaultCurrentTabStopId, asChild } = toRefs(props)
    const forwardedRef = useForwardRef()
    return () => {
      return h(CollectionProvider, {
        scope: props.scopeOkuRovingFocusGroup,
      }, {
        default: () => h(CollectionSlot, {
          scope: props.scopeOkuRovingFocusGroup,
        }, {
          default: () => h(OkuRovingFocusGroupImpl, {
            ...attrs,
            asChild: asChild.value,
            currentTabStopId: currentTabStopId?.value,
            defaultCurrentTabStopId: defaultCurrentTabStopId?.value,
            dir: dir?.value,
            loop: loop?.value,
            orientation: orientation?.value,
            ref: forwardedRef,
          }, slots),
        }),
      })
    }
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
const OkuRovingFocusGroup = rovingFocusGroup as typeof rovingFocusGroup &
(new () => {
  $props: Partial<RovingFocusGroupElement>
})

export {
  OkuRovingFocusGroup,
  createRovingFocusGroupScope,
}
