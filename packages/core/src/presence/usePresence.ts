import { computed, onWatcherCleanup, type Ref, toValue, watch, watchEffect } from 'vue'
import { useStateMachine } from '../hooks/index.ts'

function getAnimationName(styles?: CSSStyleDeclaration) {
  return styles?.animationName || 'none'
}

export function usePresence(
  elRef: Ref<HTMLElement | undefined>,
  present: Ref<boolean> | (() => boolean),
  onChange?: (value: boolean) => void,
) {
  let styles: CSSStyleDeclaration = {} as CSSStyleDeclaration
  let prevAnimationName = 'none'
  const initialState = toValue(present) ? 'mounted' : 'unmounted'

  const [state, send] = useStateMachine(initialState, {
    mounted: {
      UNMOUNT: 'unmounted',
      ANIMATION_OUT: 'unmountSuspended',
    },
    unmountSuspended: {
      MOUNT: 'mounted',
      ANIMATION_END: 'unmounted',
    },
    unmounted: {
      MOUNT: 'mounted',
    },
  })

  watchEffect(() => {
    const currentAnimationName = getAnimationName(styles)
    prevAnimationName = state.value === 'mounted' ? currentAnimationName : 'none'
  })

  watch(present, async (present, wasPresent) => {
    onChange?.(present)

    const currentAnimationName = getAnimationName(styles)

    if (present) {
      send('MOUNT')
    }
    else if (currentAnimationName === 'none' || styles?.display === 'none') {
      // If there is no exit animation or the element is hidden, animations won't run
      // so we unmount instantly
      send('UNMOUNT')
    }
    else {
      /**
       * When `present` changes to `false`, we check changes to animation-name to
       * determine whether an animation has started. We chose this approach (reading
       * computed styles) because there is no `animationrun` event and `animationstart`
       * fires after `animation-delay` has expired which would be too late.
       */
      const isAnimating = prevAnimationName !== currentAnimationName

      if (wasPresent && isAnimating) {
        send('ANIMATION_OUT')
      }
      else {
        send('UNMOUNT')
      }
    }
  }, {
    flush: 'post',
  })

  /**
   * Triggering an ANIMATION_OUT during an ANIMATION_IN will fire an `animationcancel`
   * event for ANIMATION_IN after we have entered `unmountSuspended` state. So, we
   * make sure we only trigger ANIMATION_END for the currently active animation.
   */
  async function handleAnimationEnd(event: AnimationEvent) {
    const currentAnimationName = getAnimationName(styles)
    const isCurrentAnimation = currentAnimationName.includes(
      event.animationName,
    )
    if (event.target === elRef.value && isCurrentAnimation) {
      // With React 18 concurrency this update is applied
      // a frame after the animation ends, creating a flash of visible content.
      // By manually flushing we ensure they sync within a frame, removing the flash.
      send('ANIMATION_END')
    }
  }

  function handleAnimationStart(event: AnimationEvent) {
    if (event.target === elRef.value)
      // if animation occurred, store its name as the previous animation.
      prevAnimationName = getAnimationName(styles)
  }

  watch(elRef, (node) => {
    if (node) {
      styles = getComputedStyle(node)
      node.addEventListener('animationstart', handleAnimationStart)
      node.addEventListener('animationcancel', handleAnimationEnd)
      node.addEventListener('animationend', handleAnimationEnd)

      onWatcherCleanup(() => {
        node.removeEventListener('animationstart', handleAnimationStart)
        node.removeEventListener('animationcancel', handleAnimationEnd)
        node.removeEventListener('animationend', handleAnimationEnd)
      })
    }
    else {
      // Transition to the unmounted state if the el is removed prematurely.
      // We avoid doing so during cleanup as the el may change but still exist.
      send('ANIMATION_END')
    }
  })

  return computed(() => state.value === 'mounted' || state.value === 'unmountSuspended')
}
