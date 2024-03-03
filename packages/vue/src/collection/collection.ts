import type { ShallowReactive, ShallowRef } from 'vue'
import { defineComponent, h, markRaw, ref, shallowReactive, shallowRef, unref, watch, watchEffect } from 'vue'
import { useComponentRef } from '@oku-ui/use-composable'
import { createScope } from '@oku-ui/provide'
import { OkuSlot } from '@oku-ui/slot'

export const collectionProps = {
  scope: { type: null, required: false },
}

export interface CollectionPropsType {
  scope: any
}

export type CollectionElement = HTMLElement

// We have resorted to returning slots directly rather than exposing primitives that can then
// be slotted like `<CollectionItem as={Slot}>…</CollectionItem>`.
// This is because we encountered issues with generic types that cannot be statically analysed
// due to creating them dynamically via createCollection.

export function createCollection<ItemElement extends HTMLElement, ItemData = object>(name: string) {
  /* -----------------------------------------------------------------------------------------------
   * CollectionProvider
   * --------------------------------------------------------------------------------------------- */

  const PROVIDER_NAME = `${name}CollectionProvider`
  const [createCollectionProvide, createCollectionScope] = createScope(PROVIDER_NAME)

  type ContextValue = {
    collectionRef: ShallowRef<ItemElement | null | undefined>
    itemMap: ShallowReactive<Map<ItemElement, { ref: ItemElement } & ItemData>>
  }

  const [useCollectionProvide, useCollectionInject] = createCollectionProvide<ContextValue>(
    PROVIDER_NAME,
    {
      collectionRef: ref(undefined),
      itemMap: shallowReactive(new Map()),
    },
  )

  const CollectionProvider = defineComponent({
    name: PROVIDER_NAME,
    inheritAttrs: false,
    props: {
      ...collectionProps,
    },
    setup(props, { slots }) {
      const collectionRef = shallowRef<ItemElement>()
      const itemMap = shallowReactive(new Map())

      useCollectionProvide({
        collectionRef,
        itemMap,
        scope: props.scope,
      })

      return () => slots.default?.()
    },
  })

  /* -----------------------------------------------------------------------------------------------
   * CollectionSlot
   * --------------------------------------------------------------------------------------------- */

  const COLLECTION_SLOT_NAME = `${name}CollectionSlot`

  const CollectionSlot = defineComponent({
    name: COLLECTION_SLOT_NAME,
    components: {
      OkuSlot,
    },
    inheritAttrs: false,
    props: {
      ...collectionProps,
    },
    setup(props, { slots }) {
      const context = useCollectionInject(COLLECTION_SLOT_NAME, props.scope)

      const { componentRef, currentElement } = useComponentRef<ItemElement | null | undefined>()

      watch(currentElement, () => {
        context.collectionRef.value = currentElement.value
      })

      return () => h(OkuSlot, { ref: componentRef }, slots)
    },
  })

  /* -----------------------------------------------------------------------------------------------
   * CollectionItem
   * --------------------------------------------------------------------------------------------- */

  const ITEM_SLOT_NAME = `${name}CollectionItemSlot`
  const ITEM_DATA_ATTR = 'data-oku-collection-item'

  const collectionItemSlot = defineComponent({
    name: ITEM_SLOT_NAME,
    components: {
      OkuSlot,
    },
    inheritAttrs: false,
    props: {
      ...collectionProps,
    },
    setup(props, { attrs, slots }) {
      const { componentRef, currentElement } = useComponentRef<ItemElement | null | undefined>()

      const context = useCollectionInject(ITEM_SLOT_NAME, props.scope)

      watchEffect((onClean) => {
        const unrefElement = unref(currentElement)

        if (unrefElement) {
          const key = markRaw(unrefElement)

          context.itemMap.set(key, {
            ref: unrefElement,
            ...attrs as unknown as ItemData,
          })

          onClean(() => {
            context.itemMap.delete(key)
          })
        }
      })

      return () => h(OkuSlot, { ref: componentRef, ...{ [ITEM_DATA_ATTR]: '' } }, slots)
    },
  })

  const CollectionItemSlot = collectionItemSlot as typeof collectionItemSlot & (new () => { $props: Partial<ItemData> })

  /* -----------------------------------------------------------------------------------------------
   * useCollection
   * --------------------------------------------------------------------------------------------- */

  function useCollection(scope: any) {
    const context = useCollectionInject(`${name}CollectionConsumer`, scope)

    const getItems = () => {
      const collectionNode = context.collectionRef.value
      if (!collectionNode)
        return []

      const orderedNodes = Array.from(collectionNode.querySelectorAll(`[${ITEM_DATA_ATTR}]`))

      const items = Array.from(context.itemMap.values())

      const orderedItems = items.sort(
        (a, b) => {
          return orderedNodes.indexOf(a.ref) - orderedNodes.indexOf(b.ref)
        },
      )

      return orderedItems
    }

    return getItems
  }

  return {
    CollectionProvider,
    CollectionSlot,
    CollectionItemSlot,
    useCollection,
    createCollectionScope,
  }
}
