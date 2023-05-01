/* eslint-disable vue/one-component-per-file */
import type { InjectionKey, Ref } from 'vue'
import { defineComponent, h, ref, watchEffect } from 'vue'
import type { ComponentPropsWithoutRef } from '@oku-ui/primitive'
import { Primitive } from '@oku-ui/primitive'
import { createProvide } from '@oku-ui/provide'

type ImageLoadingStatus = 'idle' | 'loading' | 'loaded' | 'error'

/* -------------------------------------------------------------------------------------------------
 * Avatar
 * ----------------------------------------------------------------------------------------------- */

const AVATAR_NAME = 'Avatar'

type AvatarProvideValue = {
  src?: string
  loadingStatus: Ref<ImageLoadingStatus>
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

    const { ...imageProps } = attrs as AvatarImageProps
    const inject = useAvatarInject(PROVIDER_KEY, IMAGE_NAME)

    return () => inject.loadingStatus.value === 'loaded'
      ? null
      : h(
        Primitive.img, {
          ...imageProps,
          src: inject.src,
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

    const inject = useAvatarInject(PROVIDER_KEY, FALLBACK_NAME)

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

    return () => inject.loadingStatus.value !== 'loaded'
      ? h(
        Primitive.span, {
          ...fallbackProps,
        // ref: forwardedRef,
        },
        slots.default && slots.default(),
      )
      : null
  },
})

/* ----------------------------------------------------------------------------------------------- */

function useImageLoadingStatus(src?: string) {
  //   const [loadingStatus, setLoadingStatus] = React.useState<ImageLoadingStatus>('idle')
  const loadingStatus = ref<ImageLoadingStatus>('idle')

  watchEffect(() => {
    if (!src) {
      loadingStatus.value = 'error'
      return
    }

    const image = new window.Image()

    loadingStatus.value = 'loading'
    image.onload = () => {
      loadingStatus.value = 'loaded'
    }
    image.onerror = () => {
      loadingStatus.value = 'error'
    }
    image.src = src as string
  })

  return { loadingStatus }
}

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
