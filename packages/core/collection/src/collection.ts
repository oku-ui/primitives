import type { ComponentObjectPropsOptions, Ref, ShallowRef } from 'vue'
import { defineComponent, h, markRaw, reactive, ref, shallowRef, toRefs, watchEffect } from 'vue'
import { reactiveOmit, useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import { createProvideScope } from '@oku-ui/provide'
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

export function createCollection<ItemElement extends HTMLElement, T = object>(name: string, ItemData?: ComponentObjectPropsOptions) {
  /* -----------------------------------------------------------------------------------------------
 * CollectionProvider
 * --------------------------------------------------------------------------------------------- */

  const PROVIDER_NAME = `${name}CollectionProvider`
  const [createCollectionProvide, createCollectionScope] = createProvideScope(PROVIDER_NAME)

  type ContextValue = {
    collectionRef: Ref<ItemElement | undefined>
    itemMap: ShallowRef<Map<Ref<ItemElement | null | undefined>, {
      ref: Ref<ItemElement>
    } & T>>
  }

  const [CollectionProviderImpl, useCollectionInject] = createCollectionProvide<ContextValue>(
    PROVIDER_NAME,
    { collectionRef: ref(undefined), itemMap: shallowRef(new Map()) },
  )

  const CollectionProvider = defineComponent({
    name: PROVIDER_NAME,
    inheritAttrs: false,
    props: {
      ...collectionProps,
    },
    setup(props, { slots }) {
      const collectionRef = ref<ItemElement>()
      const itemMap = shallowRef(new Map())
      CollectionProviderImpl({
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
      ...ItemData,
    },
    setup(props, { slots }) {
      const inject = useCollectionInject(COLLECTION_SLOT_NAME, props.scope)
      const forwaredRef = useForwardRef()
      const composedRefs = useComposedRefs(forwaredRef, inject.collectionRef)
      return () => h(OkuSlot, { ref: composedRefs }, slots)
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
      ...ItemData,
    },
    setup(props, { attrs, slots }) {
      const { scope, ...itemData } = toRefs(props)
      const _reactive = reactive(itemData)
      const reactiveItemData = reactiveOmit(_reactive, (key, _value) => key === undefined)

      const refValue = ref<ItemElement | null>()
      const forwaredRef = useForwardRef()

      const inject = useCollectionInject(ITEM_SLOT_NAME, scope.value)
      const composedRefs = useComposedRefs(refValue, forwaredRef)

      watchEffect((onClean) => {
        inject.itemMap.value.set(markRaw(refValue), { ref: markRaw(refValue), ...(reactiveItemData as any), ...attrs })

        onClean(() => {
          inject.itemMap.value.delete(refValue)
        })
      })

      return () => h(OkuSlot, { ref: composedRefs, ...{ [ITEM_DATA_ATTR]: '' } }, {
        default: () => slots.default?.(),
      })
    },
  })

  const CollectionItemSlot = collectionItemSlot as typeof collectionItemSlot & (new () => { $props: Partial<T> })

  /* -----------------------------------------------------------------------------------------------
 * useCollection
 * --------------------------------------------------------------------------------------------- */

  function useCollection(scope: any) {
    const inject = useCollectionInject(`${name}CollectionConsumer`, scope)
    const getItems = () => {
      const collectionNode = inject.collectionRef.value
      if (!collectionNode)
        return []

      const orderedNodes = Array.from(collectionNode.querySelectorAll(`[${ITEM_DATA_ATTR}]`))
      const items = Array.from(inject.itemMap.value.values())
      const orderedItems = items.sort(
        (a, b) => {
          return orderedNodes.indexOf(a.ref.value) - orderedNodes.indexOf(b.ref.value)
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
