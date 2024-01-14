import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import type { ComputedRef, Ref } from 'vue'
import { unrefElement } from '@oku-ui/use-composable'
import { useStateMachine } from './useStateMachine'

function getAnimationName(styles?: CSSStyleDeclaration) {
  return styles?.animationName || 'none'
}

export function usePresence(
  present: Ref<boolean>,
  el: ComputedRef<HTMLElement | undefined>,
) {
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

  watch(state, () => {
    const currentAnimationName = getAnimationName(stylesRef.value)
    prevAnimationNameRef.value = state.value === 'mounted' ? currentAnimationName : 'none'
  })

  const presentWatch = watch(present, async () => {
    await nextTick()

    const styles = stylesRef.value
    const wasPresent = prevPresentRef.value
    const hasPresentChanged = wasPresent !== present.value

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
  }, {
    immediate: true,
  })

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
    if (event.target === el.value && isCurrentAnimation) {
      // With React 18 concurrency this update is applied
      // a frame after the animation ends, creating a flash of visible content.
      // By manually flushing we ensure they sync within a frame, removing the flash.
      send('ANIMATION_END')
    }
  }

  const handleAnimationStart = (event: AnimationEvent) => {
    if (event.target === el.value)
      // if animation occurred, store its name as the previous animation.
      prevAnimationNameRef.value = getAnimationName(stylesRef.value)
  }

  const elWatch = watch(el, async (newEl, oldEl) => {
    await nextTick()

    if (el.value) {
      el.value.addEventListener('animationstart', handleAnimationStart)
      el.value.addEventListener('animationcancel', handleAnimationEnd)
      el.value.addEventListener('animationend', handleAnimationEnd)
    }
    else {
    // Transition to the unmounted state if the el is removed prematurely.
    // We avoid doing so during cleanup as the el may change but still exist.
      send('ANIMATION_END')

      oldEl?.removeEventListener('animationstart', handleAnimationStart)
      oldEl?.removeEventListener('animationcancel', handleAnimationEnd)
      oldEl?.removeEventListener('animationend', handleAnimationEnd)
    }
  }, {
    immediate: true,
  })

  onBeforeUnmount(() => {
    elWatch()
    presentWatch()
  })

  const isPresent = computed(() => {
    return ['mounted', 'unmountSuspended'].includes(state.value)
  },
  )

  return {
    isPresent,
    ref: (node: any) => {
      const element = unrefElement(node)
      if (element instanceof HTMLElement) {
        stylesRef.value = getComputedStyle(element)
        el.value = element
        return element
      }
      else {
        stylesRef.value = {} as any
        el.value = undefined
        return undefined
      }

      // if (node instanceof HTMLElement) {
      //   stylesRef.value = getComputedStyle(node)
      //   el.value = node
      // }
      // else if (node && node.$el instanceof HTMLElement) {
      //   stylesRef.value = getComputedStyle(node.$el)
      //   el.value = node.$el
      // }
      // else {
      //   stylesRef.value = {} as any
      //   el.value = undefined
      // }
    },

  }
}
