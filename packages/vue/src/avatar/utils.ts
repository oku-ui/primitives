import { onBeforeUnmount, ref, watchEffect } from 'vue'
import { isClient } from '@oku-ui/use-composable'
import { createScope } from '@oku-ui/provide'
import type { Ref } from 'vue'
import type { ImageLoadingStatus } from './types'

export const [createAvatarProvide, createAvatarScope]
  = createScope<'OkuAvatar'>('OkuAvatar')

export type AvatarProvide = {
  imageLoadingStatus: Ref<ImageLoadingStatus>
  onImageLoadingStatusChange(status: ImageLoadingStatus): void
}

export const [useAvatarProvider, useAvatarInject]
  = createAvatarProvide<AvatarProvide>('OkuAvatar')

export function useImageLoadingStatus(src?: string) {
  const loadingStatus = ref<ImageLoadingStatus>('idle')

  const isMounted = ref(true)

  watchEffect(() => {
    if (!isClient)
      return

    if (!src) {
      loadingStatus.value = 'error'
      return
    }

    const image = new window.Image()

    const updateStatus = (status: ImageLoadingStatus) => () => {
      if (!isMounted.value)
        return

      loadingStatus.value = status
    }

    loadingStatus.value = 'loading'
    image.onload = updateStatus('loaded')
    image.onerror = updateStatus('error')
    image.src = src
  })

  onBeforeUnmount(() => isMounted.value = false)

  return loadingStatus
}
