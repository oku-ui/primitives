import type { ComponentInternalInstance } from 'vue'
import { isOn } from '@oku-ui/utils'
import { camelize, getCurrentInstance, mergeProps, toHandlerKey, useAttrs } from 'vue'

export function useListeners(
  omitKeys?: string[],
  instance?: ComponentInternalInstance,
) {
  const vm = getCurrentInstance()
  const _instance = instance || vm
  const listeners: Record<string, any> = {}
  const rawProps = _instance?.vnode.props
  if (!rawProps)
    return listeners

  for (const key in rawProps) {
    if (isOn(key))
      listeners[key] = rawProps[key]
  }

  if (omitKeys)
    omitKeys.forEach(key => delete listeners[key])

  return listeners
}

export function useEmitsToProps<Name extends string>(
  emit: (name: Name, ...args: any[]) => void,
) {
  // Get the current Vue instance
  const instance = getCurrentInstance()

  // Get the emits option from the component type
  const emits = instance?.type.emits

  // If emits is not defined, log a warning
  if (!emits) {
    console.warn(
      `Emits option is empty in component ${instance?.type.name || instance?.type.__name}`,
    )
  }

  // Create an object to store event handler functions
  const obj: Record<string, any> = {}

  // Iterate through each event in emits
  for (const em in emits)
    // Create an event handler function for each event
    obj[toHandlerKey(camelize(em))] = (...args: any[]) => emit(em as Name, ...args)

  // Return the object with event handler functions
  return obj
}

export function useMergePropsEmits<T extends Record<string, any>, Name extends string>(
  props: T,
  emits?: (name: Name, ...args: any[]) => void,
) {
  const emit = emits || {}
  const attrs = useAttrs()
  return mergeProps(attrs, props, emit) as T & Record<Name, (...args: any[]) => void>
}
