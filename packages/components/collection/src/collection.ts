import type { ComponentObjectPropsOptions, Ref } from 'vue'
import { computed, defineComponent, h, ref, watchEffect } from 'vue'
import { useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import { createProvideScope } from '@oku-ui/provide'
import { OkuSlot } from '@oku-ui/slot'

const CollectionProps = {
  scope: { type: null, required: false },
}
interface CollectionPropsType {
  scope: any
}

type CollectionElement = HTMLElement

// We have resorted to returning slots directly rather than exposing primitives that can then
// be slotted like `<CollectionItem as={Slot}>…</CollectionItem>`.
// This is because we encountered issues with generic types that cannot be statically analysed
// due to creating them dynamically via createCollection.

function createCollection<ItemElement extends HTMLElement, T>(name: string, ItemData: ComponentObjectPropsOptions) {
  /* -----------------------------------------------------------------------------------------------
 * CollectionProvider
 * --------------------------------------------------------------------------------------------- */

  const PROVIDER_NAME = `${name}CollectionProvider`
  const [createCollectionProvide, createCollectionScope] = createProvideScope(PROVIDER_NAME)

  type ContextValue = {
    collectionRef: Ref<ItemElement | undefined>
    itemMap: Ref<Map<Ref<ItemElement | null | undefined>, {
      ref: ItemElement
    } & T>>
  }

  const [CollectionProviderImpl, useCollectionInject] = createCollectionProvide<ContextValue>(
    PROVIDER_NAME,
    { collectionRef: ref(undefined), itemMap: ref(new Map()) },
  )

  const CollectionProvider = defineComponent({
    name: PROVIDER_NAME,
    inheritAttrs: false,
    props: {
      ...CollectionProps,
    },
    setup(props, { slots }) {
      const collectionRef = ref<ItemElement>()
      const itemMap = ref(new Map())
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
      ...CollectionProps,
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

  const _CollectionItemSlot = defineComponent({
    name: ITEM_SLOT_NAME,
    components: {
      OkuSlot,
    },
    inheritAttrs: false,
    props: {
      ...CollectionProps,
      ...ItemData,
    },
    setup(props, { attrs, slots }) {
      const { scope, ...itemData } = props
      const refValue = ref<ItemElement | null>()
      const forwaredRef = useForwardRef()
      const inject = useCollectionInject(ITEM_SLOT_NAME, scope)
      const composedRefs = useComposedRefs(refValue, forwaredRef)

      watchEffect((onClean) => {
        inject.itemMap.value.set(refValue, { ref: refValue, ...(itemData as any), ...attrs })

        onClean(() => {
          inject.itemMap.value.delete(refValue)
        })
      })

      return () => h(OkuSlot, { ref: composedRefs, ...{ [ITEM_DATA_ATTR]: '' } }, slots)
    },
  })

  const CollectionItemSlot = _CollectionItemSlot as typeof _CollectionItemSlot & (new () => { $props: Partial<T> })

  /* -----------------------------------------------------------------------------------------------
 * useCollection
 * --------------------------------------------------------------------------------------------- */

  function useCollection(scope: any) {
    const inject = useCollectionInject(`${name}CollectionConsumer`, scope)
    const getItems = computed(() => {
      const collectionNode = inject.collectionRef.value
      if (!collectionNode)
        return []

      const orderedNodes = Array.from(collectionNode.querySelectorAll(`[${ITEM_DATA_ATTR}]`))
      const items = Array.from(inject.itemMap.value.values())
      const orderedItems = items.sort(
        (a, b) => {
          return orderedNodes.indexOf(a.ref) - orderedNodes.indexOf(b.ref)
        },
      )
      return orderedItems
    })
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

export { createCollection, CollectionProps }

export type { CollectionElement, CollectionPropsType }
