import { createContext, type MutableRefObject } from '../hooks/index.ts'

export const DATA_COLLECTION_ITEM = 'data-radix-collection-item'

type ItemElementWithData<E extends HTMLElement, D> = E & {
  $$rcid: D
}

export interface CollectionContext {
  collectionRef: MutableRefObject<HTMLElement | undefined>
}

export function createCollection<ItemElement extends HTMLElement, ItemData = object>(name: string) {
  const [_provideCollectionContext, useCollectionContext] = createContext<CollectionContext>(`${name}CollectionProvider`)

  type CollectionItem = ItemElementWithData<ItemElement, ItemData>

  function provideCollectionContext(collectionRef: MutableRefObject<HTMLElement | undefined>, provide = true) {
    const context = {
      collectionRef,
    }

    if (provide)
      _provideCollectionContext(context)

    return context
  }

  function useCollectionItem(currentElement: ItemElement | undefined, attrs: ItemData) {
    const unrefElement = currentElement as CollectionItem | undefined
    if (!unrefElement || '$$rcid' in unrefElement)
      return

    (unrefElement as any).$$rcid = attrs
  }

  function useCollection(thereContext?: CollectionContext) {
    const context = thereContext || useCollectionContext(`${name}CollectionConsumer`)

    function getItems(): CollectionItem[] {
      const collectionNode = context.collectionRef.current
      if (!collectionNode)
        return []

      const orderedNodes = Array.from(collectionNode.querySelectorAll(`[${DATA_COLLECTION_ITEM}]`))

      return orderedNodes as CollectionItem[]
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
