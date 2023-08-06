import type { AllowedComponentProps, ComponentCustomProps, ComponentObjectPropsOptions, FunctionalComponent, Ref, ReservedProps, VNodeProps } from 'vue'
import { computed, defineComponent, h, ref, watchEffect } from 'vue'
import { useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import { createProvideScope } from '@oku-ui/provide'
import { OkuSlot } from '@oku-ui/slot'

const CollectionProps = {
  scope: { type: null as any, required: true },
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
    collectionRef: Ref<CollectionElement | undefined>
    itemMap: Map<Ref<ItemElement | null | undefined>, { ref: Ref<ItemElement> } & T>
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
      const itemMap = new Map<Ref<ItemElement>, { ref: Ref<ItemElement> } & T>()
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
      const composedRefs = useComposedRefs(forwaredRef, inject.value.collectionRef)
      return () => h(OkuSlot, { ref: composedRefs }, {
        default: () => slots.default?.(),
      })
    },
  })

  /* -----------------------------------------------------------------------------------------------
   * CollectionItem
   * --------------------------------------------------------------------------------------------- */

  const ITEM_SLOT_NAME = `${name}CollectionItemSlot`
  const ITEM_DATA_ATTR = 'data-oku-collection-item'

  type CollectionItemSlotProps = T & CollectionPropsType & ReservedProps

  const _CollectionItemSlot: FunctionalComponent<CollectionItemSlotProps> = (props, context) => {
    const { scope, ...itemData } = props
    const refValue = ref<ItemElement | null>()
    const forwaredRef = useForwardRef()
    const composedRefs = useComposedRefs(refValue, forwaredRef)

    const inject = useCollectionInject(ITEM_SLOT_NAME, scope)

    watchEffect((clearMap) => {
      inject.value.itemMap.set(refValue, { ref: refValue, ...(itemData as any) })
      clearMap(() => inject.value.itemMap.delete(refValue))
    })

    return h(OkuSlot, { ref: composedRefs, ...{ [ITEM_DATA_ATTR]: '' } }, {
      default: () => context.slots.default?.(),
    })
  }

  _CollectionItemSlot.inheritAttrs = false

  // const _CollectionItemSlot = defineComponent({
  //   name: COLLECTION_SLOT_NAME,
  //   inheritAttrs: false,
  //   props: {
  //     ...CollectionProps,
  //     ...ItemData,
  //   },
  //   setup(props, { slots }) {
  //     console
  //     const { scope, ...itemData } = props
  //     const refValue = ref<ItemElement | null>()
  //     const forwaredRef = useForwardRef()
  //     const composedRefs = useComposedRefs(refValue, forwaredRef)

  //     const inject = useCollectionInject(ITEM_SLOT_NAME, scope)

  //     watchEffect((clearMap) => {
  //       inject.value.itemMap.set(refValue, { ref: refValue, ...(itemData as any) })
  //       clearMap(() => inject.value.itemMap.delete(refValue))
  //     })

  //     return h(OkuSlot, { ref: composedRefs, ...{ [ITEM_DATA_ATTR]: '' } }, {
  //       default: () => slots.default?.(),
  //     })
  //   },
  // })

  const CollectionItemSlot = _CollectionItemSlot as unknown as {
    new(): {
      $props: AllowedComponentProps &
      ComponentCustomProps &
      VNodeProps & T
    }
  }

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
