import { createContext, type MutableRefObject } from '../hooks/index.ts'

export const DATA_COLLECTION_ITEM = 'data-radix-collection-item'

export interface CollectionItemAttrs {
  [DATA_COLLECTION_ITEM]: true
}

export type CollectionItemWithData<E extends HTMLElement, D> = E & {
  $$rcid: D
}

export interface CollectionContext {
  collectionRef: MutableRefObject<HTMLElement | undefined>
}

export function createCollection<ItemElement extends HTMLElement, ItemData extends Record<string, any> = Record<string, any>>(name: string) {
  const [_provideCollectionContext, useCollectionContext] = createContext<CollectionContext>(`${name}CollectionProvider`)

  type CollectionItem = CollectionItemWithData<ItemElement, ItemData>

  function provideCollectionContext(collectionRef: MutableRefObject<HTMLElement | undefined>, provide = true) {
    const context = {
      collectionRef,
    }

    if (provide)
      _provideCollectionContext(context)

    return context
  }

  function useCollectionItem<K extends keyof ItemData>(currentElement: ItemElement | undefined, attrs: ItemData[K], key: K) {
    if (!key)
      return

    const unrefElement = currentElement as Record<string, any> | CollectionItem | undefined
    if (!unrefElement)
      return

    if ('$$rcid' in unrefElement) {
      if (key in unrefElement.$$rcid)
        return

      unrefElement.$$rcid[key] = attrs
    }
    else {
      unrefElement.$$rcid = {
        [key]: attrs,
      }
    }
  }

  function useCollection(thereContext?: CollectionContext) {
    const context = thereContext || useCollectionContext(`${name}CollectionConsumer`)

    function getItems(): CollectionItem[] {
      if (!context.collectionRef.value)
        return []

      const orderedNodes = Array.from(context.collectionRef.value.querySelectorAll(`[${DATA_COLLECTION_ITEM}]:not([data-disabled])`))

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
