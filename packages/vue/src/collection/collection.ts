import type { ComponentObjectPropsOptions, Ref } from 'vue'
import { defineComponent, h, markRaw, ref, toRefs, watch, watchEffect } from 'vue'
import { useComponentRef } from '@oku-ui/use-composable'
import { createScope } from '@oku-ui/provide'
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

export function createCollection<ItemElement extends {
  $el: CollectionElement
  [key: string]: any
}, T = object>(name: string, ItemData?: ComponentObjectPropsOptions) {
  /* -----------------------------------------------------------------------------------------------
   * CollectionProvider
   * --------------------------------------------------------------------------------------------- */

  const PROVIDER_NAME = `${name}CollectionProvider`
  const [createCollectionProvide, createCollectionScope] = createScope(PROVIDER_NAME)

  type ContextValue = {
    collectionRef: Ref<ItemElement | undefined>
    itemMap: Ref<Map<ItemElement, {
      ref: Ref<ItemElement>
    } & T>>
  }

  const [useCollectionProvide, useCollectionInject] = createCollectionProvide<ContextValue>(
    PROVIDER_NAME,
    { collectionRef: ref(undefined), itemMap: ref(new Map()) },
  )

  const CollectionProvider = defineComponent({
    name: PROVIDER_NAME,
    inheritAttrs: false,
    props: {
      ...collectionProps,
    },
    setup(props, { slots }) {
      const collectionRef = ref<ItemElement>()
      const itemMap = ref(new Map())
      useCollectionProvide({
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

      const { componentRef } = useComponentRef<ItemElement | null>()

      watch(componentRef, () => {
        inject.collectionRef.value = componentRef.value as any
      })

      return () => h(OkuSlot, { ref: componentRef }, slots)
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

      const { componentRef, currentElement } = useComponentRef<ItemElement | null>()

      const inject = useCollectionInject(ITEM_SLOT_NAME, scope.value)

      watchEffect((onClean) => {
        if (currentElement.value && currentElement) {
          inject.itemMap.value.set(markRaw(currentElement.value), {
            ref: {
              value: markRaw(componentRef),
            },
            ...(itemData as any),
            ...attrs,
          })

          onClean(() => {
            inject.itemMap.value.delete(currentElement.value!)
          })
        }
      })

      return () => h(OkuSlot, { ref: componentRef, ...{ [ITEM_DATA_ATTR]: '' } }, slots)
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

      const orderedNodes = Array.from(collectionNode.$el.querySelectorAll(`[${ITEM_DATA_ATTR}]`))

      const items = Array.from(inject.itemMap.value.values())

      const orderedItems = items.sort(
        (a, b) => {
          return orderedNodes.indexOf(a.ref.value.$el) - orderedNodes.indexOf(b.ref.value.$el)
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
