import { type Ref, onBeforeUnmount, onMounted, shallowRef, watch } from 'vue'
import type { ImageLoadingStatus } from './Avatar.ts'
import type { AvatarImageProps } from './AvatarImage.ts'

export function useImageLoadingStatus(src: Ref<AvatarImageProps['src']> | (() => AvatarImageProps['src'])) {
  const loadingStatus = shallowRef<ImageLoadingStatus>('idle')

  let stopWatch: ReturnType<typeof watch> | undefined

  onMounted(() => {
    stopWatch = watch(src, (value, _, onCleanup) => {
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
    }, {
      immediate: true,
    })
  })

  onBeforeUnmount(() => {
    stopWatch?.()
  })

  return loadingStatus
}
