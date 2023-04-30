/* eslint-disable vue/one-component-per-file */
import { defineComponent, h, onMounted, ref, watchEffect } from 'vue'
import type { ComponentPropsWithoutRef } from '@oku-ui/primitive'
import { Primitive } from '@oku-ui/primitive'
import { createProvide } from '@oku-ui/provide'

const PROVIDER_KEY = 'Avatar'

/* -------------------------------------------------------------------------------------------------
 * Avatar
 * ----------------------------------------------------------------------------------------------- */

const AVATAR_NAME = PROVIDER_KEY

type ImageLoadingStatus = 'idle' | 'loading' | 'loaded' | 'error'

type AvatarProvideValue = {
  imageLoadingStatus: ImageLoadingStatus
  onImageLoadingStatusChange(status: ImageLoadingStatus): void
}

const [AvatarProvider, useAvatarInject] = createProvide<AvatarProvideValue>(PROVIDER_KEY)

type AvatarElement = ComponentPropsWithoutRef<typeof Primitive.span>
type PrimitiveSpanProps = ComponentPropsWithoutRef<typeof Primitive.span>
interface AvatarProps extends PrimitiveSpanProps {}

const Avatar = defineComponent<AvatarProps>({
  name: AVATAR_NAME,
  inheritAttrs: false,
  setup(props, { attrs, slots, emit }) {
    const forwardedRef = ref<AvatarElement>()

    onMounted(() => {
      emit('update:ref', forwardedRef.value)
    })
    const { ...avatarProps } = attrs as any
    const imageLoadingStatus = ref<ImageLoadingStatus>('idle')

    return () => h(
      Primitive.span, {
        ...avatarProps,
        ref: forwardedRef,
      },
      slots.default && slots.default(),
    )
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

const AvatarImage = defineComponent<ScopedProps<AvatarImageProps>>({
  name: IMAGE_NAME,
  inheritAttrs: false,
  setup(props, { attrs, slots, emit }) {
    const forwardedRef = ref<AvatarImageElement>()
    onMounted(() => {
      emit('update:ref', forwardedRef.value)
    })

    const { __scopeAvatar, src, onLoadingStatusChange = () => {}, ...imageProps } = attrs as any
    const inject = useAvatarInject(PROVIDER_KEY)
    // const imageLoadingStatus = useImageLoadingStatus(src)

    // const handleLoadingStatusChange = useCallbackRef((status: ImageLoadingStatus) => {
    //   onLoadingStatusChange(status)
    //   inject.value.onImageLoadingStatusChange(status)
    // })

    // onMounted(() => {
    //   if (imageLoadingStatus.value !== 'idle')
    //     handleLoadingStatusChange(imageLoadingStatus.value)
    // })

    // watch(imageLoadingStatus, (newValue) => {
    //   if (newValue !== 'idle')
    //     handleLoadingStatusChange(newValue)
    // })

    return () => imageLoadingStatus.value === 'loaded'
      ? h(
        Primitive.img, {
          ...imageProps,
          src,
          ref: forwardedRef,
        },
        slots.default && slots.default(),
      )
      : null
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

const AvatarFallback = defineComponent<AvatarFallbackProps>({
  name: FALLBACK_NAME,
  inheritAttrs: false,
  setup(props, { attrs, emit, slots }) {
    const forwardedRef = ref<PrimitiveSpanElement>()

    onMounted(() => {
      emit('update:ref', forwardedRef.value)
    })

    const { __scopeAvatar, delayms, ...fallbackProps } = attrs as any
    const provide = useAvatarInject(PROVIDER_KEY)
    const canRender = ref(delayms === undefined)

    watchEffect(() => {
      if (delayms === undefined) {
        const timerID = window.setTimeout(() => {
          canRender.value = true
        }, delayms)
        return () => window.clearTimeout(timerID)
      }
    })

    return () => (canRender.value && (provide.value.imageLoadingStatus !== 'loaded'))
      ? h(
        Primitive.span, {
          ...fallbackProps,
          ref: forwardedRef,
        },
        slots.default && slots.default(),
      )
      : null
  },
})

/* ----------------------------------------------------------------------------------------------- */

const OkuAvatar = Avatar
const OkuAvatarImage = AvatarImage
const OkuAvatarFallback = AvatarFallback

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
}
