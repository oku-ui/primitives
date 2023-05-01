/* eslint-disable vue/one-component-per-file */
import type { InjectionKey } from 'vue'
import { defineComponent, h, onUnmounted, ref, watchEffect } from 'vue'
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
  loadingStatus: ImageLoadingStatus
}
const PROVIDER_KEY = Symbol(AVATAR_NAME) as InjectionKey<AvatarProvideValue>

const [AvatarProvider, useAvatarInject] = createProvide<AvatarProvideValue>(PROVIDER_KEY, AVATAR_NAME)

// type AvatarElement = ComponentPropsWithoutRef<typeof Primitive.span>
type PrimitiveSpanProps = ComponentPropsWithoutRef<typeof Primitive.span>
interface AvatarProps extends PrimitiveSpanProps {
  src?: string
}

/* -------------------------------------------------------------------------------------------------
 * Avatar
 * ----------------------------------------------------------------------------------------------- */

const Avatar = defineComponent<AvatarProps>({
  name: AVATAR_NAME,
  setup(_, { attrs, slots, expose }) {
    const innerRef = ref<typeof Primitive.span | null>(null)

    // expose innerRef as a prop
    expose({ innerRef })

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
          ref: innerRef,
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
  setup(props, { attrs, slots, expose }) {
    const innerRef = ref<typeof Primitive.img | null>(null)

    // expose innerRef as a prop
    expose({ innerRef })

    const { ...imageProps } = attrs as AvatarImageProps
    const inject = useAvatarInject(PROVIDER_KEY, IMAGE_NAME)

    return () => inject.loadingStatus === 'loaded'
      ? h(
        Primitive.img, {
          ...imageProps,
          src: inject.src,
          ref: innerRef,
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
// type PrimitiveSpanElement = ComponentPropsWithoutRef<typeof Primitive.span>
interface AvatarFallbackProps extends PrimitiveAvatarFallbackProps, PrimitiveSpanProps {
  delayms?: number
}

const AvatarFallback = defineComponent<AvatarFallbackProps>({
  name: FALLBACK_NAME,
  inheritAttrs: false,
  setup(props, { attrs, slots, expose }) {
    const innerRef = ref<typeof Primitive.span | null>(null)

    // expose innerRef as a prop
    expose({ innerRef })

    const inject = useAvatarInject(PROVIDER_KEY, FALLBACK_NAME)

    const { delayms, ...fallbackProps } = attrs as any
    const canRender = ref(false)

    const timerId = setTimeout(() => {
      canRender.value = true
    }, delayms)

    onUnmounted(() => {
      clearTimeout(timerId)
    })

    return () => (canRender.value && inject.loadingStatus !== 'loaded')
      ? h(
        Primitive.span, {
          ...fallbackProps,
          ref: innerRef,
        },
        slots.default && slots.default(),
      )
      : null
  },
})

/* ----------------------------------------------------------------------------------------------- */

function useImageLoadingStatus(src?: string) {
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
