import type { FunctionalComponent, Ref } from 'vue'
import { computed, defineComponent, h, ref, watchEffect } from 'vue'
import { useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import { createProvideScope } from '@oku-ui/provide'
import { OkuSlot } from '@oku-ui/slot'

const CollectionProps = {
  scope: { type: null as any, required: true },
}

type CollectionElement = HTMLElement

// We have resorted to returning slots directly rather than exposing primitives that can then
// be slotted like `<CollectionItem as={Slot}>…</CollectionItem>`.
// This is because we encountered issues with generic types that cannot be statically analysed
// due to creating them dynamically via createCollection.

function createCollection<ItemElement extends HTMLElement, ItemData>(name: string) {
  // const ItemData = {
  //   scope: { type: Object, required: true },
  // }
  /* -----------------------------------------------------------------------------------------------
 * CollectionProvider
 * --------------------------------------------------------------------------------------------- */

  const PROVIDER_NAME = `${name}CollectionProvider`
  const [createCollectionProvide, createCollectionScope] = createProvideScope(PROVIDER_NAME)

  type ContextValue = {
    collectionRef: Ref<CollectionElement | undefined>
    itemMap: Map<Ref<ItemElement | null | undefined>, { ref: Ref<ItemElement> } & ItemData>
  }

  const [CollectionProviderImpl, useCollectionInject] = createCollectionProvide<ContextValue>(
    PROVIDER_NAME,
    { collectionRef: ref(undefined), itemMap: new Map() },
  )

  const CollectionProvider = defineComponent({
    name: PROVIDER_NAME,
    inheritAttrs: false,
    props: {
      ...CollectionProps,
    },
    setup(props, { slots }) {
      const collectionRef = ref<CollectionElement>()
      const itemMap = new Map<Ref<ItemElement>, { ref: Ref<ItemElement> } & ItemData>()
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
    inheritAttrs: false,
    props: {
      ...CollectionProps,
    },
    setup(props, { slots }) {
      const inject = useCollectionInject(COLLECTION_SLOT_NAME, props.scope)
      const forwaredRef = useForwardRef()
      const composedRefs = useComposedRefs(forwaredRef, inject.value.collectionRef)
      return () => h(OkuSlot, { ref: composedRefs }, slots.default?.())
    },
  })

  /* -----------------------------------------------------------------------------------------------
   * CollectionItem
   * --------------------------------------------------------------------------------------------- */

  const ITEM_SLOT_NAME = `${name}CollectionItemSlot`
  const ITEM_DATA_ATTR = 'data-oku-collection-item'

  // const CollectionItemSlot = defineComponent({
  //   name: ITEM_SLOT_NAME,
  //   inheritAttrs: false,
  //   props: ItemData,
  //   setup(props, { slots }) {
  //     const { scope, ...itemData } = props
  //     const refValue = ref<ItemElement | null>()
  //     const forwaredRef = useForwardRef()
  //     const composedRefs = useComposedRefs(refValue, forwaredRef)

  //     const inject = useCollectionInject(ITEM_SLOT_NAME, scope)

  //     watchEffect((clearMap) => {
  //       inject.value.itemMap.set(refValue, { ref: refValue, ...(itemData as any) })
  //       clearMap(() => inject.value.itemMap.delete(refValue))
  //     })

  //     return () => h(OkuSlot, { ref: composedRefs, ...{ [ITEM_DATA_ATTR]: '' } }, slots.default?.())
  //   },
  // })
  type CollectionItemSlotProps = ItemData & {
    scope: any | undefined
    children?: any
  }

  const CollectionItemSlot: FunctionalComponent<CollectionItemSlotProps> = (props, context) => {
    const { scope, ...itemData } = props
    const refValue = ref<ItemElement | null>()
    const forwaredRef = useForwardRef()
    const composedRefs = useComposedRefs(refValue, forwaredRef)

    const inject = useCollectionInject(ITEM_SLOT_NAME, scope)

    watchEffect((clearMap) => {
      inject.value.itemMap.set(refValue, { ref: refValue, ...(itemData as any) })
      clearMap(() => inject.value.itemMap.delete(refValue))
    })

    return h(OkuSlot, { ref: composedRefs, ...{ [ITEM_DATA_ATTR]: '' } }, context.slots.default?.())
  }

  CollectionItemSlot.inheritAttrs = false

  /* -----------------------------------------------------------------------------------------------
 * useCollection
 * --------------------------------------------------------------------------------------------- */

  function useCollection(scope: any) {
    const inject = useCollectionInject(`${name}CollectionConsumer`, scope)
    const getItems = computed(() => {
      const collectionNode = inject.value.collectionRef.value
      if (!collectionNode)
        return []

      const orderedNodes = Array.from(collectionNode.querySelectorAll(`[${ITEM_DATA_ATTR}]`))

      const items = Array.from(inject.value.itemMap.values())

      const orderedItems = items.sort(
        (a, b) => orderedNodes.indexOf(a.ref.value!) - orderedNodes.indexOf(b.ref.value!),
      )
      return orderedItems
    })

    return getItems
  }

  return [
    { Provider: CollectionProvider, Slot: CollectionSlot, ItemSlot: CollectionItemSlot },
    useCollection,
    createCollectionScope,
  ] as const
}

export { createCollection, CollectionProps }
