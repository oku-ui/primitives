import { defineComponent, h, onMounted, ref, watchEffect } from 'vue'
import type { ElementType, IPrimitiveProps, InstanceTypeRef, MergeProps } from '@oku-ui/primitive'
import { Primitive } from '@oku-ui/primitive'
import { ScopePropObject } from '@oku-ui/provide'
import { useForwardRef } from '@oku-ui/use-composable'
import { useAvatarInject } from './avatar'

const FALLBACK_NAME = 'OkuAvatarFallback'

type AvatarFallbackElement = ElementType<'span'>
export type _AvatarFalbackEl = HTMLSpanElement

interface AvatarFallbackProps extends IPrimitiveProps {
  delayMs?: number
}

const AvatarFallback = defineComponent({
  name: FALLBACK_NAME,
  inheritAttrs: false,
  props: {
    delayMs: {
      type: Number,
      required: false,
    },
    scopeAvatar: {
      ...ScopePropObject,
    },
  },
  setup(props, { attrs, slots }) {
    const { ...fallbackProps } = attrs as AvatarFallbackProps
    const provide = useAvatarInject(FALLBACK_NAME, props.scopeAvatar)
    const canRender = ref(props.delayMs === undefined)

    const forwardedRef = useForwardRef()

    onMounted(() => {
      if (props.delayMs === undefined)
        canRender.value = true
      else
        canRender.value = false
    })

    onMounted(() => {
      watchEffect(() => {
        if (props.delayMs !== undefined) {
          const timerID = window.setTimeout(() => {
            canRender.value = true
          }, props.delayMs)
          return () => window.clearTimeout(timerID)
        }
      })
    })

    const originalReturn = () => {
      return (canRender.value && (provide.imageLoadingStatus !== 'loaded'))
        ? h(
          Primitive.span, {
            ...fallbackProps,
            ref: forwardedRef,
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
type _OkuAvatarFallbackProps = MergeProps<AvatarFallbackProps, AvatarFallbackElement>

type InstanceAvatarFallbackType = InstanceTypeRef<typeof AvatarFallback, _AvatarFalbackEl>

const OkuAvatarFallback = AvatarFallback as typeof AvatarFallback & (new () => { $props: _OkuAvatarFallbackProps })

export {
  OkuAvatarFallback,
}

export type {
  AvatarFallbackProps,
  AvatarFallbackElement,
  InstanceAvatarFallbackType,
}
