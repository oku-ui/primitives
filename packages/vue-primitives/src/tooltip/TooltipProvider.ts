import { isClient, tryOnScopeDispose } from '@vueuse/core'
import { type Ref, shallowRef } from 'vue'
import { createContext, type MutableRefObject, useRef } from '../hooks/index.ts'

export interface TooltipProviderProps {
  /**
   * The duration from when the pointer enters the trigger until the tooltip gets opened.
   * @defaultValue 700
   */
  delayDuration?: number
  /**
   * How much time a user has to enter another trigger without incurring a delay again.
   * @defaultValue 300
   */
  skipDelayDuration?: number
  /**
   * When `true`, trying to hover the content will result in the tooltip closing as the pointer leaves the trigger.
   * @defaultValue false
   */
  disableHoverableContent?: boolean
}

export interface TooltipProviderContext {
  isOpenDelayed: Ref<boolean>
  delayDuration: number
  onOpen: () => void
  onClose: () => void
  onPointerInTransitChange: (inTransit: boolean) => void
  isPointerInTransitRef: MutableRefObject<boolean>
  disableHoverableContent: boolean
}

export const [provideTooltipProviderContext, useTooltipProviderContext] = createContext<TooltipProviderContext>('Tooltip')

export function useTooltipProvider({
  delayDuration = 700,
  skipDelayDuration = 300,
  disableHoverableContent = false,
}: TooltipProviderProps = {}) {
  const isOpenDelayed = shallowRef(true)
  const isPointerInTransitRef = useRef(false)
  let skipDelayTimerRef = 0

  if (isClient) {
    tryOnScopeDispose(() => {
      window.clearTimeout(skipDelayTimerRef)
    })
  }

  provideTooltipProviderContext({
    isOpenDelayed,
    delayDuration,
    onOpen() {
      window.clearTimeout(skipDelayTimerRef)
      isOpenDelayed.value = false
    },
    onClose() {
      window.clearTimeout(skipDelayTimerRef)
      skipDelayTimerRef = window.setTimeout(() => {
        isOpenDelayed.value = true
      }, skipDelayDuration)
    },
    isPointerInTransitRef,
    onPointerInTransitChange(inTransit: boolean) {
      isPointerInTransitRef.current = inTransit
    },
    disableHoverableContent,
  })
}
