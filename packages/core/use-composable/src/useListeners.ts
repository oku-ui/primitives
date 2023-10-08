import { isOn } from '@oku-ui/utils'
import type { ComponentInternalInstance } from 'vue'
import { getCurrentInstance } from 'vue'

export function useListeners(instance?: ComponentInternalInstance) {
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
  return listeners
}
