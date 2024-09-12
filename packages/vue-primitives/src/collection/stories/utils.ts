import { createCollection } from '../index.ts'

export interface ItemData {
  demo: { disabled: boolean }
}

export const [Collection, useCollection] = createCollection<HTMLElement, ItemData, 'demo'>('List')
