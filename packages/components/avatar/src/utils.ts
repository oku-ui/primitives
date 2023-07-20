import { onMounted, onUnmounted, ref } from 'vue'

export type ImageLoadingStatus = 'idle' | 'loading' | 'loaded' | 'error'

export function useImageLoadingStatus(src?: string) {
  const loadingStatus = ref<ImageLoadingStatus>('idle')

  onMounted(() => {
    if (!src) {
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
    image.src = src

    onUnmounted(() => {
      isMounted = false
    })
  })

  return loadingStatus
}
