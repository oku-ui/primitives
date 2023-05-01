import { ref, watchEffect } from 'vue'
import type { ImageLoadingStatus } from './types'

export function useImageLoadingStatus(src?: string) {
//   const [loadingStatus, setLoadingStatus] = React.useState<ImageLoadingStatus>('idle')
  const loadingStatus = ref<ImageLoadingStatus>('idle')

  watchEffect(() => {
    if (!src) {
      loadingStatus.value = 'error'
      return
    }

    const image = new window.Image()

    const updateStatus = (status: ImageLoadingStatus) => () => {
      loadingStatus.value = status
    }

    loadingStatus.value = 'loading'
    image.onload = updateStatus('loaded')
    image.onerror = updateStatus('error')
    image.src = src as string
  })

  return loadingStatus
}
