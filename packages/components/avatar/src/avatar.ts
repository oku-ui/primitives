/* eslint-disable vue/one-component-per-file */
import type { ComponentPublicInstance } from 'vue'
import { computed, defineComponent, h, onMounted, onUnmounted, ref, watch, watchEffect } from 'vue'
import type { ComponentPropsWithoutRef } from '@oku-ui/primitive'
import { Primitive } from '@oku-ui/primitive'
import type { Scope } from '@oku-ui/provide'
import { createProvideScope } from '@oku-ui/provide'
import { useCallbackRef } from '@oku-ui/use-callback-ref'

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
type ScopedProps<P> = P & { __scopeAvatar?: Scope }
const [createAvatarProvide, createAvatarScope] = createProvideScope(AVATAR_NAME)

type ImageLoadingStatus = 'idle' | 'loading' | 'loaded' | 'error'

type AvatarProvideValue = {
  imageLoadingStatus: ImageLoadingStatus
  onImageLoadingStatusChange(status: ImageLoadingStatus): void
}

const [AvatarProvider, useAvatarInject] = createAvatarProvide<AvatarProvideValue>(AVATAR_NAME)

type AvatarElement = ComponentPropsWithoutRef<typeof Primitive.span>
type PrimitiveSpanProps = ComponentPropsWithoutRef<typeof Primitive.span>
interface AvatarProps extends PrimitiveSpanProps {}

const Avatar = defineComponent({
  name: AVATAR_NAME,
  inheritAttrs: false,
  setup(props, { attrs, slots, expose }) {
    const { __scopeAvatar, ...avatarProps } = attrs as ScopedProps<AvatarProps>
    const innerRef = ref()
    const imageLoadingStatus = ref<ImageLoadingStatus>('idle')

    AvatarProvider({
      scope: __scopeAvatar,
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
      slots.default && slots.default(),
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

type AvatarImageElement = ComponentPropsWithoutRef<typeof Primitive.img>
type PrimitiveImgProps = ComponentPropsWithoutRef<typeof Primitive.img>
interface AvatarImageProps extends PrimitiveImgProps {
  onLoadingStatusChange?: (status: ImageLoadingStatus) => void
}

const AvatarImage = defineComponent({
  name: IMAGE_NAME,
  inheritAttrs: false,
  setup(props, { attrs, slots, expose }) {
    const { __scopeAvatar, src, onLoadingStatusChange = () => {}, ...imageProps } = attrs as ScopedProps<AvatarImageProps>
    const inject = useAvatarInject(IMAGE_NAME, __scopeAvatar)
    const innerRef = ref<ComponentPublicInstance>()
    const imageLoadingStatus = useImageLoadingStatus(src)

    const handleLoadingStatusChange = useCallbackRef((status: ImageLoadingStatus) => {
      onLoadingStatusChange(status)
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
        slots.default && slots.default(),
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

type PrimitiveAvatarFallbackProps = ComponentPropsWithoutRef<typeof Primitive.span>
type PrimitiveSpanElement = ComponentPropsWithoutRef<typeof Primitive.span>
interface AvatarFallbackProps extends PrimitiveAvatarFallbackProps, PrimitiveSpanProps {
  delayms?: number
}
const AvatarFallback = defineComponent({
  name: FALLBACK_NAME,
  inheritAttrs: false,
  setup(props, { attrs, expose, slots }) {
    const { __scopeAvatar, delayms, ...fallbackProps } = attrs as ScopedProps<AvatarFallbackProps>
    const provide = useAvatarInject(FALLBACK_NAME, __scopeAvatar)
    const canRender = ref(delayms === undefined)
    const innerRef = ref<ComponentPublicInstance>()

    onMounted(() => {
      if (delayms === undefined)
        canRender.value = true
      else
        canRender.value = false
    })

    watchEffect(() => {
      if (delayms !== undefined) {
        const timerID = window.setTimeout(() => {
          canRender.value = true
        }, delayms)
        return () => window.clearTimeout(timerID)
      }
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
          slots.default && slots.default(),
        )
        : canRender.value
    }

    return originalReturn as unknown as {
      innerRef: PrimitiveSpanElement
    }
  },
})

/* ----------------------------------------------------------------------------------------------- */

const OkuAvatar = Avatar as typeof Avatar & (new () => { $props: ScopedProps<AvatarProps> })
const OkuAvatarImage = AvatarImage as typeof AvatarImage & (new () => { $props: ScopedProps<AvatarImageProps> })
const OkuAvatarFallback = AvatarFallback as typeof AvatarFallback & (new () => { $props: ScopedProps<AvatarFallbackProps> })

type OkuAvatarElement = Omit<InstanceType<typeof Avatar>, keyof ComponentPublicInstance>
type OkuAvatarImageElement = Omit<InstanceType<typeof AvatarImage>, keyof ComponentPublicInstance>
type OkuAvatarFallbackElement = Omit<InstanceType<typeof AvatarFallback>, keyof ComponentPublicInstance>

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
  OkuAvatarElement,
  OkuAvatarImageElement,
  OkuAvatarFallbackElement,
}
