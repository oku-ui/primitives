import type { ComponentPublicInstance, PropType } from 'vue'
import { computed, defineComponent, h, onMounted, ref, watchEffect } from 'vue'
import type { ElementType, MergeProps, PrimitiveProps, RefElement } from '@oku-ui/primitive'
import { Primitive } from '@oku-ui/primitive'
import type { Scope } from '@oku-ui/provide'
import { useAvatarInject } from './avatar'

const FALLBACK_NAME = 'OkuAvatarFallback'

type AvatarFallbackElement = ElementType<'span'>

interface AvatarFallbackProps extends PrimitiveProps {
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
      type: Object as unknown as PropType<Scope>,
      required: false,
    },
  },
  setup(props, { attrs, expose, slots }) {
    const { ...fallbackProps } = attrs as AvatarFallbackProps
    const provide = useAvatarInject(FALLBACK_NAME, props.scopeAvatar)
    const canRender = ref(props.delayMs === undefined)
    const innerRef = ref<ComponentPublicInstance>()

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

    expose({
      innerRef: computed(() => innerRef.value?.$el),
    })

    const originalReturn = () => {
      return (canRender.value && (provide.value.imageLoadingStatus !== 'loaded'))
        ? h(
          Primitive.span, {
            ...fallbackProps,
            ref: innerRef,
          },
          {
            default: () => slots.default?.(),
          },
        )
        : canRender.value
    }

    return originalReturn as unknown as {
      innerRef: AvatarFallbackElement
    }
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
type _OkuAvatarFallbackProps = MergeProps<AvatarFallbackProps, AvatarFallbackElement>

type AvatarFallbackRef = RefElement<typeof AvatarFallback>

const OkuAvatarFallback = AvatarFallback as typeof AvatarFallback & (new () => { $props: _OkuAvatarFallbackProps })

export {
  OkuAvatarFallback,
}

export type {
  AvatarFallbackProps,
  AvatarFallbackElement,
  AvatarFallbackRef,
}
