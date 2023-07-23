import type { Ref } from 'vue'
import { onBeforeUnmount, ref, watchEffect } from 'vue'

export type ImageLoadingStatus = 'idle' | 'loading' | 'loaded' | 'error'

export function useImageLoadingStatus(src: Ref<string>) {
  const mounted = ref(true)
  const loadingStatus = ref<ImageLoadingStatus>('idle')

  watchEffect(() => {
    if (!src) {
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
