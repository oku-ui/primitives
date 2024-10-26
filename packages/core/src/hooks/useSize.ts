import { type MaybeRefOrGetter, onWatcherCleanup, shallowRef, toValue, watch } from 'vue'

interface Size {
  width: number
  height: number
}

export function useSize(elementRef: MaybeRefOrGetter<HTMLElement | undefined>) {
  const size = shallowRef<Size>()

  watch(() => toValue(elementRef), (element) => {
    if (!element) {
    // We only want to reset to `undefined` when the element becomes `null`,
    // not if it changes to another element.
      size.value = undefined

      return
    }

    size.value = { width: element.offsetWidth, height: element.offsetHeight }

    const resizeObserver = new ResizeObserver((entries) => {
      if (!Array.isArray(entries))
        return

      // Since we only observe the one element, we don't need to loop over the
      // array
      if (!entries.length)
        return

      const entry = entries[0]
      let width: number
      let height: number

      if (entry && 'borderBoxSize' in entry) {
        const borderSizeEntry = entry.borderBoxSize
        // iron out differences between browsers
        const borderSize = Array.isArray(borderSizeEntry) ? borderSizeEntry[0] : borderSizeEntry
        width = borderSize.inlineSize
        height = borderSize.blockSize
      }
      else {
        // for browsers that don't support `borderBoxSize`
        // we calculate it ourselves to get the correct border box.
        width = element!.offsetWidth
        height = element!.offsetHeight
      }

      size.value = { width, height }
    })

    resizeObserver.observe(element, { box: 'border-box' })

    onWatcherCleanup(() => {
      resizeObserver.unobserve(element)
    })
  }, { flush: 'post' })

  return size
}
