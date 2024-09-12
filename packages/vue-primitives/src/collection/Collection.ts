import { createContext, type MutableRefObject } from '../hooks/index.ts'

export const DATA_COLLECTION_ITEM = 'data-radix-collection-item'

type ItemElementWithData<E extends HTMLElement, D> = E & {
  $$rcid: D
}

export interface CollectionContext {
  collectionRef: MutableRefObject<HTMLElement | undefined>
}

export function createCollection<ItemElement extends HTMLElement, ItemData = Record<string, any>>(name: string) {
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

  function useCollectionItem<K extends keyof ItemData>(currentElement: ItemElement | undefined, attrs: ItemData[K], key: K) {
    const unrefElement = currentElement as CollectionItem | undefined
    if (!unrefElement)
      return

    if ('$$rcid' in unrefElement) {
      if (!key)
        return
      if (key in unrefElement)
        return
    }

    if (key) {
      (unrefElement as any).$$rcid = (unrefElement as any).$$rcid || {}
      ; (unrefElement as any).$$rcid[key] = attrs
    }
    else {
      (unrefElement as any).$$rcid = attrs
    }
  }

  function useCollection(thereContext?: CollectionContext) {
    const context = thereContext || useCollectionContext(`${name}CollectionConsumer`)

    function getItems(): CollectionItem[] {
      if (!context.collectionRef.current)
        return []

      const orderedNodes = Array.from(context.collectionRef.current.querySelectorAll(`[${DATA_COLLECTION_ITEM}]`))

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
