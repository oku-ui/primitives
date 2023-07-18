import { type Ref, computed, nextTick, ref, watch, watchEffect } from 'vue'
import { useStateMachine } from './useStateMachine'

function getAnimationName(styles?: CSSStyleDeclaration) {
  return styles?.animationName || 'none'
}

export function usePresence(present: Ref<boolean>) {
  const node = ref<HTMLElement>() as Ref<HTMLElement>
  const stylesRef = ref<CSSStyleDeclaration>({} as any)
  const prevPresentRef = ref(present.value)
  const prevAnimationNameRef = ref<string>('none')
  const initialState = present.value ? 'mounted' : 'unmounted'

  const { state, dispatch: send } = useStateMachine(initialState, {
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
    const currentAnimationName = getAnimationName(stylesRef.value)

    prevAnimationNameRef.value = state.value === 'mounted' ? currentAnimationName : 'none'
  })

  watchEffect(async () => {
    const styles = stylesRef.value
    const wasPresent = prevPresentRef.value
    const hasPresentChanged = wasPresent !== present.value

    await nextTick()

    if (hasPresentChanged) {
      const prevAnimationName = prevAnimationNameRef.value
      const currentAnimationName = getAnimationName(styles)

      if (present.value) {
        send('MOUNT')
      }
      else if (currentAnimationName === 'none'
      || styles?.display === 'none'
      ) {
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
        if (wasPresent && isAnimating)
          send('ANIMATION_OUT')
        else
          send('UNMOUNT')
      }

      prevPresentRef.value = present.value
    }
  })

  watchEffect(async (onCleanup) => {
    if (node.value) {
    /**
         * Triggering an ANIMATION_OUT during an ANIMATION_IN will fire an `animationcancel`
         * event for ANIMATION_IN after we have entered `unmountSuspended` state. So, we
         * make sure we only trigger ANIMATION_END for the currently active animation.
         */
      const handleAnimationEnd = async (event: AnimationEvent) => {
        const currentAnimationName = getAnimationName(stylesRef.value)
        const isCurrentAnimation = currentAnimationName.includes(
          event.animationName,
        )
        if (event.target === node.value && isCurrentAnimation) {
        // With React 18 concurrency this update is applied
        // a frame after the animation ends, creating a flash of visible content.
        // By manually flushing we ensure they sync within a frame, removing the flash.
          await nextTick(() => send('ANIMATION_END'))
        }
      }
      const handleAnimationStart = (event: AnimationEvent) => {
        if (event.target === node.value)
        // if animation occurred, store its name as the previous animation.
          prevAnimationNameRef.value = getAnimationName(stylesRef.value)
      }
      node.value.addEventListener('animationstart', handleAnimationStart)
      node.value.addEventListener('animationcancel', handleAnimationEnd)
      node.value.addEventListener('animationend', handleAnimationEnd)

      onCleanup(() => {
        if (node.value) {
          node.value.removeEventListener('animationstart', handleAnimationStart)
          node.value.removeEventListener('animationcancel', handleAnimationEnd)
          node.value.removeEventListener('animationend', handleAnimationEnd)
        }
      })
    }
    else {
    // Transition to the unmounted state if the node is removed prematurely.
    // We avoid doing so during cleanup as the node may change but still exist.
      await nextTick(() => send('ANIMATION_END'))
    }
  })

  const isPresent = computed(() =>
    ['mounted', 'unmountSuspended'].includes(state.value),
  )

  watch(node, (node) => {
    if (node)
      stylesRef.value = window.getComputedStyle(node)
  })
  return {
    isPresent,
    ref: node,
  }
}
