import { useCollection } from './utils'

export function LogItems({ name = 'items' }: { name?: string }) {
  const getItems = useCollection(undefined)

  console.warn(name, getItems())
}
