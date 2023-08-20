import { useCollection } from './utils'

export function LogItems({ name = 'items' }: { name?: string }) {
  const getItems = useCollection(undefined)
  // eslint-disable-next-line no-console
  console.log(name, getItems.value)
  return null
}
