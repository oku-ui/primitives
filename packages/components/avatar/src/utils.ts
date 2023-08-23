import type { Scope } from '@oku-ui/provide'
import { ScopePropObject } from '@oku-ui/provide'
import type { Ref } from 'vue'
import { onBeforeUnmount, ref, watchEffect } from 'vue'

export type ScopeAvatar<T> = T & { scopeOkuAvatar?: Scope }

export const scopeAvatarProps = {
  scopeOkuAvatar: {
    ...ScopePropObject,
  },
}

export type ImageLoadingStatus = 'idle' | 'loading' | 'loaded' | 'error'

export function useImageLoadingStatus(src: Ref<string | undefined>) {
  const mounted = ref(true)
  const loadingStatus = ref<ImageLoadingStatus>('idle')

  watchEffect(() => {
    if (!src.value) {
      loadingStatus.value = 'error'
      return
    }

    const image = new window.Image()

    const updateStatus = (status: ImageLoadingStatus) => () => {
      if (!mounted.value)
        return
      loadingStatus.value = status
    }

    loadingStatus.value = 'loading'
    image.onload = updateStatus('loaded')
    image.onerror = updateStatus('error')
    image.src = src.value
  })

  onBeforeUnmount(() => {
    mounted.value = false
  })

  return loadingStatus
}
