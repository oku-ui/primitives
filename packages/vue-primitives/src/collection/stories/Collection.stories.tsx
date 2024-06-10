import { defineComponent, shallowRef, watchEffect } from 'vue'
import Toggle from '../../toggle/Toggle.vue'
import { ITEM_DATA_ATTR, createCollection } from '../index.ts'

interface ItemData { disabled: boolean }

const [Collection, useCollection] = createCollection<HTMLElement, ItemData>('List')

const List = defineComponent({
  setup(_, { slots }) {
    const collectionRef = shallowRef<HTMLElement>()
    Collection.provideCollectionContext(collectionRef)

    return () => (
      <ul ref={collectionRef} class="list">
        {slots.default?.()}
      </ul>
    )
  },
})

const Item = defineComponent({
  setup(_, { slots, attrs }) {
    const currentElement = shallowRef<HTMLElement>()
    Collection.useCollectionItem(currentElement, attrs)

    return () => (
      <li ref={currentElement} class="item" style={{ opacity: attrs.disabled ? 0.3 : undefined }} {...{ [ITEM_DATA_ATTR]: '' }}>
        {slots.default?.()}
      </li>
    )
  },
})

const LogItems = defineComponent({
  setup() {
    const getItems = useCollection()

    watchEffect(() => {
      console.warn('Items:', getItems())
    })

    return () => null
  },
})

export default { title: 'Utilities/Collection' }

export const Styled = () => <Toggle class="root">Toggle</Toggle>

export function Basic() {
  return (
    <List>
      <Item>Red</Item>
      <Item {...{ disabled: true }}>
        Green
      </Item>
      <Item>Blue</Item>
      <LogItems />
    </List>
  )
}
