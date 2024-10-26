import type { PrimitiveProps } from '../primitive/index.ts'
import type { PrimitiveDefaultProps, RadixPrimitiveReturns } from '../shared/index.ts'
import { isClient } from '@vueuse/core'
import { computed, onWatcherCleanup, type Ref, shallowRef, watchEffect } from 'vue'
import { useAvatarContext } from './AvatarRoot.ts'

export interface AvatarFallbackProps {
  as?: PrimitiveProps['as']
  delayMs?: number
}

export const DEFAULT_AVATAR_FALLBACK_PROPS = {
  as: 'span',
} satisfies PrimitiveDefaultProps<AvatarFallbackProps>

export interface UseAvatarFallback {
  delayMs?: number
}

export function useAvatarFallback(props: UseAvatarFallback = {}): RadixPrimitiveReturns<{
  isOpen: Ref<boolean>
}> {
  const context = useAvatarContext('AvatarFallback')
  const canRender = shallowRef(props.delayMs === undefined)

  if (isClient) {
    watchEffect(() => {
      if (props.delayMs !== undefined) {
        const timerId = window.setTimeout(() => canRender.value = true, props.delayMs)
        onWatcherCleanup(() => {
          window.clearTimeout(timerId)
        })
      }
    })
  }

  const isOpen = computed(() => canRender && context.imageLoadingStatus.value !== 'loaded')

  return {
    isOpen,
  }
}
