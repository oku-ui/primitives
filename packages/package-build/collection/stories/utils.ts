import { createCollection } from '../collection'

type ItemData = { disabled: boolean }

export const { CollectionProvider, CollectionSlot, CollectionItemSlot, useCollection } = createCollection<HTMLElement, ItemData>('List')
