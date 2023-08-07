import { onBeforeUnmount, onMounted, ref } from 'vue'
import { observeElementRect } from '@oku-ui/utils'
import type { Measurable } from '@oku-ui/utils'

const measurableElement = ref<Measurable | null>(null)
const rect = ref<DOMRectReadOnly | null>(null)

function useRect() {
  onMounted(() => {
    if (measurableElement.value) {
      const unobserve = observeElementRect(measurableElement.value, (newRect) => {
        rect.value = newRect
      })

      onBeforeUnmount(() => {
        rect.value = null
        unobserve()
      })
    }
  })

  return {
    measurableElement,
    rect,
  }
}

export {
  useRect,
}
