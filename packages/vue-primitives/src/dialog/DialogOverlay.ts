import { onWatcherCleanup, type Ref, shallowRef, watchEffect } from 'vue'
import { useBodyScrollLock } from '../hooks/index.ts'
import { usePresence } from '../presence/index.ts'
import { mergePrimitiveAttrs, type RadixPrimitiveGetAttrs, type RadixPrimitiveReturns } from '../shared/index.ts'
import { useDialogContext } from './DialogRoot.ts'

export interface DialogOverlayProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: boolean
}

export interface UseDialogOverlayProps {
  forceMount?: boolean
  el?: Ref<HTMLElement | undefined>
}

export function useDialogOverlay(props: UseDialogOverlayProps = {}): RadixPrimitiveReturns<{
  isPresent: Ref<boolean>
  attrs: RadixPrimitiveGetAttrs
}> {
  const context = useDialogContext('DialogOverlay')

  const el = props.el || shallowRef<HTMLElement>()
  const setTemplateEl = props.el ? undefined : (value: HTMLElement | undefined) => el.value = value

  const isPresent = usePresence(el, () => props.forceMount || context.open.value)

  watchEffect(() => {
    if (isPresent.value) {
      onWatcherCleanup(useBodyScrollLock())
    }
  })

  return {
    isPresent,
    attrs(extraAttrs) {
      const attrs = {
        'elRef': setTemplateEl,
        'data-state': isPresent.value ? 'open' : 'closed',
        'style': 'pointer-events: auto',
      }

      if (extraAttrs && extraAttrs.length > 0) {
        mergePrimitiveAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}
