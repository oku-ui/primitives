/* eslint-disable vue/one-component-per-file */
import type { InjectionKey } from 'vue'
import { defineComponent, h } from 'vue'
import type { ComponentPropsWithoutRef } from '@oku-ui/primitive'
import { Primitive } from '@oku-ui/primitive'
import { createProvide } from '@oku-ui/provide'
import type { ImageLoadingStatus } from './types'
import { useImageLoadingStatus } from './utils'

/* -------------------------------------------------------------------------------------------------
 * Avatar
 * ----------------------------------------------------------------------------------------------- */

const AVATAR_NAME = 'Avatar'

type AvatarProvideValue = {
  src?: string
}
const PROVIDER_KEY = Symbol(AVATAR_NAME) as InjectionKey<AvatarProvideValue>

const [AvatarProvider, useAvatarInject] = createProvide<AvatarProvideValue>(PROVIDER_KEY, AVATAR_NAME)

// type AvatarElement = ComponentPropsWithoutRef<typeof Primitive.span>
type PrimitiveSpanProps = ComponentPropsWithoutRef<typeof Primitive.span>
interface AvatarProps extends PrimitiveSpanProps {
  src?: string
}

const Avatar = defineComponent<AvatarProps>({
  name: AVATAR_NAME,
  setup(_, { attrs, slots }) {
    const { src, ...avatarProps } = attrs as AvatarProps

    const { loadingStatus } = useImageLoadingStatus(src)

    return () => h(
      AvatarProvider, {
        src,
        loadingStatus,
      },
      h(
        Primitive.span, {
          ...avatarProps,
        },
        slots.default && slots.default(),
      ),
    )
  },
})

/* -------------------------------------------------------------------------------------------------
 * AvatarImage
 * ----------------------------------------------------------------------------------------------- */

const IMAGE_NAME = 'AvatarImage'

// type AvatarImageElement = ComponentPropsWithoutRef<typeof Primitive.img>
type PrimitiveImgProps = ComponentPropsWithoutRef<typeof Primitive.img>
interface AvatarImageProps extends PrimitiveImgProps {
  onLoadingStatusChange?: (status: ImageLoadingStatus) => void
}

const AvatarImage = defineComponent<AvatarImageProps>({
  name: IMAGE_NAME,
  inheritAttrs: false,
  setup(props, { attrs, slots }) {
    // const forwardedRef = ref<AvatarImageElement>()
    // onMounted(() => {
    //   emit('update:ref', forwardedRef.value)
    // })

    const { ...imageProps } = attrs as any
    const inject = useAvatarInject(PROVIDER_KEY, IMAGE_NAME)

    console.log('inject', inject)
    // const imageLoadingStatus = useImageLoadingStatus(props.src)

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

    return () => h(
      Primitive.img, {
        ...imageProps,
        src: props.src,
        // ref: forwardedRef,
      },
      slots.default && slots.default(),
    )
  },
})

/* -------------------------------------------------------------------------------------------------
 * AvatarFallback
 * ----------------------------------------------------------------------------------------------- */

const FALLBACK_NAME = 'AvatarFallback'

type PrimitiveAvatarFallbackProps = ComponentPropsWithoutRef<typeof Primitive.span>
// type PrimitiveSpanElement = ComponentPropsWithoutRef<typeof Primitive.span>
interface AvatarFallbackProps extends PrimitiveAvatarFallbackProps, PrimitiveSpanProps {
  delayms?: number
}

const AvatarFallback = defineComponent<AvatarFallbackProps>({
  name: FALLBACK_NAME,
  inheritAttrs: false,
  setup(props, { attrs, slots }) {
    // const forwardedRef = ref<PrimitiveSpanElement>()

    // onMounted(() => {
    //   emit('update:ref', forwardedRef.value)
    // })

    const { ...fallbackProps } = attrs as any
    // const provide = useAvatarInject(PROVIDER_KEY)
    // const canRender = ref(delayms === undefined)

    // watchEffect(() => {
    //   if (delayms === undefined) {
    //     const timerID = window.setTimeout(() => {
    //       canRender.value = true
    //     }, delayms)
    //     return () => window.clearTimeout(timerID)
    //   }
    // })

    return () => h(
      Primitive.span, {
        ...fallbackProps,
        // ref: forwardedRef,
      },
      slots.default && slots.default(),
    )
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
}

export type {
  AvatarProps,
  AvatarImageProps,
  AvatarFallbackProps,
}
