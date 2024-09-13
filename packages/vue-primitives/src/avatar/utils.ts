import type { AvatarImageProps } from './AvatarImage.ts'
import type { ImageLoadingStatus } from './AvatarRoot.ts'
import { isClient } from '@vueuse/core'
import { type Ref, shallowRef, toValue, watchEffect } from 'vue'

export function useImageLoadingStatus(src: Ref<AvatarImageProps['src']> | (() => AvatarImageProps['src'])) {
  const loadingStatus = shallowRef<ImageLoadingStatus>('idle')

  if (!isClient)
    return loadingStatus

  watchEffect((onCleanup) => {
    const value = toValue(src)

    if (!value) {
      loadingStatus.value = 'error'
      return
    }

    let isMounted = true
    const image = new window.Image()

    const updateStatus = (status: ImageLoadingStatus) => () => {
      if (!isMounted)
        return
      loadingStatus.value = status
    }

    loadingStatus.value = 'loading'
    image.onload = updateStatus('loaded')
    image.onerror = updateStatus('error')
    image.src = value

    onCleanup(() => {
      isMounted = false
    })
  })

  return loadingStatus
}
