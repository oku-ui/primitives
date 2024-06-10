import { defineComponent, shallowRef, watchEffect } from 'vue'
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
  // props: {
  //   disabled: { type: Boolean, default: false },
  // },
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
  props: {
    name: { type: String, default: 'items' },
  },
  setup(props) {
    const getItems = useCollection()

    watchEffect(() => {
      console.warn(`${props.name}`, getItems())
    })

    return () => null
  },
})

export default { title: 'Utilities/Collection' }

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

export function WithElementInBetween() {
  return (
    <List>
      <div style={{ fontVariant: 'small-caps' }}>Colors</div>
      <Item>Red</Item>
      <Item {...{ disabled: true }}>Green</Item>
      <Item>Blue</Item>
      <div style={{ fontVariant: 'small-caps' }}>Words</div>
      <Item>Hello</Item>
      <Item>World</Item>
      <LogItems />
    </List>
  )
}

const Tomato = () => <Item style={{ color: 'tomato' }}>Tomato</Item>

export function WithWrappedItem() {
  return (
    <List>
      <Item>Red</Item>
      <Item {...{ disabled: true }}>Green</Item>
      <Item>Blue</Item>
      <Tomato />
      <LogItems />
    </List>
  )
}

export function WithFragment() {
  const countries = (
    <>
      <Item>France</Item>
      <Item {...{ disabled: true }}>UK</Item>
      <Item>Spain</Item>
    </>
  )
  return (
    <List>
      {countries}
      <LogItems />
    </List>
  )
}

const DynamicInsertionDemo = defineComponent({
  setup() {
    const hasTomato = shallowRef(false)

    function setHasTomato(value: boolean) {
      hasTomato.value = value
    }

    function log() {
      console.warn('Items:', Array.from(document.querySelectorAll(`[${ITEM_DATA_ATTR}]`)))
    }

    return () => (
      <>
        <button onClick={() => setHasTomato(!hasTomato.value)}>
          {hasTomato ? 'Remove' : 'Add'}
          {' '}
          Tomato
        </button>
        <button onClick={() => log()} style={{ marginLeft: 10 }}>
          Force Update
        </button>

        <List>
          <Item>Red</Item>
          { hasTomato.value && <Tomato />}
          <Item {...{ disabled: true }}>
            Green
          </Item>
          <Item>Blue</Item>
          <LogItems />
        </List>
      </>
    )
  },
})

export function DynamicInsertion() {
  return <DynamicInsertionDemo />
}

const WithChangingItemDemo = defineComponent({
  setup() {
    const isDisabled = shallowRef(false)

    function setIsDisabled(value: boolean) {
      isDisabled.value = value
    }

    return () => (
      <>
        <button onClick={() => setIsDisabled(!isDisabled.value)}>
          {isDisabled ? 'Enable' : 'Disable'}
          {' '}
          Green
        </button>

        <List>
          <Item>Red</Item>
          <Item {...{ disabled: isDisabled.value }}>Green</Item>
          <Item>Blue</Item>
          <LogItems />
        </List>
      </>
    )
  },
})

export function WithChangingItem() {
  return <WithChangingItemDemo />
}

export function Nested() {
  return (
    <List>
      <Item>1</Item>
      <Item>
        2
        <List>
          <Item>2.1</Item>
          <Item>2.2</Item>
          <Item>2.3</Item>
          <LogItems name="items inside 2" />
        </List>
      </Item>
      <Item>3</Item>
      <LogItems name="top-level items" />
    </List>
  )
}
