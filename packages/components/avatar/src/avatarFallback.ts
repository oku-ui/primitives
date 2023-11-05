import type { PropType } from 'vue'
import { defineComponent, h, onBeforeUnmount, onMounted, ref } from 'vue'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
import { useAvatarInject } from './avatar'
import { scopeAvatarProps } from './utils'

const FALLBACK_NAME = 'OkuAvatarFallback'

export type AvatarFallbackNaviteElement = OkuElement<'span'>
export type AvatarFalbackElement = HTMLSpanElement

export interface AvatarFallbackProps extends PrimitiveProps {
  delayMs?: number
}

export const avatarFallbackProps = {
  props: {
    delayMs: {
      type: Number as PropType<number | undefined>,
      default: undefined,
      required: false,
    },
  },
}

const avatarFallback = defineComponent({
  name: FALLBACK_NAME,
  inheritAttrs: false,
  props: {
    ...avatarFallbackProps.props,
    ...scopeAvatarProps,
    ...primitiveProps,
  },
  setup(props, { attrs, slots }) {
    const provide = useAvatarInject(FALLBACK_NAME, props.scopeOkuAvatar)
    const canRender = ref(props.delayMs === undefined)

    const forwardedRef = useForwardRef()

    let timerId: number | null = null

    const clearTimer = () => {
      if (timerId !== null) {
        clearTimeout(timerId)
        timerId = null
      }
    }

    const setupTimer = () => {
      clearTimer()
      if (props.delayMs !== undefined) {
        timerId = window.setTimeout(() => {
          canRender.value = true
        }, props.delayMs)
      }
    }

    onMounted(() => setupTimer())

    onBeforeUnmount(() => {
      clearTimer()
    })

    const originalReturn = () => {
      return (canRender.value && (provide.imageLoadingStatus.value !== 'loaded'))
        ? h(
          Primitive.span,
          {
            ...attrs,
            ref: forwardedRef,
            asChild: false,
          },
          {
            default: () => slots.default?.(),
          },
        )
        : null
    }

    return originalReturn
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuAvatarFallback = avatarFallback as typeof avatarFallback &
(new () => {
  $props: AvatarFallbackNaviteElement
})
