import { ref } from 'vue'

type Machine<S> = { [k: string]: { [k: string]: S } }
type MachineState<T> = keyof T
type MachineEvent<T> = keyof UnionToIntersection<T[keyof T]>

// 🤯 https://fettblog.eu/typescript-union-to-intersection/
type UnionToIntersection<T> = (T extends any ? (x: T) => any : never) extends (
  x: infer R
) => any
  ? R
  : never

export function useStateMachine<M>(
  initialState: MachineState<M>,
  machine: M & Machine<MachineState<M>>,
) {
  const state = ref(initialState)

  const reducer = (event: MachineEvent<M>) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const nextState = machine[state.value][event]
    return nextState ?? state.value
  }

  const dispatch = (event: MachineEvent<M>) => {
    state.value = reducer(event)
  }

  return {
    state,
    dispatch,
  }
}
