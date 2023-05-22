import type { ComponentPublicInstance, PropType } from 'vue'
import { computed, defineComponent, h, onMounted, onUnmounted, ref, watch, watchEffect } from 'vue'
import type { ElementType, MergeProps, PrimitiveProps, RefElement } from '@oku-ui/primitive'
import { Primitive } from '@oku-ui/primitive'
import type { Scope } from '@oku-ui/provide'
import { createProvideScope } from '@oku-ui/provide'
import { useCallbackRef } from '@oku-ui/use-composable'

function useImageLoadingStatus(src?: string) {
  const loadingStatus = ref<ImageLoadingStatus>('idle')

  onMounted(() => {
    if (!src) {
      loadingStatus.value = 'error'
      return
    }

    let isMounted = true
    const image = new window.Image()

    const updateStatus = (status: ImageLoadingStatus) => () => {
      if (!isMounted)
        return
      loadingStatus.value = status
    }

    loadingStatus.value = 'loading'
    image.onload = updateStatus('loaded')
    image.onerror = updateStatus('error')
    image.src = src

    onUnmounted(() => {
      isMounted = false
    })
  })

  return loadingStatus
}

/* -------------------------------------------------------------------------------------------------
 * Avatar
 * ----------------------------------------------------------------------------------------------- */

const AVATAR_NAME = 'Avatar'
const [createAvatarProvide, createAvatarScope] = createProvideScope(AVATAR_NAME)

type ImageLoadingStatus = 'idle' | 'loading' | 'loaded' | 'error'

type AvatarProvideValue = {
  imageLoadingStatus: ImageLoadingStatus
  onImageLoadingStatusChange(status: ImageLoadingStatus): void
}

const [AvatarProvider, useAvatarInject] = createAvatarProvide<AvatarProvideValue>(AVATAR_NAME)

type AvatarElement = ElementType<'span'>

interface AvatarProps extends PrimitiveProps {
  scopeAvatar?: Scope
}

const Avatar = defineComponent({
  name: AVATAR_NAME,
  inheritAttrs: false,
  props: {
    scopeAvatar: {
      type: Object as unknown as PropType<Scope>,
      required: false,
    },
  },
  setup(props, { attrs, slots, expose }) {
    const { ...avatarProps } = attrs as AvatarElement
    const innerRef = ref()
    const imageLoadingStatus = ref<ImageLoadingStatus>('idle')

    AvatarProvider({
      scope: props.scopeAvatar,
      imageLoadingStatus: imageLoadingStatus.value,
      onImageLoadingStatusChange: (status: ImageLoadingStatus) => {
        imageLoadingStatus.value = status
      },
    })

    expose({
      inferRef: computed(() => innerRef.value?.$el),
    })

    const originalReturn = () => h(
      Primitive.span, {
        ...avatarProps,
        ref: innerRef,
      },
      {
        default: () => slots.default?.(),
      },
    )
    return originalReturn as unknown as {
      innerRef: AvatarElement
    }
  },
})

/* -------------------------------------------------------------------------------------------------
 * AvatarImage
 * ----------------------------------------------------------------------------------------------- */

const IMAGE_NAME = 'AvatarImage'

type AvatarImageElement = ElementType<'img'>

interface AvatarImageProps extends PrimitiveProps {
  onLoadingStatusChange?: (status: ImageLoadingStatus) => void
  scopeAvatar?: Scope
}

const AvatarImage = defineComponent({
  name: IMAGE_NAME,
  inheritAttrs: false,
  props: {
    onLoadingStatusChange: {
      type: Function as unknown as PropType<(status: ImageLoadingStatus) => void>,
      required: false,
      default: () => {},
    },
    scopeAvatar: {
      type: Object as unknown as PropType<Scope>,
      required: false,
    },
  },
  setup(props, { attrs, slots, expose }) {
    const { src, ...imageProps } = attrs as AvatarImageElement
    const inject = useAvatarInject(IMAGE_NAME, props.scopeAvatar)
    const innerRef = ref<ComponentPublicInstance>()
    const imageLoadingStatus = useImageLoadingStatus(src)

    const handleLoadingStatusChange = useCallbackRef((status: ImageLoadingStatus) => {
      props.onLoadingStatusChange(status)
      inject.value.onImageLoadingStatusChange(status)
    })

    onMounted(() => {
      if (imageLoadingStatus.value !== 'idle')
        handleLoadingStatusChange(imageLoadingStatus.value)
    })

    watch(imageLoadingStatus, (newValue) => {
      if (newValue !== 'idle')
        handleLoadingStatusChange(newValue)
    })

    expose({
      innerRef: computed(() => innerRef.value?.$el),
    })

    const originalReturn = () => imageLoadingStatus.value === 'loaded'
      ? h(
        Primitive.img, {
          ...imageProps,
          src,
          ref: innerRef,
        },
        {
          default: () => slots.default?.(),
        },
      )
      : null

    return originalReturn as unknown as {
      innerRef: AvatarImageElement
    }
  },
})

/* -------------------------------------------------------------------------------------------------
 * AvatarFallback
 * ----------------------------------------------------------------------------------------------- */

const FALLBACK_NAME = 'AvatarFallback'

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

/* ----------------------------------------------------------------------------------------------- */

// TODO: https://github.com/vuejs/core/pull/7444 after delete
type _OkuAvatarProps = MergeProps<AvatarProps, AvatarElement>
type _OkuAvatarImageProps = MergeProps<AvatarImageProps, AvatarImageElement>
type _OkuAvatarFallbackProps = MergeProps<AvatarFallbackProps, AvatarFallbackElement>

type AvatarRef = RefElement<typeof Avatar>
type AvatarImageRef = RefElement<typeof AvatarImage>
type AvatarFallbackRef = RefElement<typeof AvatarFallback>

const OkuAvatar = Avatar as typeof Avatar & (new () => { $props: _OkuAvatarProps })
const OkuAvatarImage = AvatarImage as typeof AvatarImage & (new () => { $props: _OkuAvatarImageProps })
const OkuAvatarFallback = AvatarFallback as typeof AvatarFallback & (new () => { $props: _OkuAvatarFallbackProps })

export {
  OkuAvatar,
  OkuAvatarImage,
  OkuAvatarFallback,
  createAvatarScope,
}

export type {
  AvatarProps,
  AvatarImageProps,
  AvatarFallbackProps,
  AvatarElement,
  AvatarImageElement,
  AvatarFallbackElement,
  AvatarRef,
  AvatarImageRef,
  AvatarFallbackRef,
}
