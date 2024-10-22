import { onBeforeUnmount, onMounted, shallowRef } from 'vue'
import { useToastProviderContext } from './ToastProvider.ts'
import { useNextFrame } from './utils.ts'

export interface ToastAnnounceProps {
  label?: string
}

export interface UseToastAnnounceProps {
  label?: string
}

export function useToastAnnounce(props: UseToastAnnounceProps = {}) {
  const context = useToastProviderContext('ToastAnnounce')
  const renderAnnounceText = shallowRef(false)
  const isAnnounced = shallowRef(false)

  let timer: number = 0
  let clear: () => void

  onMounted(() => {
    // cleanup after announcing
    timer = window.setTimeout(() => {
      isAnnounced.value = true
      timer = 0
    }, 1000)

    // render text content in the next frame to ensure toast is announced in NVDA
    clear = useNextFrame(() => {
      renderAnnounceText.value = true
    })
  })

  onBeforeUnmount(() => {
    if (timer)
      window.clearTimeout(timer)
    clear?.()
  })

  return {
    isAnnounced,
    renderAnnounceText,
    label: context.label + (props.label ? ` ${props.label}` : ''),
  }
}
