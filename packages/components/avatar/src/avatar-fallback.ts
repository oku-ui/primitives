import { defineComponent, h, mergeProps, onBeforeUnmount, onMounted, reactive, ref, toRefs } from 'vue'
import { reactiveOmit, useForwardRef, useListeners } from '@oku-ui/use-composable'
import { Primitive } from '@oku-ui/primitive'
import { AVATAR_FALLBACK_NAME, avatarFallbackProps, scopeAvatarProps, useAvatarInject } from './props'
import type { AvatarFallbackNativeElement } from './props'

const avatarFallback = defineComponent({
  name: AVATAR_FALLBACK_NAME,
  inheritAttrs: false,
  props: {
    ...avatarFallbackProps.props,
    ...scopeAvatarProps,
  },
  emit: {
    ...avatarFallbackProps.emits,
  },
  setup(props, { attrs, slots }) {
    const {
      scopeOkuAvatar,
      delayMs,
      ...fallbackProps
    } = toRefs(props)

    const _reactive = reactive(fallbackProps)
    const otherProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const inject = useAvatarInject(AVATAR_FALLBACK_NAME, scopeOkuAvatar.value)
    const canRender = ref(delayMs.value === undefined)

    const forwardedRef = useForwardRef()
    const listeners = useListeners()

    let timerId: number

    const setupTimer = () => {
      if (delayMs.value !== undefined)
        timerId = window.setTimeout(() => canRender.value = true, delayMs.value)
    }

    onMounted(() => setupTimer())

    onBeforeUnmount(() => window.clearTimeout(timerId))

    return () => canRender.value && inject.imageLoadingStatus.value !== 'loaded'
      ? h(Primitive.span, {
        ...mergeProps(attrs, otherProps, listeners),
        ref: forwardedRef,
      }, slots)
      : null
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuAvatarFallback = avatarFallback as typeof avatarFallback &
  (new () => { $props: AvatarFallbackNativeElement })
