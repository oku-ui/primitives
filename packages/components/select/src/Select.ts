import { createCollection } from '@oku-ui/collection'
import { createPopperScope } from '@oku-ui/popper'
import { createProvideScope } from '@oku-ui/provide'
import type { ItemData, SelectProvideValue } from './types'

const SELECT_NAME = 'OkuSelect'

export const {
  CollectionItemSlot,
  CollectionProvider,
  CollectionSlot,
  useCollection,
  createCollectionScope,
} = createCollection<HTMLSelectElement, ItemData>(SELECT_NAME)

const [createSelectProvide, createSelectScope] = createProvideScope(
  SELECT_NAME,
  [createCollectionScope, createPopperScope],
)

const usePopperScope = createPopperScope()

export const [selectProvider, useSelectInject]
  = createSelectProvide<SelectProvideValue>(SELECT_NAME)
