import { shallowRef } from 'vue'

interface Machine<S> { [k: string]: { [k: string]: S } }
type MachineState<T> = keyof T
type MachineEvent<T> = keyof UnionToIntersection<T[keyof T]>

// 🤯 https://fettblog.eu/typescript-union-to-intersection/
type UnionToIntersection<T> = (T extends any ? (x: T) => any : never) extends (x: infer R) => any
  ? R
  : never

export function useStateMachine<M>(
  initialState: MachineState<M>,
  machine: M & Machine<MachineState<M>>,
) {
  const state = shallowRef(initialState)

  const reducer = (event: MachineEvent<M>) => {
    const nextState = (machine[state.value] as any)[event]
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
