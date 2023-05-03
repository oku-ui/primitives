/// <reference types="resize-observer-browser" />

import type { WatchStopHandle } from 'vue'
import { onMounted, onUnmounted, ref, watch } from 'vue'

interface Size {
  width: number
  height: number
}

function useSize(element: HTMLElement | null) {
  const size = ref<Size>()
  let stopHandle: WatchStopHandle
  let resizeObserver: ResizeObserver

  onMounted(() => {
    if (element) {
      size.value = { width: element.offsetWidth, height: element.offsetHeight }

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
        // for browsers that don't support `borderBoxSize`
        // we calculate it ourselves to get the correct border box.
          width = element.offsetWidth
          height = element.offsetHeight
        }

        size.value = { width, height }
      })

      resizeObserver.observe(element)

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

  onUnmounted(() => {
    if (element) {
      stopHandle()
      resizeObserver.unobserve(element)
    }
  })

  return size
}

export { useSize }
