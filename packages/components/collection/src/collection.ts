import type { AllowedComponentProps, ComponentCustomProps, ComponentObjectPropsOptions, ComponentPublicInstance, Ref, VNodeProps } from 'vue'
import { computed, createVNode, defineComponent, h, ref, watchEffect } from 'vue'
import { useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import { createProvideScope } from '@oku-ui/provide'
import { OkuSlot } from '@oku-ui/slot'

const CollectionProps = {
  scope: { type: null as any, required: false },
}
interface CollectionPropsType {
  scope: any
}

type ComponentPublicInstanceRef<T> = Omit<ComponentPublicInstance, '$el'> & {
  $el: T
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
    collectionRef: Ref<ComponentPublicInstanceRef<ItemElement> | undefined>
    itemMap: Ref<Map<Ref<ComponentPublicInstanceRef<ItemElement> | null | undefined>, {
      ref: ComponentPublicInstanceRef<ItemElement>
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
      const collectionRef = ref<ComponentPublicInstanceRef<ItemElement>>()
      const itemMap = ref(new Map<Ref<ComponentPublicInstanceRef<ItemElement> | null | undefined>, { ref: ComponentPublicInstanceRef<ItemElement> } & T>())
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
      const refValue = ref<ComponentPublicInstanceRef<ItemElement> | null>()
      const forwaredRef = useForwardRef()
      const composedRefs = useComposedRefs(refValue, forwaredRef)

      const inject = useCollectionInject(ITEM_SLOT_NAME, scope)

      watchEffect((onClean) => {
        inject.value.itemMap.value.set(refValue, { ref: refValue, ...(itemData as any), ...attrs })

        onClean(() => {
          inject.value.itemMap.value.delete(refValue)
        })
      })

      return () => createVNode(OkuSlot, { ref: composedRefs, ...{ [ITEM_DATA_ATTR]: '' } }, slots)
    },
  })

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
      const collectionNode = inject.value.collectionRef.value?.$el
      if (!collectionNode)
        return []

      const orderedNodes = Array.from(collectionNode.querySelectorAll(`[${ITEM_DATA_ATTR}]`))

      const items = Array.from(inject.value.itemMap.value.values())
      const orderedItems = items.sort(
        (a, b) => {
          return orderedNodes.indexOf(a.ref.$el!) - orderedNodes.indexOf(b.ref.$el!)
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
