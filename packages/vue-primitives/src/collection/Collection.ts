import { type Ref, type ShallowReactive, shallowReactive, watchEffect } from 'vue'
import { type MutableRefObject, createContext } from '../hooks/index.ts'

export const ITEM_DATA_ATTR = 'data-radix-collection-item'

export interface CollectionContext<ItemElement extends HTMLElement, ItemData = object> {
  collectionRef: MutableRefObject<HTMLElement | undefined>
  itemMap: ShallowReactive<Map<ItemElement, { ref: ItemElement, attrs: ItemData }>>
}

export function createCollection<ItemElement extends HTMLElement, ItemData = object>(name: string) {
  const [_provideCollectionContext, useCollectionContext] = createContext<CollectionContext<ItemElement, ItemData>>(`${name}CollectionProvider`)

  function provideCollectionContext(collectionRef: MutableRefObject<HTMLElement | undefined>, provide = true) {
    // TODO: array ItemElement & {_attrs: {}}?
    const itemMap = shallowReactive(new Map<ItemElement, { ref: ItemElement, attrs: ItemData }>())

    const context = {
      collectionRef,
      itemMap,
    }

    if (provide)
      _provideCollectionContext(context)

    return context
  }

  function useCollectionItem(currentElement: Ref<ItemElement | undefined>, attrs: ItemData) {
    const { itemMap } = useCollectionContext('CollectionItem')

    // let unrefElement: ItemElement | undefined

    // onMounted(() => {
    //   unrefElement = currentElement.value
    //   if (!unrefElement)
    //     return

    //   itemMap.set(unrefElement, {
    //     ref: unrefElement,
    //     attrs: attrs as ItemData,
    //   })
    // })

    // onBeforeUpdate(() => {
    //   if (!unrefElement)
    //     return

    //   itemMap.set(unrefElement, {
    //     ref: unrefElement,
    //     attrs: attrs as ItemData,
    //   })
    // })

    // onBeforeUnmount(() => {
    //   if (!unrefElement)
    //     return

    //   itemMap.delete(unrefElement)
    // })

    // TODO: watch attrs -> onBeforeUpdate
    // watch([currentElement, attrs], (_, __, onClean) => {
    //   const unrefElement = currentElement.value
    //   if (!unrefElement)
    //     return

    //   itemMap.set(unrefElement, {
    //     ref: unrefElement,
    //     attrs: attrs as ItemData,
    //   })

    //   onClean(() => {
    //     itemMap.delete(unrefElement)
    //   })
    // })

    watchEffect((onCleanup) => {
      const unrefElement = currentElement.value
      if (!unrefElement)
        return

      itemMap.set(unrefElement, {
        ref: unrefElement,
        attrs,
      })

      onCleanup(() => {
        itemMap.delete(unrefElement)
      })
    })

    return {
      itemMap,
    }
  }

  function useCollection(thereContext?: CollectionContext<ItemElement, ItemData>) {
    const context = thereContext || useCollectionContext(`${name}CollectionConsumer`)

    function getItems() {
      const collectionNode = context.collectionRef.current
      if (!collectionNode)
        return []

      const orderedNodes = Array.from(collectionNode.querySelectorAll(`[${ITEM_DATA_ATTR}]`))
      const items = Array.from(context.itemMap.values())
      const orderedItems = items.sort(
        (a, b) => orderedNodes.indexOf(a.ref) - orderedNodes.indexOf(b.ref),
      )

      return orderedItems
    }

    return getItems
  }

  return [
    {
      provideCollectionContext,
      useCollectionContext,
      useCollectionItem,
    },
    useCollection,
  ] as const
}
