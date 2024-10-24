import { onWatcherCleanup, type Ref, shallowRef, watchEffect } from 'vue'
import { useBodyScrollLock } from '../hooks/index.ts'
import { usePresence } from '../presence/index.ts'
import {
  mergePrimitiveAttrs,
  type PrimitiveDefaultProps,
  type RadixPrimitiveGetAttrs,
  type RadixPrimitiveReturns,
} from '../shared/index.ts'
import { useDialogContext } from './DialogRoot.ts'

export interface DialogOverlayProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: boolean
}

export const DEFAULT_DIALOG_OVERLAY_PROPS = {
  forceMount: undefined,
} satisfies PrimitiveDefaultProps<DialogOverlayProps>

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
  const setElRef = props.el ? undefined : (value: HTMLElement | undefined) => el.value = value

  let isPresent: Ref<boolean>
  if (props.forceMount)
    isPresent = shallowRef(true)
  else
    isPresent = usePresence(el, () => context.open.value)

  watchEffect(() => {
    if (isPresent.value) {
      onWatcherCleanup(useBodyScrollLock())
    }
  })

  return {
    isPresent,
    attrs(extraAttrs) {
      const attrs = {
        'elRef': setElRef,
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
