/// <reference types="resize-observer-browser" />

import type { Ref, WatchStopHandle } from 'vue'
import { onMounted, onUnmounted, ref, watch } from 'vue'

interface Size {
  width: number
  height: number
}

function useSize(element: Ref<HTMLElement | null>) {
  const size = ref<Size>()
  let stopHandle: WatchStopHandle
  let resizeObserver: ResizeObserver

  onMounted(() => {
    watch(element, () => {
      if (element.value) {
        size.value = { width: element.value.offsetWidth, height: element.value.offsetHeight }

        resizeObserver = new ResizeObserver((entries) => {
          if (!Array.isArray(entries))
            return

          // Since we only observe the one element, we don't need to loop over the
          // array
          if (!entries.length)
            return

          const entry = entries[0]
          let width: number
          let height: number

          if ('borderBoxSize' in entry) {
            const borderSizeEntry = entry.borderBoxSize
            // iron out differences between browsers
            const borderSize = Array.isArray(borderSizeEntry) ? borderSizeEntry[0] : borderSizeEntry
            width = borderSize.inlineSize
            height = borderSize.blockSize
          }
          else {
            if (element.value) {
              // for browsers that don't support `borderBoxSize`
              // we calculate it ourselves to get the correct border box.
              width = element.value.offsetWidth
              height = element.value.offsetHeight
            }
            else {
              width = 0
              height = 0
            }
          }

          size.value = { width, height }
        })

        resizeObserver.observe(element.value)

        stopHandle = watch(element, (newValue, oldValue) => {
          if (oldValue)
            resizeObserver.unobserve(oldValue)

          if (newValue)
            resizeObserver.observe(newValue)
        })
      }
      else {
        size.value = undefined
      }
    })
  })

  onUnmounted(() => {
    if (element.value) {
      stopHandle()
      resizeObserver.unobserve(element.value)
    }
  })

  return size
}

export { useSize }
