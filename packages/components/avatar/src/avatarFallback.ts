import { defineComponent, h, onMounted, ref, toRef, watchEffect } from 'vue'
import type { ElementType, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
import { useAvatarInject } from './avatar'
import type { ScopeAvatar } from './utils'
import { scopeAvatarProps } from './utils'

const FALLBACK_NAME = 'OkuAvatarFallback'

export type AvatarFallbackIntrinsicElement = ElementType<'span'>
export type AvatarFalbackElement = HTMLSpanElement

export interface AvatarFallbackProps extends PrimitiveProps {
  delayMs?: number
}

export const avatarFallbackProps = {
  props: {
    delayMs: {
      type: Number,
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
    const delayMs = toRef(props, 'delayMs')
    const { ...fallbackAttrs } = attrs as AvatarFallbackIntrinsicElement
    const provide = useAvatarInject(FALLBACK_NAME, props.scopeOkuAvatar)
    const canRender = ref(delayMs.value === undefined)

    const forwardedRef = useForwardRef()

    onMounted(() => {
      if (delayMs.value === undefined)
        canRender.value = true
      else
        canRender.value = false
    })

    onMounted(() => {
      watchEffect(() => {
        if (delayMs.value !== undefined) {
          const timerID = window.setTimeout(() => {
            canRender.value = true
          }, delayMs.value)
          return () => window.clearTimeout(timerID)
        }
      })
    })

    const originalReturn = () => {
      return (canRender.value && (provide.imageLoadingStatus !== 'loaded'))
        ? h(
          Primitive.span, {
            ...fallbackAttrs,
            ref: forwardedRef,
            asChild: props.asChild,
          },
          {
            default: () => slots.default?.(),
          },
        )
        : canRender.value
    }

    return originalReturn
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuAvatarFallback = avatarFallback as typeof avatarFallback &
(new () => {
  $props: ScopeAvatar<Partial<AvatarFalbackElement>>
})
